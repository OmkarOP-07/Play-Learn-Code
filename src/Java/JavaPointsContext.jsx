import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

// Use environment variable for API URL if available, otherwise use the hardcoded URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

console.log('JavaPointsContext using API URL:', API_URL);

// Create a custom axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true // Set to true to work with credentials in CORS
});

const JavaPointsContext = createContext();

// Define the Java chapter structure based on the java.jsx file
const JAVA_CHAPTERS = {
  'beginner': {
    title: 'Beginner (Introduction to Coding)',
    subtopics: ['printing-output', 'basic-syntax'],
    nextChapter: 'variables'
  },
  'variables': {
    title: 'Variables & Data Types',
    subtopics: ['variables', 'data-types', 'type-casting'],
    nextChapter: 'conditionals'
  },
  'conditionals': {
    title: 'Conditional Statements',
    subtopics: ['if-else', 'switch'],
    nextChapter: 'loops'
  },
  'loops': {
    title: 'Loops & Iteration',
    subtopics: ['for-loop', 'while-loop'],
    nextChapter: 'exceptions'
  },
  'exceptions': {
    title: 'Exception Handling',
    subtopics: ['exception'],
    nextChapter: 'arrays'
  },
  'arrays': {
    title: 'Arrays & Lists',
    subtopics: ['array'],
    nextChapter: 'oops'
  },
  'oops': {
    title: 'Object-Oriented Programming (OOP)',
    subtopics: ['ClassesAndObjects', 'inheritance', 'encapsulation', 'constructors'],
    nextChapter: 'collections'
  },
  'collections': {
    title: 'Collections',
    subtopics: ['ArrayGame', 'HashMapGame'],
    nextChapter: null
  }
};

export const JavaPointsProvider = ({ children }) => {
  const [points, setPoints] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useAuth();
  
  // Game progress state
  const [javaGameProgress, setJavaGameProgress] = useState(() => {
    const savedProgress = localStorage.getItem('javaGameProgress');
    if (savedProgress) {
      return JSON.parse(savedProgress);
    }
    
    // Initialize all games as not completed
    const initialProgress = {};
    Object.values(JAVA_CHAPTERS).forEach(chapter => {
      chapter.subtopics.forEach(subtopic => {
        initialProgress[subtopic] = false;
      });
    });
    return initialProgress;
  });

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

  // Save game progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('javaGameProgress', JSON.stringify(javaGameProgress));
  }, [javaGameProgress]);

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
      
      // Get the token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }
      
      // Set the Authorization header
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      const response = await api.post(`/user/updatePoints`, {
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

  // Game progress functions
  const markGameAsCompleted = (gameId) => {
    setJavaGameProgress(prev => {
      const newProgress = {
        ...prev,
        [gameId]: true
      };
      console.log('Marking Java game as completed:', gameId);
      console.log('New Java progress state:', newProgress);
      return newProgress;
    });
  };

  const isGameUnlocked = (gameId) => {
    // Points required for each game
    const pointsRequired = {
      // Beginner games
      'printing-output': 0,    // Always unlocked
      'basic-syntax': 10,      // Unlocked at 10 points
      'variables': 20,         // Unlocked at 20 points
      'data-types': 30,        // Unlocked at 30 points
      'type-casting': 40,      // Unlocked at 40 points
      
      // Conditionals
      'if-else': 50,           // Unlocked at 50 points
      'switch': 60,            // Unlocked at 60 points
      
      // Loops
      'for-loop': 70,          // Unlocked at 70 points
      'while-loop': 80,        // Unlocked at 80 points
      
      // Exceptions
      'exception': 90,         // Unlocked at 90 points
      
      // Arrays
      'array': 100,            // Unlocked at 100 points
      
      // OOPS
      'ClassesAndObjects': 110,  // Unlocked at 110 points
      'inheritance': 120,        // Unlocked at 120 points
      'encapsulation': 130,      // Unlocked at 130 points
      'constructors': 140,       // Unlocked at 140 points
      
      // Collections
      'ArrayGame': 150,         // Unlocked at 150 points
      'HashMapGame': 160,       // Unlocked at 160 points
    };

    // If the game is not in our points list, assume it's unlocked
    if (!(gameId in pointsRequired)) {
      return true;
    }

    // Check if user has enough points to unlock the game
    return points >= pointsRequired[gameId];
  };

  const getGameStatus = (gameId) => {
    const status = {
      isCompleted: javaGameProgress[gameId] === true,
      isUnlocked: isGameUnlocked(gameId)
    };
    console.log(`Java game status for ${gameId}:`, status);
    return status;
  };

  const getChapterProgress = (chapterId) => {
    const chapter = JAVA_CHAPTERS[chapterId];
    if (!chapter) return null;

    const completedSubtopics = chapter.subtopics.filter(
      subtopic => javaGameProgress[subtopic]
    );

    return {
      title: chapter.title,
      totalSubtopics: chapter.subtopics.length,
      completedSubtopics: completedSubtopics.length,
      isChapterComplete: completedSubtopics.length === chapter.subtopics.length,
      nextChapter: chapter.nextChapter
    };
  };

  const value = {
    points,
    isLoading,
    addPoints,
    // Game progress functions
    javaGameProgress,
    markGameAsCompleted,
    isGameUnlocked,
    getGameStatus,
    getChapterProgress,
    JAVA_CHAPTERS
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
