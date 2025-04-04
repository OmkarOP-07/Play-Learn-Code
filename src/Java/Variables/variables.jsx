import React, { useState } from 'react';

const JavaVariablesGame = () => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [showWinMessage, setShowWinMessage] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [attempts, setAttempts] = useState(0);

  const levels = [
    {
      title: "The Storage Vault: Introducing Variables",
      description: "In Java, variables are like storage vaults that hold your data. Before using any data, you must first declare a variable to store it.",
      challenge: "Declare an integer variable named 'score' in Java:",
      correctAnswer: "int score;",
      hint: "Use 'int' for integer type variables followed by the name and a semicolon."
    },
    {
      title: "Variable Types: Different Vaults for Different Treasures",
      description: "Java has different variable types for different kinds of data: int for whole numbers, double for decimals, String for text, and boolean for true/false values.",
      challenge: "Declare a String variable named 'playerName' and assign it the value 'Coder':",
      correctAnswer: "String playerName = \"Coder\";" | "String playername = \"Coder\";",
      hint: "String values must be enclosed in double quotes."
    },
    {
      title: "Variable Assignment: Filling Your Vaults",
      description: "After declaring a variable, you can store data in it using the assignment operator (=).",
      challenge: "Declare a boolean variable named 'isGameOver' and set it to false:",
      correctAnswer: "boolean isGameOver = false;",
      hint: "Boolean values are written as 'true' or 'false' without quotes."
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setAttempts(attempts + 1);
    
    const currentLevelData = levels[currentLevel];
    const normalizedUserInput = userInput.trim();
    const normalizedCorrectAnswer = currentLevelData.correctAnswer.trim();
    
    if (normalizedUserInput === normalizedCorrectAnswer) {
      // Success!
      const pointsEarned = Math.max(5 - attempts + 1, 1);
      setScore(score + pointsEarned);
      setFeedback(`Correct! +${pointsEarned} points`);
      
      // Short delay before moving to next level
      setTimeout(() => {
        if (currentLevel < levels.length - 1) {
          setCurrentLevel(currentLevel + 1);
          setUserInput('');
          setFeedback('');
          setAttempts(0);
        } else {
          // Game completed
          setShowWinMessage(true);
        }
      }, 1500);
    } else {
      setFeedback("Not quite right. Try again!");
    }
  };

  const handleHintClick = () => {
    setFeedback(`Hint: ${levels[currentLevel].hint}`);
  };

  // Animation classes based on state
  const successAnimationClass = feedback.includes("Correct") ? "animate-bounce" : "";
  
  if (showWinMessage) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-purple-800 to-indigo-900 text-white ">
        <div className="animate-bounce mb-8">
          <div className="text-yellow-300 text-6xl mb-4">🏆</div>
        </div>
        <h1 className="text-4xl font-bold mb-4 text-center">Congratulations!</h1>
        <p className="text-xl mb-8 text-center">You've mastered the basics of Java variables!</p>
        <div className="bg-purple-700 p-6 rounded-lg shadow-lg mb-8">
          <p className="text-2xl font-bold mb-2">Final Score: {score}</p>
          <p className="text-lg">Levels Completed: {levels.length}</p>
        </div>
        <button 
          onClick={() => {
            setCurrentLevel(0);
            setScore(0);
            setShowWinMessage(false);
            setUserInput('');
            setFeedback('');
            setAttempts(0);
          }}
          className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
        >
          Play Again
        </button>
      </div>
    );
  }

  const currentLevelData = levels[currentLevel];

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950 text-white overflow-hidden relative pt-10">
      {/* Header with progress and score */}
      <div className='w-[70%] mx-auto'>
      <div className="flex justify-between items-center mb-6 pt-10">
        <div className=" bg-transparent rounded-lg p-3 shadow-gray-900 shadow-md">
          <p className="font-bold">Level: {currentLevel + 1}/{levels.length}</p>
        </div>
        <div className="bg-transparent rounded-lg p-3 shadow-gray-900 shadow-md">
          <p className="font-bold">Score: {score}</p>
        </div>
      </div>

      {/* Level title */}
      <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center">{currentLevelData.title}</h1>
      
      {/* Progress bar */}
      <div className="w-full bg-black rounded-full h-4 mb-6">
        <div 
          className="bg-green-500 h-4 rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${((currentLevel) / levels.length) * 100}%` }}
        ></div>
      </div>

      {/* Main content */}
      <div className="bg-black rounded-lg p-6 shadow-xl mb-8">
        <div className="mb-6">
          <p className="text-lg mb-4">{currentLevelData.description}</p>
          <div className="p-4 bg-gray-900 rounded-lg border-l-4 border-blue-500">
            <p className="font-mono text-blue-300"># Remember: Variables are containers for storing data values</p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-3">Your Challenge:</h2>
          <p className="mb-4 text-yellow-300">{currentLevelData.challenge}</p>
          
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type your code here..."
                className="flex-grow p-3 rounded-lg bg-black border border-gray-600 text-white font-mono"
              />
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200"
              >
                Submit
              </button>
            </div>
          </form>
          
          {/* Feedback area with animation */}
          <div className={`mt-4 min-h-12 ${successAnimationClass}`}>
            {feedback && (
              <p className={`p-3 rounded-lg ${feedback.includes("Correct") ? "bg-green-800 text-green-200" : "bg-red-800 text-red-200"}`}>
                {feedback}
              </p>
            )}
          </div>
          
          <button
            onClick={handleHintClick}
            className="mt-4 text-sm text-blue-400 hover:text-blue-300 underline"
          >
            Need a hint?
          </button>
        </div>
      </div>

      {/* Visual representation of variables */}
      <div className="bg-black rounded-lg p-4 shadow-xl mb-6">
        <h3 className="text-lg font-semibold mb-3">Variable Visualization</h3>
        <div className="flex flex-wrap gap-4 justify-center">
          <div className="border-2 border-blue-600 rounded-lg p-3 w-32 h-32 flex flex-col items-center justify-center">
            <p className="text-sm text-blue-300">int</p>
            <p className="text-lg font-mono">42</p>
            <p className="text-xs mt-2 text-gray-400">Whole numbers</p>
          </div>
          
          <div className=" border-2 border-green-600 rounded-lg p-3 w-32 h-32 flex flex-col items-center justify-center">
            <p className="text-sm text-green-300">String</p>
            <p className="text-lg font-mono">"Text"</p>
            <p className="text-xs mt-2 text-gray-400">Text data</p>
          </div>
          
          <div className=" border-2 border-purple-600 rounded-lg p-3 w-32 h-32 flex flex-col items-center justify-center">
            <p className="text-sm text-purple-300">boolean</p>
            <p className="text-lg font-mono">true/false</p>
            <p className="text-xs mt-2 text-gray-400">Logical values</p>
          </div>
          
          <div className=" border-2 border-yellow-600 rounded-lg p-3 w-32 h-32 flex flex-col items-center justify-center">
            <p className="text-sm text-yellow-300">double</p>
            <p className="text-lg font-mono">3.14</p>
            <p className="text-xs mt-2 text-gray-400">Decimal numbers</p>
          </div>
        </div>
      </div>
     
      </div>
    </div>
  );
};

export default JavaVariablesGame;