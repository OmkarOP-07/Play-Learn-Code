import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useJavaPoints } from '../Java/JavaPointsContext';

const ProgressBar = ({ progress: propProgress = 0, color = "text-indigo-500", fetchFromBackend = false }) => {
  const [progress, setProgress] = useState(propProgress);
  const [loading, setLoading] = useState(fetchFromBackend);
  const { currentUser } = useAuth();
  const { points } = useJavaPoints();

  // Calculate the stroke dasharray and rotation for the progress circle
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = `${(progress / 100) * circumference} ${circumference}`;
  const rotation = 0; // No rotation needed as we're using strokeDasharray

  useEffect(() => {
    // Simulate loading time for a smoother transition
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Fetch progress based on points or any other logic
    if (currentUser) {
      // Assuming you have a function to calculate progress based on points
      const calculateProgress = (points) => {
        // Example calculation: max points could be 100
        return Math.round((points / 170) * 100); // Adjust this logic as needed
      };

      setProgress(calculateProgress(points));
    }
  }, [currentUser, points]); // Re-run when currentUser or points change

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  
  return (
    <div className="relative w-32 h-32">
      <svg className="transform -rotate-90 w-32 h-32">
        {/* Background circle */}
        <circle
          cx="64"
          cy="64"
          r={radius}
          stroke="currentColor"
          strokeWidth="8"
          fill="none"
          className="text-gray-200"
        />
        {/* Progress circle */}
        <circle
          cx="64"
          cy="64"
          r={radius}
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