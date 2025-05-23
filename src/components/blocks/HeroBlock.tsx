
import React from 'react';
import { Block } from '../../types/builder';
import { Button } from '../ui/button';

interface HeroBlockProps {
  block: Block;
  onUpdate: (id: string, updates: Partial<Block>) => void;
}

export const HeroBlock: React.FC<HeroBlockProps> = ({ block, onUpdate }) => {
  const { content } = block;

  const updateContent = (field: string, value: string) => {
    onUpdate(block.id, {
      content: {
        ...content,
        [field]: value
      }
    });
  };

  return (
    <div className="space-y-6">
      <h1 
        className="text-4xl md:text-6xl font-bold"
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => updateContent('title', e.target.textContent || '')}
      >
        {content.title}
      </h1>
      
      <p 
        className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto"
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => updateContent('subtitle', e.target.textContent || '')}
      >
        {content.subtitle}
      </p>
      
      <div className="mt-8">
        <Button 
          size="lg"
          className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 text-lg font-medium"
        >
          <span
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => updateContent('buttonText', e.target.textContent || '')}
          >
            {content.buttonText}
          </span>
        </Button>
      </div>
    </div>
  );
};
