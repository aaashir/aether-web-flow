
import React from 'react';
import { Block } from '../../types/builder';

interface ContentBlockProps {
  block: Block;
  onUpdate: (id: string, updates: Partial<Block>) => void;
}

export const ContentBlock: React.FC<ContentBlockProps> = ({ block, onUpdate }) => {
  const { content } = block;

  const updateContent = (field: string, value: string) => {
    onUpdate(block.id, {
      content: {
        ...content,
        [field]: value
      }
    });
  };

  if (block.type === 'content-columns') {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 
              className="text-2xl font-bold mb-4"
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => updateContent('leftTitle', e.target.textContent || '')}
            >
              {content.leftTitle}
            </h3>
            <p 
              className="text-lg leading-relaxed"
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => updateContent('leftText', e.target.textContent || '')}
            >
              {content.leftText}
            </p>
          </div>
          <div>
            <h3 
              className="text-2xl font-bold mb-4"
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => updateContent('rightTitle', e.target.textContent || '')}
            >
              {content.rightTitle}
            </h3>
            <p 
              className="text-lg leading-relaxed"
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => updateContent('rightText', e.target.textContent || '')}
            >
              {content.rightText}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 
        className="text-3xl font-bold mb-6"
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => updateContent('title', e.target.textContent || '')}
      >
        {content.title}
      </h2>
      <p 
        className="text-lg leading-relaxed"
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => updateContent('text', e.target.textContent || '')}
      >
        {content.text}
      </p>
    </div>
  );
};
