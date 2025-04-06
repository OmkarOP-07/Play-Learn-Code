"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

const JavaPointsContext = createContext();

export function JavaPointsProvider({ children }) {
  const [javaPoints, setJavaPoints] = useState(0);

  // Log points whenever they change
  useEffect(() => {
    console.log('Java Points Updated:', javaPoints);
  }, [javaPoints]);

  const addPoints = (points) => {
    console.log('Adding points:', points);
    setJavaPoints(prev => {
      const newTotal = prev + points;
      console.log('Previous points:', prev);
      console.log('New total:', newTotal);
      return newTotal;
    });
  };

  return (
    <JavaPointsContext.Provider value={{ javaPoints, addPoints }}>
      {children}
    </JavaPointsContext.Provider>
  );
}

export function useJavaPoints() {
  const context = useContext(JavaPointsContext);
  if (context === undefined) {
    throw new Error('useJavaPoints must be used within a JavaPointsProvider');
  }
  return context;
} 
