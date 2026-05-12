import React from 'react';
import Skeleton from './Skeleton';
import './ListSkeleton.css';

const ListSkeletonItem = () => {
  return (
    <div className="list-skeleton-item">
      <div className="list-skeleton-left">
        <Skeleton width="100px" height="100px" borderRadius="12px" />
      </div>
      <div className="list-skeleton-middle">
        <Skeleton width="85%" height="14px" className="mb-2" />
        <Skeleton width="60%" height="12px" className="mb-2" />
        <Skeleton width="75%" height="10px" className="mb-1" />
        <Skeleton width="65%" height="10px" />
      </div>
      <div className="list-skeleton-right">
        <div className="list-skeleton-label"></div>
        <Skeleton width="120px" height="12px" className="mb-2" />
        <Skeleton width="120px" height="12px" />
      </div>
    </div>
  );
};

const ListSkeleton = ({ count = 3 }) => {
  return (
    <div className="list-skeleton-container">
      {[...Array(count)].map((_, i) => (
        <ListSkeletonItem key={i} />
      ))}
    </div>
  );
};

export default ListSkeleton;
