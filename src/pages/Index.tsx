
import React, { useEffect } from 'react';
import { WebsiteBuilder } from '../components/WebsiteBuilder';
import { useAuth } from '../contexts/AuthContext';

const Index = () => {
  const { user, loading } = useAuth();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
      <WebsiteBuilder />
    </div>
  );
};

export default Index;
