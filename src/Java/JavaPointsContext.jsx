import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const API_URL = 'http://localhost:5000/api';

const JavaPointsContext = createContext();

export const JavaPointsProvider = ({ children }) => {
  const [points, setPoints] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useAuth();

  // Fetch points when component mounts or user changes
  useEffect(() => {
    const fetchPoints = async () => {
      if (!currentUser) {
        console.log("JavaPointsContext - No user logged in, skipping points fetch");
        return;
      }

      setIsLoading(true);
      try {
        console.log("JavaPointsContext - Fetching points for user:", currentUser._id);
        // Since there's no specific endpoint to get points, we'll use the user data
        // that's already in the currentUser object
        setPoints(currentUser.points || 0);
        console.log("JavaPointsContext - Points from user data:", currentUser.points);
      } catch (error) {
        console.error("JavaPointsContext - Error fetching points:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPoints();
  }, [currentUser]);

  const addPoints = async (value) => {
    if (!currentUser) {
      console.log("JavaPointsContext - Cannot add points: No user logged in");
      return;
    }

    try {
      console.log("JavaPointsContext - Adding points:", value);
      const newPoints = points + value;
      setPoints(newPoints);
      
      // Update points in the database
      await updatePointsInDB(newPoints);
      
      console.log("JavaPointsContext - Points updated successfully:", newPoints);
    } catch (error) {
      console.error("JavaPointsContext - Error adding points:", error);
    }
  };

  const updatePointsInDB = async (newPoints) => {
    if (!currentUser) {
      console.log("JavaPointsContext - Cannot update points in DB: No user logged in");
      return;
    }

    try {
      console.log("JavaPointsContext - Updating points in DB:", {
        userId: currentUser._id,
        points: newPoints
      });
      
      const response = await axios.post(`${API_URL}/user/updatePoints`, {
        userId: currentUser._id,
        points: newPoints
      });
      
      console.log("JavaPointsContext - Points update response:", response.data);
      return response.data;
    } catch (error) {
      console.error("JavaPointsContext - Failed to update points in DB:", error);
      throw error;
    }
  };

  const value = {
    points,
    isLoading,
    addPoints
  };

  return (
    <JavaPointsContext.Provider value={value}>
      {children}
    </JavaPointsContext.Provider>
  );
};

export const useJavaPoints = () => {
  return useContext(JavaPointsContext);
};
