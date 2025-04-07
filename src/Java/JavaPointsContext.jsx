import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios"; // or use fetch if you prefer

const JavaPointsContext = createContext();

export const JavaPointsProvider = ({ children }) => {
  const [points, setPoints] = useState(0);

  const addPoints = (value) => {
    setPoints((prev) => prev + value);
  };

  // useEffect to send the update when points change
  useEffect(() => {
    if (points === 0) return; // Optional: skip first render if needed

    const updatePointsInDB = async () => {
      try {
        await axios.post("http://localhost:5000/api/updatePoints", {
          points: points,
          userId: "user123", // replace with actual user ID or data
        });
        console.log("Points updated in DB:", points);
      } catch (error) {
        console.error("Failed to update points in DB:", error);
      }
    };

    updatePointsInDB();
  }, [points]); // <— This runs every time `points` changes

  return (
    <JavaPointsContext.Provider value={{ points, addPoints }}>
      {children}
    </JavaPointsContext.Provider>
  );
};

export const useJavaPoints = () => useContext(JavaPointsContext);
