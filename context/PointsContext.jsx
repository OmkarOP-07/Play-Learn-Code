import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API_URL = 'http://localhost:5000/api';

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
        const response = await axios.get(`${API_URL}/points/${currentUser.id}`);
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
      const response = await axios.post(`${API_URL}/points/add`, {
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
      const response = await axios.post(`${API_URL}/points/reset`, {
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