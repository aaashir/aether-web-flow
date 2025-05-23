
import { BlockTemplate } from '../types/builder';

export const blockTemplates: BlockTemplate[] = [
  // Hero Blocks
  {
    id: 'hero-modern',
    name: 'Modern Hero',
    icon: '🚀',
    category: 'hero',
    preview: 'Clean hero with gradient background',
    content: {
      title: 'Build Amazing Websites',
      subtitle: 'Create beautiful, fast-loading websites without the complexity',
      buttonText: 'Get Started',
      buttonLink: '#'
    },
    styles: {
      backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      textColor: '#ffffff',
      padding: '120px 40px',
      textAlign: 'center',
      minHeight: '600px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  },
  {
    id: 'hero-classic',
    name: 'Classic Hero',
    icon: '🎯',
    category: 'hero',
    preview: 'Traditional hero with image background',
    content: {
      title: 'Your Success Story Starts Here',
      subtitle: 'Professional solutions for modern businesses',
      buttonText: 'Learn More',
      buttonLink: '#'
    },
    styles: {
      backgroundColor: '#1a202c',
      textColor: '#ffffff',
      padding: '100px 40px',
      textAlign: 'center',
      minHeight: '500px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  },
  {
    id: 'hero-minimal',
    name: 'Minimal Hero',
    icon: '✨',
    category: 'hero',
    preview: 'Simple and clean hero section',
    content: {
      title: 'Simple. Elegant. Effective.',
      subtitle: 'Minimalist design that focuses on what matters',
      buttonText: 'Explore',
      buttonLink: '#'
    },
    styles: {
      backgroundColor: '#f8fafc',
      textColor: '#2d3748',
      padding: '80px 40px',
      textAlign: 'center',
      minHeight: '400px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  },

  // Content Blocks
  {
    id: 'content-text',
    name: 'Text Content',
    icon: '📝',
    category: 'content',
    preview: 'Rich text content section',
    content: {
      title: 'About Our Company',
      text: 'We are passionate about creating exceptional digital experiences that help businesses grow and succeed in the modern world. Our team combines creativity with technical expertise to deliver solutions that make a real impact.'
    },
    styles: {
      backgroundColor: '#ffffff',
      textColor: '#4a5568',
      padding: '60px 40px',
      textAlign: 'left'
    }
  },
  {
    id: 'content-columns',
    name: 'Two Columns',
    icon: '📊',
    category: 'content',
    preview: 'Side-by-side content layout',
    content: {
      leftTitle: 'Our Mission',
      leftText: 'To empower businesses with cutting-edge technology solutions.',
      rightTitle: 'Our Vision',
      rightText: 'A world where technology seamlessly enhances human potential.'
    },
    styles: {
      backgroundColor: '#f7fafc',
      textColor: '#2d3748',
      padding: '60px 40px',
      textAlign: 'left'
    }
  },

  // Gallery Blocks
  {
    id: 'gallery-grid',
    name: 'Image Grid',
    icon: '🖼️',
    category: 'gallery',
    preview: 'Grid layout for images',
    content: {
      title: 'Our Work',
      images: [
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400',
        'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400',
        'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400'
      ]
    },
    styles: {
      backgroundColor: '#ffffff',
      textColor: '#2d3748',
      padding: '60px 40px',
      textAlign: 'center'
    }
  },

  // Contact Blocks
  {
    id: 'contact-form',
    name: 'Contact Form',
    icon: '📧',
    category: 'contact',
    preview: 'Contact form with fields',
    content: {
      title: 'Get In Touch',
      subtitle: 'We\'d love to hear from you. Send us a message and we\'ll respond as soon as possible.',
      fields: ['name', 'email', 'message']
    },
    styles: {
      backgroundColor: '#f8fafc',
      textColor: '#2d3748',
      padding: '80px 40px',
      textAlign: 'center'
    }
  },
  {
    id: 'contact-info',
    name: 'Contact Info',
    icon: '📍',
    category: 'contact',
    preview: 'Contact information display',
    content: {
      title: 'Contact Information',
      email: 'hello@company.com',
      phone: '+1 (555) 123-4567',
      address: '123 Business St, City, State 12345'
    },
    styles: {
      backgroundColor: '#2d3748',
      textColor: '#ffffff',
      padding: '60px 40px',
      textAlign: 'center'
    }
  },

  // Footer Blocks
  {
    id: 'footer-simple',
    name: 'Simple Footer',
    icon: '📋',
    category: 'footer',
    preview: 'Clean footer with basic info',
    content: {
      text: '© 2024 Your Company. All rights reserved.',
      links: [
        { text: 'Privacy Policy', url: '#' },
        { text: 'Terms of Service', url: '#' }
      ]
    },
    styles: {
      backgroundColor: '#1a202c',
      textColor: '#a0aec0',
      padding: '40px',
      textAlign: 'center'
    }
  }
];
