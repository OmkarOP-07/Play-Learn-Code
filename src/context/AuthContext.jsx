import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Configure axios defaults
axios.defaults.withCredentials = true; // Set to true to work with credentials in CORS
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Use environment variable or fallback URL
const BASE_URL = "https://play-learn-code-backend.onrender.com/" || "http://localhost:5000/api";

// Create a custom axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

console.log("Using API base URL:", BASE_URL);

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    console.log("AuthContext - Initial load:", { 
      hasToken: !!token, 
      hasStoredUser: !!storedUser,
      token,
      storedUser 
    });
    
    if (token && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log("AuthContext - Setting user from storage:", parsedUser);
        setCurrentUser(parsedUser);
        // Set default authorization header
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } catch (error) {
        console.error("AuthContext - Error parsing stored user:", error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    } else {
      console.log("AuthContext - No stored credentials found");
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      console.log("AuthContext - Attempting login with:", { email });
      
      const response = await api.post('api/auth/login', {
        email,
        password,
      });
      
      console.log("AuthContext - Login response:", response.data);
      
      // The response.data contains the user object directly
      const userData = response.data;
      
      // Store token and user data
      localStorage.setItem('token', userData.token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Set authorization header
      api.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
      
      // Update current user state
      setCurrentUser(userData);
      
      console.log("AuthContext - Login successful, user set to:", userData);
      return userData;
    } catch (error) {
      console.error("AuthContext - Login error:", error);
      throw error;
    }
  };

  const signup = async (userData) => {
    try {
      console.log("AuthContext - Attempting signup");
      const response = await api.post('api/auth/register', userData);
      
      console.log("AuthContext - Signup response:", response.data);
      
      // The response.data contains the user object directly
      const newUserData = response.data;
      
      // Store token and user data
      localStorage.setItem('token', newUserData.token);
      localStorage.setItem('user', JSON.stringify(newUserData));
      
      // Set authorization header
      api.defaults.headers.common['Authorization'] = `Bearer ${newUserData.token}`;
      
      // Update current user state
      setCurrentUser(newUserData);
      
      console.log("AuthContext - Signup successful, user set to:", newUserData);
      return newUserData;
    } catch (error) {
      console.error("AuthContext - Signup error:", error);
      throw error;
    }
  };

  const sendOTP = async (email) => {
    try {
      const response = await api.post('api/auth/send-otp', { email });
      return response.data;
    } catch (error) {
      console.error('Error sending OTP:', error);
      throw error;
    }
  };

  const verifyOTP = async (email, otp) => {
    try {
      const response = await api.post('api/auth/verify-otp', { email, otp });
      const { token, ...userData } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setCurrentUser(userData);
      return userData;
    } catch (error) {
      console.error('Error verifying OTP:', error);
      throw error;
    }
  };

  const logout = () => {
    console.log("AuthContext - Logging out");
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete api.defaults.headers.common['Authorization'];
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        login,
        signup,
        logout,
        sendOTP,
        verifyOTP
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};