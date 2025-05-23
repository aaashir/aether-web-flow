
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Canvas } from './Canvas';
import { StylePanel } from './StylePanel';
import { Header } from './Header';
import { BlockRenderer } from './BlockRenderer';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useToast } from '../hooks/use-toast';
import { AIChat } from './AIChat';
import { useDragDrop } from '../hooks/useDragDrop';
import { Block } from '../types/builder';
import { Button } from './ui/button';
import { Sparkles } from 'lucide-react';
import { supabase } from '../integrations/supabase/client';
import { Json } from '../integrations/supabase/types';

export const WebsiteBuilder: React.FC = () => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);
  const [isStylePanelOpen, setIsStylePanelOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [currentWebsite, setCurrentWebsite] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  
  const { user, loading } = useAuth();
  const { theme } = useTheme();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Initialize drag and drop functionality
  const { getDragProps } = useDragDrop({
    blocks,
    onMoveBlock: (fromIndex, toIndex) => moveBlock(fromIndex, toIndex)
  });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  // Load saved website data if available
  useEffect(() => {
    if (user) {
      loadWebsiteData();
    }
  }, [user]);

  const loadWebsiteData = async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      
      // Check if user has any websites
      const { data, error } = await supabase
        .from('websites')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })
        .limit(1)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        throw error;
      }
      
      // If a website exists, load it
      if (data) {
        setCurrentWebsite(data);
        // Convert Json[] to Block[] when loading from DB
        if (data.blocks && Array.isArray(data.blocks)) {
          setBlocks(data.blocks.map((block: Json) => block as unknown as Block));
        }
      }
    } catch (error: any) {
      console.error('Error loading website data:', error);
      if (error.code !== 'PGRST116') {
        toast({
          title: 'Error loading website',
          description: error.message,
          variant: 'destructive',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const addBlock = async (type: string, template: any) => {
    const newBlock: Block = {
      id: `block-${Date.now()}`,
      type,
      content: template.content,
      styles: template.styles,
      position: blocks.length
    };
    const updatedBlocks = [...blocks, newBlock];
    setBlocks(updatedBlocks);
    
    // If we're adding a custom block, save immediately
    if (type.startsWith('custom-')) {
      saveWebsite(updatedBlocks);
    }
  };

  const updateBlock = (id: string, updates: Partial<Block>) => {
    const updatedBlocks = blocks.map(block => 
      block.id === id ? { ...block, ...updates } : block
    );
    setBlocks(updatedBlocks);
  };

  const deleteBlock = (id: string) => {
    const updatedBlocks = blocks.filter(block => block.id !== id);
    setBlocks(updatedBlocks);
    
    if (selectedBlock === id) {
      setSelectedBlock(null);
    }
  };

  const moveBlock = (fromIndex: number, toIndex: number) => {
    const newBlocks = [...blocks];
    const [movedBlock] = newBlocks.splice(fromIndex, 1);
    newBlocks.splice(toIndex, 0, movedBlock);
    
    // Update positions
    const updatedBlocks = newBlocks.map((block, index) => ({
      ...block,
      position: index
    }));
    
    setBlocks(updatedBlocks);
  };

  const saveWebsite = async (blocksToSave = blocks) => {
    if (!user) {
      toast({
        title: 'Not logged in',
        description: 'Please log in to save your website',
        variant: 'destructive',
      });
      return;
    }
    
    try {
      setIsLoading(true);
      
      if (currentWebsite) {
        // Update existing website
        // Convert Block[] to Json[] when saving to DB
        const { error } = await supabase
          .from('websites')
          .update({ 
            blocks: blocksToSave as unknown as Json[],
            updated_at: new Date().toISOString(),
            theme_settings: { theme }
          })
          .eq('id', currentWebsite.id);
          
        if (error) throw error;
      } else {
        // Create new website
        // Convert Block[] to Json[] when saving to DB
        const { data, error } = await supabase
          .from('websites')
          .insert({
            user_id: user.id,
            name: 'My Website',
            blocks: blocksToSave as unknown as Json[],
            theme_settings: { theme }
          })
          .select();
          
        if (error) throw error;
        
        if (data && data[0]) {
          setCurrentWebsite(data[0]);
        }
      }
      
      toast({
        title: 'Website saved',
        description: 'Your changes have been saved successfully',
      });
    } catch (error: any) {
      console.error('Error saving website:', error);
      toast({
        title: 'Error saving website',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const publishWebsite = async () => {
    if (!currentWebsite) {
      await saveWebsite();
      // If it's the first save, the currentWebsite might not be set immediately
      if (!currentWebsite) {
        toast({
          title: 'Please try again',
          description: 'Please save your website first, then publish',
        });
        return;
      }
    }
    
    try {
      setIsLoading(true);
      
      // Generate a unique publish URL if one doesn't exist
      const publishUrl = currentWebsite.publish_url || `website-${user?.id.substring(0, 8)}-${Date.now().toString(36)}`;
      
      const { error } = await supabase
        .from('websites')
        .update({ 
          published: true,
          publish_url: publishUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', currentWebsite?.id);
        
      if (error) throw error;
      
      // Reload website data to get the updated publish URL
      await loadWebsiteData();
      
      toast({
        title: 'Website published',
        description: 'Your website is now live',
      });
    } catch (error: any) {
      console.error('Error publishing website:', error);
      toast({
        title: 'Error publishing website',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const previewWebsite = () => {
    setPreviewMode(prevMode => !prevMode);
    
    toast({
      title: previewMode ? 'Edit mode' : 'Preview mode',
      description: previewMode ? 'You can now edit your website' : 'This is how your website will look when published',
    });
  };

  const handleCustomBlockCreated = () => {
    // Reload custom blocks in sidebar
    setIsChatOpen(false);
    // Reload website data to get the latest state
    loadWebsiteData();
  };

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading Website-Baumeister...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-gray-900">
      {!previewMode && (
        <Header 
          blocks={blocks}
          onPreview={previewWebsite}
          onSave={saveWebsite}
          onPublish={publishWebsite}
          isLoading={isLoading}
          isPublished={currentWebsite?.published}
          publishUrl={currentWebsite?.publish_url}
        />
      )}
      
      <div className="flex-1 flex overflow-hidden">
        {!previewMode && <Sidebar onAddBlock={addBlock} />}
        
        <div className="flex-1 overflow-y-auto relative">
          {!previewMode && (
            <Button
              onClick={() => setIsChatOpen(true)}
              className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-full shadow-lg z-10"
              size="lg"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              <span>AI Assistant</span>
            </Button>
          )}
          
          {previewMode ? (
            <div className="bg-white dark:bg-gray-900 min-h-screen">
              <div className="fixed top-4 right-4 z-50">
                <Button 
                  onClick={previewWebsite}
                  variant="outline" 
                  className="bg-white dark:bg-gray-800 shadow-md"
                >
                  Exit Preview
                </Button>
              </div>
              <div className="max-w-4xl mx-auto">
                {blocks.map((block) => (
                  <div key={block.id} style={{...block.styles}}>
                    <BlockRenderer block={block} onUpdate={() => {}} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <Canvas
              blocks={blocks}
              selectedBlock={selectedBlock}
              onSelectBlock={setSelectedBlock}
              onUpdateBlock={updateBlock}
              onDeleteBlock={deleteBlock}
              onMoveBlock={moveBlock}
              onOpenStylePanel={() => setIsStylePanelOpen(true)}
              getDragProps={getDragProps}
            />
          )}
        </div>
        
        {isStylePanelOpen && selectedBlock && !previewMode && (
          <StylePanel
            block={blocks.find(b => b.id === selectedBlock)}
            onUpdateBlock={updateBlock}
            onClose={() => setIsStylePanelOpen(false)}
          />
        )}
      </div>
      
      <Sheet open={isChatOpen} onOpenChange={setIsChatOpen}>
        <SheetContent side="right" className="sm:max-w-md">
          <AIChat onClose={() => setIsChatOpen(false)} onBlockCreated={handleCustomBlockCreated} />
        </SheetContent>
      </Sheet>
    </div>
  );
};
