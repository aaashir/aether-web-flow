
import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Canvas } from './Canvas';
import { StylePanel } from './StylePanel';
import { Header } from './Header';
import { Block } from '../types/builder';

export const WebsiteBuilder: React.FC = () => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);
  const [isStylePanelOpen, setIsStylePanelOpen] = useState(false);

  const addBlock = (type: string, template: any) => {
    const newBlock: Block = {
      id: `block-${Date.now()}`,
      type,
      content: template.content,
      styles: template.styles,
      position: blocks.length
    };
    setBlocks([...blocks, newBlock]);
  };

  const updateBlock = (id: string, updates: Partial<Block>) => {
    setBlocks(blocks.map(block => 
      block.id === id ? { ...block, ...updates } : block
    ));
  };

  const deleteBlock = (id: string) => {
    setBlocks(blocks.filter(block => block.id !== id));
    if (selectedBlock === id) {
      setSelectedBlock(null);
    }
  };

  const moveBlock = (fromIndex: number, toIndex: number) => {
    const newBlocks = [...blocks];
    const [movedBlock] = newBlocks.splice(fromIndex, 1);
    newBlocks.splice(toIndex, 0, movedBlock);
    
    // Update positions
    newBlocks.forEach((block, index) => {
      block.position = index;
    });
    
    setBlocks(newBlocks);
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      <Header 
        blocks={blocks}
        onPreview={() => console.log('Preview')}
        onSave={() => console.log('Save')}
        onPublish={() => console.log('Publish')}
      />
      
      <div className="flex-1 flex overflow-hidden">
        <Sidebar onAddBlock={addBlock} />
        
        <Canvas
          blocks={blocks}
          selectedBlock={selectedBlock}
          onSelectBlock={setSelectedBlock}
          onUpdateBlock={updateBlock}
          onDeleteBlock={deleteBlock}
          onMoveBlock={moveBlock}
          onOpenStylePanel={() => setIsStylePanelOpen(true)}
        />
        
        {isStylePanelOpen && selectedBlock && (
          <StylePanel
            block={blocks.find(b => b.id === selectedBlock)}
            onUpdateBlock={updateBlock}
            onClose={() => setIsStylePanelOpen(false)}
          />
        )}
      </div>
    </div>
  );
};
