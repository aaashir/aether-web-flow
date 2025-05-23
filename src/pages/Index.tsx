
import React, { useEffect } from 'react';
import { WebsiteBuilder } from '../components/WebsiteBuilder';
import { useAuth } from '../contexts/AuthContext';

const Index = () => {
  const { user, loading } = useAuth();
  
  return (
    <div className="min-h-screen bg-orange-50 dark:bg-blue-950">
      <WebsiteBuilder />
    </div>
  );
};

export default Index;
