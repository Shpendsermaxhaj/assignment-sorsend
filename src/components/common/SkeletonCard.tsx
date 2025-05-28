import React from 'react';

interface SkeletonCardProps {
  className?: string;
}

const SkeletonCard: React.FC<SkeletonCardProps> = ({ className = '' }) => (
  <div
    className={`bg-gray-800 rounded p-6 min-w-[220px] h-[180px] animate-pulse ${className}`}
    style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}
  >
    <div className="h-6 bg-gray-700 rounded w-3/4 mb-2" />
    <div className="h-4 bg-gray-700 rounded w-1/2 mb-2" />
    <div className="h-4 bg-gray-700 rounded w-1/3" />
  </div>
);

export default SkeletonCard; 