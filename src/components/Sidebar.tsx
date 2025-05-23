
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { blockTemplates } from '../data/blockTemplates';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { BlockTemplate } from '../types/builder';
import { Search, Sparkles, Layers, Star, Code } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../integrations/supabase/client';

interface SidebarProps {
  onAddBlock: (type: string, template: BlockTemplate) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onAddBlock }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [customBlocks, setCustomBlocks] = useState<any[]>([]);
  const { user } = useAuth();

  // Fetch custom blocks when user changes
  useEffect(() => {
    if (user) {
      fetchCustomBlocks();
    }
  }, [user]);

  const fetchCustomBlocks = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('custom_blocks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Convert the custom blocks to the BlockTemplate format
      const formattedBlocks = (data || []).map(block => ({
        id: `custom-${block.id}`,
        name: block.name,
        icon: '✨',
        category: 'custom',
        content: block.content,
        styles: block.styles,
        preview: block.preview || 'AI-generated block',
      }));
      
      setCustomBlocks(formattedBlocks);
    } catch (error) {
      console.error('Error fetching custom blocks:', error);
    }
  };

  // Filter blocks based on search and category
  const filterBlocks = (blocks: BlockTemplate[]) => {
    return blocks.filter(block => {
      const matchesSearch = block.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeTab === 'all' || block.category === activeTab;
      return matchesSearch && matchesCategory;
    });
  };

  const filteredTemplates = filterBlocks([...blockTemplates, ...customBlocks]);

  // Get unique categories
  const categories = ['all', ...new Set(blockTemplates.map(block => block.category))];
  if (customBlocks.length > 0) {
    categories.push('custom');
  }

  return (
    <div className="w-80 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Block Library</h2>
        
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search blocks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600"
          />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full mb-2">
            {categories.map(category => (
              <TabsTrigger 
                key={category} 
                value={category}
                className="text-xs capitalize"
              >
                {category === 'all' && <Layers className="mr-1 h-3 w-3" />}
                {category === 'custom' && <Star className="mr-1 h-3 w-3" />}
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-3">
          {activeTab === 'all' && (
            <Button
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 dark:hover:from-purple-700 dark:hover:to-pink-700"
              size="sm"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Generate with AI
            </Button>
          )}

          {filteredTemplates.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <Code className="h-10 w-10 mx-auto mb-2 opacity-50" />
              <p>No blocks found matching your search.</p>
            </div>
          ) : (
            filteredTemplates.map((template) => (
              <Card
                key={template.id}
                className="p-3 cursor-pointer hover:shadow-md transition-shadow border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 bg-white dark:bg-gray-700"
                onClick={() => onAddBlock(template.id, template)}
              >
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{template.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-medium text-sm text-gray-900 dark:text-gray-100">{template.name}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{template.preview}</p>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
