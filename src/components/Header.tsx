
import React from 'react';
import { Button } from './ui/button';
import { Play, Save, Globe, Palette, Download } from 'lucide-react';
import { Block } from '../types/builder';

interface HeaderProps {
  blocks: Block[];
  onPreview: () => void;
  onSave: () => void;
  onPublish: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  blocks,
  onPreview,
  onSave,
  onPublish
}) => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Palette className="h-4 w-4 text-white" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            WebCraft AI
          </h1>
        </div>
        
        <div className="text-sm text-gray-500">
          {blocks.length} blocks
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <Button
          variant="outline"
          size="sm"
          onClick={onPreview}
          className="flex items-center space-x-2"
        >
          <Play className="h-4 w-4" />
          <span>Preview</span>
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onSave}
          className="flex items-center space-x-2"
        >
          <Save className="h-4 w-4" />
          <span>Save</span>
        </Button>
        
        <Button
          size="sm"
          onClick={onPublish}
          className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700"
        >
          <Globe className="h-4 w-4" />
          <span>Publish</span>
        </Button>
      </div>
    </header>
  );
};
