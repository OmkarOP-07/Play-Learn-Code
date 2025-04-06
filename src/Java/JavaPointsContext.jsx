// JavaPointsContext.js
import React, { createContext, useContext, useState } from "react";

// Create the context
const JavaPointsContext = createContext();

// Create the provider component
export const JavaPointsProvider = ({ children }) => {
  const [points, setPoints] = useState(0);

  const addPoints = (value) => {
    setPoints((prev) => {
      const updated = prev + value;
      console.log("Adding points. New value will be:", updated);
      return updated;
    });
  };
  

  return (
    <JavaPointsContext.Provider value={{ points, addPoints }}>
      {children}
    </JavaPointsContext.Provider>
  );
};

export const useJavaPoints = () => useContext(JavaPointsContext);
