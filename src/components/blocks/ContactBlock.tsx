
import React from 'react';
import { Block } from '../../types/builder';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface ContactBlockProps {
  block: Block;
  onUpdate: (id: string, updates: Partial<Block>) => void;
}

export const ContactBlock: React.FC<ContactBlockProps> = ({ block, onUpdate }) => {
  const { content } = block;

  const updateContent = (field: string, value: string) => {
    onUpdate(block.id, {
      content: {
        ...content,
        [field]: value
      }
    });
  };

  if (block.type === 'contact-info') {
    return (
      <div className="max-w-2xl mx-auto">
        <h2 
          className="text-3xl font-bold mb-8"
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => updateContent('title', e.target.textContent || '')}
        >
          {content.title}
        </h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Email</h3>
            <p 
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => updateContent('email', e.target.textContent || '')}
            >
              {content.email}
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Phone</h3>
            <p 
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => updateContent('phone', e.target.textContent || '')}
            >
              {content.phone}
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Address</h3>
            <p 
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => updateContent('address', e.target.textContent || '')}
            >
              {content.address}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 
        className="text-3xl font-bold mb-4"
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => updateContent('title', e.target.textContent || '')}
      >
        {content.title}
      </h2>
      
      <p 
        className="text-lg mb-8 opacity-80"
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => updateContent('subtitle', e.target.textContent || '')}
      >
        {content.subtitle}
      </p>
      
      <form className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <Input placeholder="Your Name" className="bg-white" />
          <Input placeholder="Your Email" type="email" className="bg-white" />
        </div>
        
        <textarea
          placeholder="Your Message"
          rows={6}
          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
        />
        
        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          Send Message
        </Button>
      </form>
    </div>
  );
};
