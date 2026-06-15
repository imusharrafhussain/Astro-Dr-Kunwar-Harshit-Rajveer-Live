import React, { useState, useEffect } from 'react';
import PageSkeleton from '../ui/loaders/PageSkeleton';

const LoadingWrapper = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Reset loading state on mount
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 1 second simulated load

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="page-wrapper-loading" style={{ paddingTop: '100px', minHeight: '100vh' }}>
        <PageSkeleton />
      </div>
    );
  }

  return children;
};

export default LoadingWrapper;
