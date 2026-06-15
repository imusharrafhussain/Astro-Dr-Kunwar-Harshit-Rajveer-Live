import React from 'react';
import './Skeleton.css';

const Skeleton = ({ width, height, borderRadius, className = '' }) => {
  const style = {
    width: width || '100%',
    height: height || '20px',
    borderRadius: borderRadius || '4px'
  };

  return <div className={`skeleton-base ${className}`} style={style}></div>;
};

export const SkeletonCircle = ({ size, className = '' }) => (
  <Skeleton width={size} height={size} borderRadius="50%" className={className} />
);

export const SkeletonText = ({ lines = 3, className = '' }) => (
  <div className={`skeleton-text-group ${className}`}>
    {[...Array(lines)].map((_, i) => (
      <Skeleton 
        key={i} 
        width={i === lines - 1 && lines > 1 ? '70%' : '100%'} 
        height="1rem" 
        className="skeleton-text-line"
      />
    ))}
  </div>
);

export default Skeleton;
