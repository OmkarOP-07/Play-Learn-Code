import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const JavaGameProgressContext = createContext();

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

export const JavaGameProgressProvider = ({ children }) => {
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

  const { currentUser } = useAuth();

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('javaGameProgress', JSON.stringify(javaGameProgress));
  }, [javaGameProgress]);

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
    // Find which chapter this game belongs to
    const chapter = Object.entries(JAVA_CHAPTERS).find(([_, chapter]) => 
      chapter.subtopics.includes(gameId)
    );

    if (!chapter) return true; // If game not found in chapters, assume it's unlocked

    const [chapterId, chapterData] = chapter;
    
    // If this is the first game in the first chapter, it's always unlocked
    if (chapterId === 'beginner' && gameId === 'printing-output') {
      return true;
    }

    // For variables chapter, check if printing-output is completed
    if (chapterId === 'variables') {
      const isPrintingOutputCompleted = javaGameProgress['printing-output'] === true;
      console.log('Checking variables unlock - printing-output completed:', isPrintingOutputCompleted);
      return isPrintingOutputCompleted;
    }

    // Find the previous chapter
    const previousChapter = Object.entries(JAVA_CHAPTERS).find(([_, chapter]) => 
      chapter.nextChapter === chapterId
    );

    if (previousChapter) {
      const [prevChapterId, prevChapterData] = previousChapter;
      
      // Check if all subtopics in the previous chapter are completed
      const allPreviousCompleted = prevChapterData.subtopics.every(
        subtopic => javaGameProgress[subtopic] === true
      );
      
      // For debugging
      console.log(`Checking unlock for ${gameId} in ${chapterId}`);
      console.log(`Previous chapter: ${prevChapterId}`);
      console.log(`Previous chapter subtopics:`, prevChapterData.subtopics);
      console.log(`Current game progress:`, javaGameProgress);
      console.log(`Previous chapter completion status:`, prevChapterData.subtopics.map(
        subtopic => ({ subtopic, completed: javaGameProgress[subtopic] })
      ));
      console.log(`All previous completed: ${allPreviousCompleted}`);
      
      return allPreviousCompleted;
    }

    return true;
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

  return (
    <JavaGameProgressContext.Provider value={{
      javaGameProgress,
      markGameAsCompleted,
      isGameUnlocked,
      getGameStatus,
      getChapterProgress,
      JAVA_CHAPTERS
    }}>
      {children}
    </JavaGameProgressContext.Provider>
  );
};

export const useJavaGameProgress = () => {
  const context = useContext(JavaGameProgressContext);
  if (!context) {
    throw new Error('useJavaGameProgress must be used within a JavaGameProgressProvider');
  }
  return context;
}; 