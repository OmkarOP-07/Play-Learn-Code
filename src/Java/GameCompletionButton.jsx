import React from 'react';
import { useJavaPoints } from './JavaPointsContext';
import { useNavigate } from 'react-router-dom';

const GameCompletionButton = ({ gameId, nextGamePath }) => {
  const { markGameAsCompleted, addPoints } = useJavaPoints();
  const navigate = useNavigate();

  const handleCompletion = () => {
    // Mark the game as completed
    markGameAsCompleted(gameId);
    
    // Add points for completing the game
    addPoints(10, gameId);
    
    // Show a success message
    alert('Congratulations! You have completed this challenge.');
    
    // Navigate to the next game if provided
    if (nextGamePath) {
      navigate(nextGamePath);
    }
  };

  return (
    <button
      onClick={handleCompletion}
      className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
    >
      Complete Challenge
    </button>
  );
};

export default GameCompletionButton; 