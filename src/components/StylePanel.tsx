
import React from 'react';
import { Block } from '../types/builder';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { X, Palette, Type, Layout } from 'lucide-react';

interface StylePanelProps {
  block: Block | undefined;
  onUpdateBlock: (id: string, updates: Partial<Block>) => void;
  onClose: () => void;
}

export const StylePanel: React.FC<StylePanelProps> = ({
  block,
  onUpdateBlock,
  onClose
}) => {
  if (!block) return null;

  const updateStyle = (property: string, value: string) => {
    onUpdateBlock(block.id, {
      styles: {
        ...block.styles,
        [property]: value
      }
    });
  };

  const colorPresets = [
    '#ffffff', '#f8fafc', '#e2e8f0', '#cbd5e1',
    '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7',
    '#ec4899', '#ef4444', '#f59e0b', '#10b981'
  ];

  return (
    <div className="w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Block Styles</h3>
        <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-500 dark:text-gray-400">
          <X className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {/* Background */}
          <Card className="p-4 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
            <div className="flex items-center space-x-2 mb-3">
              <Palette className="h-4 w-4 text-gray-700 dark:text-gray-300" />
              <h4 className="font-medium text-gray-900 dark:text-gray-100">Background</h4>
            </div>
            
            <div className="space-y-3">
              <div>
                <Label className="text-xs text-gray-700 dark:text-gray-300">Color</Label>
                <div className="flex items-center space-x-2 mt-1">
                  <Input
                    type="color"
                    value={block.styles.backgroundColor || '#ffffff'}
                    onChange={(e) => updateStyle('backgroundColor', e.target.value)}
                    className="w-12 h-8 p-0 border-0"
                  />
                  <Input
                    value={block.styles.backgroundColor || ''}
                    onChange={(e) => updateStyle('backgroundColor', e.target.value)}
                    placeholder="#ffffff"
                    className="flex-1 text-xs dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-2">
                {colorPresets.map(color => (
                  <button
                    key={color}
                    className="w-8 h-8 rounded border border-gray-200 dark:border-gray-600 hover:scale-110 transition-transform"
                    style={{ backgroundColor: color }}
                    onClick={() => updateStyle('backgroundColor', color)}
                    aria-label={`Color: ${color}`}
                  />
                ))}
              </div>
            </div>
          </Card>

          {/* Typography */}
          <Card className="p-4 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
            <div className="flex items-center space-x-2 mb-3">
              <Type className="h-4 w-4 text-gray-700 dark:text-gray-300" />
              <h4 className="font-medium text-gray-900 dark:text-gray-100">Typography</h4>
            </div>
            
            <div className="space-y-3">
              <div>
                <Label className="text-xs text-gray-700 dark:text-gray-300">Text Color</Label>
                <div className="flex items-center space-x-2 mt-1">
                  <Input
                    type="color"
                    value={block.styles.textColor || '#000000'}
                    onChange={(e) => updateStyle('textColor', e.target.value)}
                    className="w-12 h-8 p-0 border-0"
                  />
                  <Input
                    value={block.styles.textColor || ''}
                    onChange={(e) => updateStyle('textColor', e.target.value)}
                    placeholder="#000000"
                    className="flex-1 text-xs dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500"
                  />
                </div>
              </div>

              <div>
                <Label className="text-xs text-gray-700 dark:text-gray-300">Font Size</Label>
                <Input
                  value={block.styles.fontSize || ''}
                  onChange={(e) => updateStyle('fontSize', e.target.value)}
                  placeholder="16px"
                  className="mt-1 text-xs dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500"
                />
              </div>

              <div>
                <Label className="text-xs text-gray-700 dark:text-gray-300">Font Weight</Label>
                <select
                  value={block.styles.fontWeight || 'normal'}
                  onChange={(e) => updateStyle('fontWeight', e.target.value)}
                  className="w-full mt-1 text-xs border border-gray-300 dark:border-gray-600 rounded px-2 py-1 dark:bg-gray-600 dark:text-gray-100"
                >
                  <option value="normal">Normal</option>
                  <option value="bold">Bold</option>
                  <option value="100">100</option>
                  <option value="300">300</option>
                  <option value="500">500</option>
                  <option value="700">700</option>
                  <option value="900">900</option>
                </select>
              </div>

              <div>
                <Label className="text-xs text-gray-700 dark:text-gray-300">Text Align</Label>
                <select
                  value={block.styles.textAlign || 'left'}
                  onChange={(e) => updateStyle('textAlign', e.target.value as any)}
                  className="w-full mt-1 text-xs border border-gray-300 dark:border-gray-600 rounded px-2 py-1 dark:bg-gray-600 dark:text-gray-100"
                >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                </select>
              </div>
            </div>
          </Card>

          {/* Layout */}
          <Card className="p-4 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
            <div className="flex items-center space-x-2 mb-3">
              <Layout className="h-4 w-4 text-gray-700 dark:text-gray-300" />
              <h4 className="font-medium text-gray-900 dark:text-gray-100">Layout</h4>
            </div>
            
            <div className="space-y-3">
              <div>
                <Label className="text-xs text-gray-700 dark:text-gray-300">Padding</Label>
                <Input
                  value={block.styles.padding || ''}
                  onChange={(e) => updateStyle('padding', e.target.value)}
                  placeholder="20px"
                  className="mt-1 text-xs dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500"
                />
              </div>

              <div>
                <Label className="text-xs text-gray-700 dark:text-gray-300">Margin</Label>
                <Input
                  value={block.styles.margin || ''}
                  onChange={(e) => updateStyle('margin', e.target.value)}
                  placeholder="0px"
                  className="mt-1 text-xs dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500"
                />
              </div>

              <div>
                <Label className="text-xs text-gray-700 dark:text-gray-300">Border Radius</Label>
                <Input
                  value={block.styles.borderRadius || ''}
                  onChange={(e) => updateStyle('borderRadius', e.target.value)}
                  placeholder="0px"
                  className="mt-1 text-xs dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500"
                />
              </div>

              <div>
                <Label className="text-xs text-gray-700 dark:text-gray-300">Min Height</Label>
                <Input
                  value={block.styles.minHeight || ''}
                  onChange={(e) => updateStyle('minHeight', e.target.value)}
                  placeholder="auto"
                  className="mt-1 text-xs dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500"
                />
              </div>
            </div>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
};
