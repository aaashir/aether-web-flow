
import React from 'react';
import { Block } from '../types/builder';
import { HeroBlock } from './blocks/HeroBlock';
import { ContentBlock } from './blocks/ContentBlock';
import { GalleryBlock } from './blocks/GalleryBlock';
import { ContactBlock } from './blocks/ContactBlock';
import { FooterBlock } from './blocks/FooterBlock';

interface BlockRendererProps {
  block: Block;
  onUpdate: (id: string, updates: Partial<Block>) => void;
}

export const BlockRenderer: React.FC<BlockRendererProps> = ({ block, onUpdate }) => {
  const blockStyle = {
    backgroundColor: block.styles.backgroundColor,
    backgroundImage: block.styles.backgroundImage,
    color: block.styles.textColor,
    fontSize: block.styles.fontSize,
    fontWeight: block.styles.fontWeight,
    fontFamily: block.styles.fontFamily,
    padding: block.styles.padding,
    margin: block.styles.margin,
    borderRadius: block.styles.borderRadius,
    border: block.styles.border,
    minHeight: block.styles.minHeight,
    textAlign: block.styles.textAlign,
    display: block.styles.display,
    alignItems: block.styles.alignItems,
    justifyContent: block.styles.justifyContent,
  };

  const renderBlockContent = () => {
    switch (block.type) {
      case 'hero-modern':
      case 'hero-classic':
      case 'hero-minimal':
        return <HeroBlock block={block} onUpdate={onUpdate} />;
      case 'content-text':
      case 'content-columns':
        return <ContentBlock block={block} onUpdate={onUpdate} />;
      case 'gallery-grid':
      case 'gallery-masonry':
        return <GalleryBlock block={block} onUpdate={onUpdate} />;
      case 'contact-form':
      case 'contact-info':
        return <ContactBlock block={block} onUpdate={onUpdate} />;
      case 'footer-simple':
      case 'footer-detailed':
        return <FooterBlock block={block} onUpdate={onUpdate} />;
      default:
        return <div>Unknown block type: {block.type}</div>;
    }
  };

  return (
    <div style={blockStyle}>
      {renderBlockContent()}
    </div>
  );
};
