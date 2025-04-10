import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

// Use environment variable for API URL if available, otherwise use the hardcoded URL
const API_URL = import.meta.env.VITE_API_URL || 'https://play-learn-code-server.onrender.com/api';

console.log('PointsContext using API URL:', API_URL);

// Create a custom axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true // Set to true to work with credentials in CORS
});

const PointsContext = createContext();

export const usePoints = () => {
  return useContext(PointsContext);
};

export const PointsProvider = ({ children }) => {
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchPoints = async () => {
      if (!currentUser) {
        console.log("PointsContext - No user logged in, skipping points fetch");
        setLoading(false);
        return;
      }

      try {
        console.log("PointsContext - Fetching points for user:", currentUser.id);
        const response = await api.get(`/points/${currentUser.id}`);
        console.log("PointsContext - Points fetch response:", response.data);
        setPoints(response.data.points);
      } catch (error) {
        console.error("PointsContext - Error fetching points:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPoints();
  }, [currentUser]);

  const addPoints = async (amount) => {
    if (!currentUser) {
      console.log("PointsContext - Cannot add points: No user logged in");
      return;
    }

    try {
      console.log("PointsContext - Adding points:", amount);
      const response = await api.post(`/points/add`, {
        userId: currentUser.id,
        points: amount
      });
      console.log("PointsContext - Add points response:", response.data);
      setPoints(response.data.points);
    } catch (error) {
      console.error("PointsContext - Error adding points:", error);
    }
  };

  const resetPoints = async () => {
    if (!currentUser) {
      console.log("PointsContext - Cannot reset points: No user logged in");
      return;
    }

    try {
      console.log("PointsContext - Resetting points");
      const response = await api.post(`/points/reset`, {
        userId: currentUser.id
      });
      console.log("PointsContext - Reset points response:", response.data);
      setPoints(0);
    } catch (error) {
      console.error("PointsContext - Error resetting points:", error);
    }
  };

  const value = {
    points,
    loading,
    addPoints,
    resetPoints
  };

  return (
    <PointsContext.Provider value={value}>
      {children}
    </PointsContext.Provider>
  );
};