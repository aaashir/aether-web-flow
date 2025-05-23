
import React from 'react';
import { Block } from '../../types/builder';

interface GalleryBlockProps {
  block: Block;
  onUpdate: (id: string, updates: Partial<Block>) => void;
}

export const GalleryBlock: React.FC<GalleryBlockProps> = ({ block, onUpdate }) => {
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
      <h2 
        className="text-3xl font-bold mb-12"
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => updateContent('title', e.target.textContent || '')}
      >
        {content.title}
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {content.images?.map((image: string, index: number) => (
          <div key={index} className="aspect-square overflow-hidden rounded-lg">
            <img 
              src={image} 
              alt={`Gallery item ${index + 1}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
