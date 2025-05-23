
import React from 'react';
import { Button } from './ui/button';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { Play, Save, Globe, Moon, Sun, LogOut, ExternalLink } from 'lucide-react';
import { Block } from '../types/builder';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

interface HeaderProps {
  blocks: Block[];
  onPreview: () => void;
  onSave: () => void;
  onPublish: () => void;
  isLoading?: boolean;
  isPublished?: boolean;
  publishUrl?: string;
}

export const Header: React.FC<HeaderProps> = ({
  blocks,
  onPreview,
  onSave,
  onPublish,
  isLoading = false,
  isPublished = false,
  publishUrl
}) => {
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  const openPublishedSite = () => {
    if (publishUrl) {
      window.open(`https://${publishUrl}.example.com`, '_blank');
    }
  };

  return (
    <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6 shadow-sm">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">WB</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Website-Baumeister
          </h1>
        </div>
        
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {blocks.length} {blocks.length === 1 ? 'Block' : 'Blocks'}
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="text-gray-600 dark:text-gray-300"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Toggle {theme === 'dark' ? 'Light' : 'Dark'} Mode</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Button
          variant="outline"
          size="sm"
          onClick={onPreview}
          className="flex items-center space-x-2 dark:border-gray-600 dark:text-gray-200"
          disabled={isLoading}
        >
          <Play className="h-4 w-4" />
          <span>Preview</span>
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onSave}
          className="flex items-center space-x-2 dark:border-gray-600 dark:text-gray-200"
          disabled={isLoading}
        >
          <Save className="h-4 w-4" />
          <span>Save</span>
        </Button>
        
        <Button
          size="sm"
          onClick={onPublish}
          className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 dark:hover:from-blue-700 dark:hover:to-purple-800"
          disabled={isLoading}
        >
          <Globe className="h-4 w-4" />
          <span>{isPublished ? 'Update' : 'Publish'}</span>
        </Button>
        
        {isPublished && publishUrl && (
          <Button
            size="sm"
            variant="outline"
            onClick={openPublishedSite}
            className="flex items-center space-x-2"
          >
            <ExternalLink className="h-4 w-4" />
            <span>View Site</span>
          </Button>
        )}
        
        {user && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleSignOut}
                  className="text-gray-600 dark:text-gray-300"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Sign Out</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </header>
  );
};
