
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { blockTemplates } from '../data/blockTemplates';
import { BlockTemplate } from '../types/builder';
import { Search, Sparkles } from 'lucide-react';

interface SidebarProps {
  onAddBlock: (type: string, template: BlockTemplate) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onAddBlock }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'hero', 'content', 'gallery', 'contact', 'footer'];

  const filteredTemplates = blockTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-80 bg-gray-50 border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Block Library</h2>
        
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search blocks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="text-xs"
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <div className="mb-4">
          <Button
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
            size="sm"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Generate with AI
          </Button>
        </div>

        {filteredTemplates.map(template => (
          <Card
            key={template.id}
            className="p-3 cursor-pointer hover:shadow-md transition-shadow border-gray-200 hover:border-blue-300"
            onClick={() => onAddBlock(template.id, template)}
          >
            <div className="flex items-center space-x-3">
              <div className="text-2xl">{template.icon}</div>
              <div className="flex-1">
                <h3 className="font-medium text-sm text-gray-900">{template.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{template.preview}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
