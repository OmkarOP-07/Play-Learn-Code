import React, { useState } from 'react';
import { useJavaPoints } from '../JavaPointsContext';
import GameCompletionButton from '../GameCompletionButton';
import { Lock } from 'lucide-react';

const PrintingOutput = () => {
  const [code, setCode] = useState('public class HelloWorld {\n  public static void main(String[] args) {\n    System.out.println("Hello, World!");\n  }\n}');
  const [output, setOutput] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const { getGameStatus, markGameAsCompleted, addPoints } = useJavaPoints();
  
  // Get the game status to check if it's unlocked
  const gameStatus = getGameStatus('printing-output');
  
  // If the game is not unlocked, show a message
  if (!gameStatus.isUnlocked) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950 text-white p-8">
        <div className="max-w-4xl mx-auto bg-black/30 p-8 rounded-xl border border-white/10">
          <div className="flex items-center gap-4 mb-6">
            <Lock className="h-8 w-8 text-yellow-500" />
            <h1 className="text-3xl font-bold">Printing Output</h1>
          </div>
          <div className="bg-red-900/30 p-6 rounded-lg mb-6">
            <p className="text-xl mb-2">This challenge is locked 🔒</p>
            <p className="text-gray-300">Complete the previous challenges to unlock this content.</p>
          </div>
          <div className="bg-purple-900/30 p-4 rounded-lg">
            <p className="text-sm text-gray-300">Tip: Start with the previous challenge to begin your journey!</p>
          </div>
        </div>
      </div>
    );
  }

  const handleRunCode = () => {
    // Simple code execution simulation
    if (code.includes('System.out.println("Hello, World!");')) {
      setOutput('Hello, World!');
      setIsCorrect(true);
    } else {
      setOutput('Error: Your code did not print "Hello, World!"');
      setIsCorrect(false);
    }
  };

  // Game completion handler
  const handleComplete = () => {
    markGameAsCompleted('printing-output');
    addPoints(10, 'printing-output'); // Adjust points as needed
    alert('Congratulations! You have completed the challenge!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950 text-white p-8">
      <div className="max-w-4xl mx-auto bg-black/30 p-8 rounded-xl border border-white/10">
        <h1 className="text-3xl font-bold mb-4">Printing Output</h1>
        <p className="mb-6">Write a Java program that prints "Hello, World!" to the console.</p>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Your Code:</h2>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-48 bg-gray-900 text-green-400 font-mono p-4 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        
        <button
          onClick={handleRunCode}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
        >
          Run Code
        </button>
        
        {output && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Output:</h2>
            <div className="bg-gray-900 text-white p-4 rounded-lg border border-gray-700">
              <pre>{output}</pre>
            </div>
          </div>
        )}
        
        {isCorrect && (
          <div className="mt-6">
            <div className="bg-green-900/30 p-4 rounded-lg mb-4">
              <p className="text-xl">Great job! You've successfully printed "Hello, World!" to the console.</p>
            </div>
            <GameCompletionButton 
              gameId="printing-output" 
              nextGamePath="/java/Variables/variables" 
              onComplete={handleComplete}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PrintingOutput; 