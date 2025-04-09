import React, { createContext, useState, useContext, useEffect } from 'react';

const GameProgressContext = createContext();

// Define the chapter structure
const CHAPTERS = {
  'beginner': {
    title: 'Beginner',
    subtopics: ['printing-output'],
    nextChapter: 'variables'
  },
  'variables': {
    title: 'Variables',
    subtopics: ['data-types', 'variables', 'type-casting'],
    nextChapter: 'conditionals'
  },
  'conditionals': {
    title: 'Conditionals',
    subtopics: ['if-else', 'switch'],
    nextChapter: 'loops'
  },
  'loops': {
    title: 'Loops',
    subtopics: ['for-loop', 'while-loop'],
    nextChapter: 'exceptions'
  },
  'exceptions': {
    title: 'Exceptions',
    subtopics: ['exceptions'],
    nextChapter: 'oops'
  },
  'oops': {
    title: 'Object Oriented Programming',
    subtopics: ['classes-and-objects', 'inheritance', 'encapsulation', 'constructors'],
    nextChapter: 'advanced-oops'
  },
  'advanced-oops': {
    title: 'Advanced OOP',
    subtopics: ['multilevel-inheritance', 'hybrid-inheritance', 'hierarchical-inheritance'],
    nextChapter: 'collections'
  },
  'collections': {
    title: 'Collections',
    subtopics: ['array', 'hashmap'],
    nextChapter: null
  }
};

export const GameProgressProvider = ({ children }) => {
  const [gameProgress, setGameProgress] = useState(() => {
    const savedProgress = localStorage.getItem('gameProgress');
    if (savedProgress) {
      return JSON.parse(savedProgress);
    }
    
    // Initialize all games as not completed
    const initialProgress = {};
    Object.values(CHAPTERS).forEach(chapter => {
      chapter.subtopics.forEach(subtopic => {
        initialProgress[subtopic] = false;
      });
    });
    return initialProgress;
  });

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('gameProgress', JSON.stringify(gameProgress));
  }, [gameProgress]);

  const markGameAsCompleted = (gameId) => {
    setGameProgress(prev => {
      const newProgress = {
        ...prev,
        [gameId]: true
      };
      console.log('Marking game as completed:', gameId);
      console.log('New progress state:', newProgress);
      return newProgress;
    });
  };

  const isGameUnlocked = (gameId) => {
    // Find which chapter this game belongs to
    const chapter = Object.entries(CHAPTERS).find(([_, chapter]) => 
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
      const isPrintingOutputCompleted = gameProgress['printing-output'] === true;
      console.log('Checking variables unlock - printing-output completed:', isPrintingOutputCompleted);
      return isPrintingOutputCompleted;
    }

    // Find the previous chapter
    const previousChapter = Object.entries(CHAPTERS).find(([_, chapter]) => 
      chapter.nextChapter === chapterId
    );

    if (previousChapter) {
      const [prevChapterId, prevChapterData] = previousChapter;
      
      // Check if all subtopics in the previous chapter are completed
      const allPreviousCompleted = prevChapterData.subtopics.every(
        subtopic => gameProgress[subtopic] === true
      );
      
      // For debugging
      console.log(`Checking unlock for ${gameId} in ${chapterId}`);
      console.log(`Previous chapter: ${prevChapterId}`);
      console.log(`Previous chapter subtopics:`, prevChapterData.subtopics);
      console.log(`Current game progress:`, gameProgress);
      console.log(`Previous chapter completion status:`, prevChapterData.subtopics.map(
        subtopic => ({ subtopic, completed: gameProgress[subtopic] })
      ));
      console.log(`All previous completed: ${allPreviousCompleted}`);
      
      return allPreviousCompleted;
    }

    return true;
  };

  const getGameStatus = (gameId) => {
    const status = {
      isCompleted: gameProgress[gameId] === true,
      isUnlocked: isGameUnlocked(gameId)
    };
    console.log(`Game status for ${gameId}:`, status);
    return status;
  };

  const getChapterProgress = (chapterId) => {
    const chapter = CHAPTERS[chapterId];
    if (!chapter) return null;

    const completedSubtopics = chapter.subtopics.filter(
      subtopic => gameProgress[subtopic]
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
    <GameProgressContext.Provider value={{
      gameProgress,
      markGameAsCompleted,
      isGameUnlocked,
      getGameStatus,
      getChapterProgress,
      CHAPTERS
    }}>
      {children}
    </GameProgressContext.Provider>
  );
};

export const useGameProgress = () => {
  const context = useContext(GameProgressContext);
  if (!context) {
    throw new Error('useGameProgress must be used within a GameProgressProvider');
  }
  return context;
}; 