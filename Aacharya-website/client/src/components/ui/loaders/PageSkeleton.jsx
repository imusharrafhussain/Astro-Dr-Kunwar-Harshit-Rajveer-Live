import React from 'react';
import Skeleton from './Skeleton';
import ListSkeleton from './ListSkeleton';

const PageSkeleton = () => {
  return (
    <div className="page-skeleton" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Hero Section Skeleton */}
      <div style={{ marginBottom: '3rem' }}>
        <Skeleton height="350px" borderRadius="24px" />
      </div>

      {/* Content Section Skeleton */}
      <div style={{ marginBottom: '2rem' }}>
        <Skeleton width="40%" height="2rem" borderRadius="8px" style={{ marginBottom: '1.5rem', marginLeft: 'auto', marginRight: 'auto' }} />
        <ListSkeleton count={4} />
      </div>
    </div>
  );
};

export default PageSkeleton;

