
import React from 'react';
import { Block } from '../../types/builder';

interface FooterBlockProps {
  block: Block;
  onUpdate: (id: string, updates: Partial<Block>) => void;
}

export const FooterBlock: React.FC<FooterBlockProps> = ({ block, onUpdate }) => {
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
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <p 
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => updateContent('text', e.target.textContent || '')}
          className="mb-4 md:mb-0"
        >
          {content.text}
        </p>
        
        {content.links && (
          <div className="flex space-x-6">
            {content.links.map((link: any, index: number) => (
              <a 
                key={index}
                href={link.url}
                className="hover:text-white transition-colors"
              >
                {link.text}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
