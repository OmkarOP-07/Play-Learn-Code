import React from 'react';

const ProgressBar = ({ progress, color }) => {
  const rotation = (progress / 100) * 180;
  const circumference = 2 * Math.PI * 45; // radius = 45
  const strokeDasharray = `${(progress / 100) * circumference} ${circumference}`;

  return (
    <div className="relative w-32 h-32">
      <svg className="transform -rotate-90 w-32 h-32">
        {/* Background circle */}
        <circle
          cx="64"
          cy="64"
          r="45"
          stroke="currentColor"
          strokeWidth="8"
          fill="none"
          className="text-gray-200"
        />
        {/* Progress circle */}
        <circle
          cx="64"
          cy="64"
          r="45"
          stroke="currentColor"
          strokeWidth="8"
          fill="none"
          strokeDasharray={strokeDasharray}
          className={`${color} transition-all duration-500 ease-in-out`}
          style={{
            transform: `rotate(${rotation}deg)`,
            transformOrigin: 'center',
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold">{progress}%</span>
      </div>
    </div>
  );
};

export default ProgressBar; 