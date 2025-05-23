
import React from 'react';
import { Block } from '../types/builder';
import { BlockRenderer } from './BlockRenderer';
import { Button } from './ui/button';
import { Settings, Trash2, Move } from 'lucide-react';

interface CanvasProps {
  blocks: Block[];
  selectedBlock: string | null;
  onSelectBlock: (id: string | null) => void;
  onUpdateBlock: (id: string, updates: Partial<Block>) => void;
  onDeleteBlock: (id: string) => void;
  onMoveBlock: (fromIndex: number, toIndex: number) => void;
  onOpenStylePanel: () => void;
}

export const Canvas: React.FC<CanvasProps> = ({
  blocks,
  selectedBlock,
  onSelectBlock,
  onUpdateBlock,
  onDeleteBlock,
  onMoveBlock,
  onOpenStylePanel
}) => {
  return (
    <div className="flex-1 bg-gray-100 overflow-y-auto">
      <div className="max-w-4xl mx-auto py-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden min-h-96">
          {blocks.length === 0 ? (
            <div className="flex items-center justify-center h-96 text-gray-500">
              <div className="text-center">
                <div className="text-6xl mb-4">🎨</div>
                <h3 className="text-xl font-medium mb-2">Start Building Your Website</h3>
                <p className="text-gray-400">Drag blocks from the sidebar to get started</p>
              </div>
            </div>
          ) : (
            <div className="relative">
              {blocks
                .sort((a, b) => a.position - b.position)
                .map((block, index) => (
                  <div
                    key={block.id}
                    className={`relative group ${
                      selectedBlock === block.id 
                        ? 'ring-2 ring-blue-500 ring-offset-2' 
                        : 'hover:ring-1 hover:ring-gray-300'
                    }`}
                    onClick={() => onSelectBlock(block.id)}
                  >
                    <BlockRenderer block={block} onUpdate={onUpdateBlock} />
                    
                    {selectedBlock === block.id && (
                      <div className="absolute top-2 right-2 flex space-x-1 bg-white rounded-lg shadow-lg p-1 z-10">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenStylePanel();
                          }}
                        >
                          <Settings className="h-4 w-4" />
                        </Button>
                        
                        {index > 0 && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              onMoveBlock(index, index - 1);
                            }}
                          >
                            ↑
                          </Button>
                        )}
                        
                        {index < blocks.length - 1 && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              onMoveBlock(index, index + 1);
                            }}
                          >
                            ↓
                          </Button>
                        )}
                        
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteBlock(block.id);
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
