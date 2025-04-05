"use client"

import { useState, useEffect, useMemo } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Progress } from "../../components/ui/progress";
import { Play, ChevronRight, Award, Sparkles, XCircle, Undo2, Code, RefreshCw } from 'lucide-react';
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

export default function WhileLoops() {
  const [level, setLevel] = useState(1);
  const [points, setPoints] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [draggedCard, setDraggedCard] = useState(null);
  const [isResetting, setIsResetting] = useState(false);
  const [currentTask, setCurrentTask] = useState("");
  const [progress, setProgress] = useState(0);
  
  // While loop specific state
  const [placedCards, setPlacedCards] = useState({
    initialization: null,
    condition: null,
    loopBody: null,
    update: null
  });
  
  const [placedCardsHistory, setPlacedCardsHistory] = useState([]);
  const [availableCards, setAvailableCards] = useState([]);
  const [availableCardsHistory, setAvailableCardsHistory] = useState([]);
  const [loopOutput, setLoopOutput] = useState([]);

  const levels = useMemo(() => {
    return [
      {
        id: 1,
        title: "Basic While Loop",
        description: "Create a while loop that counts down from 5 to 1.",
        task: "Countdown from 5 to 1",
        solution: {
          initialization: "int count = 5;",
          condition: "count > 0",
          loopBody: "System.out.println(count);",
          update: "count--;"
        },
        expectedOutput: ["5", "4", "3", "2", "1"],
        availableCards: [
          { id: "init1", text: "int count = 5;", type: "initialization" },
          { id: "init2", text: "int count = 10;", type: "initialization" },
          { id: "cond1", text: "count > 0", type: "condition" },
          { id: "cond2", text: "count >= 0", type: "condition" },
          { id: "body1", text: "System.out.println(count);", type: "loopBody" },
          { id: "body2", text: "System.out.println(\"Count: \" + count);", type: "loopBody" },
          { id: "update1", text: "count--;", type: "update" },
          { id: "update2", text: "count -= 1;", type: "update" }
        ]
      },
      {
        id: 2,
        title: "Guessing Game",
        description: "Create a while loop that simulates a guessing game where the user keeps guessing until they find the correct number.",
        task: "Simulate a guessing game",
        solution: {
          initialization: "int guess = 0; int target = 7;",
          condition: "guess != target",
          loopBody: "System.out.println(\"Trying \" + guess);",
          update: "guess++;"
        },
        expectedOutput: ["Trying 0", "Trying 1", "Trying 2", "Trying 3", "Trying 4", "Trying 5", "Trying 6"],
        availableCards: [
          { id: "init1", text: "int guess = 0; int target = 7;", type: "initialization" },
          { id: "init2", text: "int guess = 1; int target = 5;", type: "initialization" },
          { id: "cond1", text: "guess != target", type: "condition" },
          { id: "cond2", text: "guess < target", type: "condition" },
          { id: "body1", text: "System.out.println(\"Trying \" + guess);", type: "loopBody" },
          { id: "body2", text: "System.out.println(guess);", type: "loopBody" },
          { id: "update1", text: "guess++;", type: "update" },
          { id: "update2", text: "guess += 2;", type: "update" }
        ]
      },
      {
        id: 3,
        title: "Fibonacci Sequence",
        description: "Create a while loop that generates the first 8 numbers of the Fibonacci sequence.",
        task: "Generate Fibonacci sequence",
        solution: {
          initialization: "int a = 0, b = 1, count = 0;",
          condition: "count < 8",
          loopBody: "System.out.println(a); int temp = a + b; a = b; b = temp;",
          update: "count++;"
        },
        expectedOutput: ["0", "1", "1", "2", "3", "5", "8", "13"],
        availableCards: [
          { id: "init1", text: "int a = 0, b = 1, count = 0;", type: "initialization" },
          { id: "init2", text: "int a = 1, b = 1, count = 0;", type: "initialization" },
          { id: "cond1", text: "count < 8", type: "condition" },
          { id: "cond2", text: "count < 10", type: "condition" },
          { id: "body1", text: "System.out.println(a); int temp = a + b; a = b; b = temp;", type: "loopBody" },
          { id: "body2", text: "System.out.println(b); int temp = a + b; a = b; b = temp;", type: "loopBody" },
          { id: "update1", text: "count++;", type: "update" },
          { id: "update2", text: "count += 1;", type: "update" }
        ]
      }
    ];
  }, []);

  useEffect(() => {
    if (levels && levels.length > 0 && level <= levels.length) {
      const currentLevel = levels[level - 1];
      setCurrentTask(currentLevel.task);
      setPlacedCards({
        initialization: null,
        condition: null,
        loopBody: null,
        update: null
      });
      setGameStarted(false);
      setShowError(false);
      setLoopOutput([]);
      setProgress(((level - 1) / levels.length) * 100);
      
      // Set available cards based on the current level
      setAvailableCards(currentLevel.availableCards);
    }
  }, [level, levels]);

  const startGame = () => {
    setGameStarted(true);
  };

  const handleDragStart = (card) => {
    setDraggedCard(card);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (slot) => {
    if (!draggedCard) return;

    // Check if the card matches the slot type
    if (draggedCard.type === slot) {
      // Save current state to history before making changes
      setPlacedCardsHistory(prev => [...prev, {...placedCards}]);
      setAvailableCardsHistory(prev => [...prev, [...availableCards]]);

      setPlacedCards(prev => ({
        ...prev,
        [slot]: draggedCard
      }));
      
      // Remove the used card from available cards
      setAvailableCards(prev => prev.filter(card => card.id !== draggedCard.id));
    }
    setDraggedCard(null);
  };

  const handleUndo = () => {
    if (placedCardsHistory.length > 0) {
      // Restore the last state
      setPlacedCards(placedCardsHistory[placedCardsHistory.length - 1]);
      setAvailableCards(availableCardsHistory[availableCardsHistory.length - 1]);
      
      // Remove the last state from history
      setPlacedCardsHistory(prev => prev.slice(0, -1));
      setAvailableCardsHistory(prev => prev.slice(0, -1));
    }
  };

  const resetGame = () => {
    const currentLevel = levels[level - 1];
    setPlacedCards({
      initialization: null,
      condition: null,
      loopBody: null,
      update: null
    });
    
    setAvailableCards(currentLevel.availableCards);
    setPlacedCardsHistory([]);
    setAvailableCardsHistory([]);
    setShowError(false);
    setLoopOutput([]);
  };

  const executeLoop = () => {
    const { initialization, condition, loopBody, update } = placedCards;
    const currentLevel = levels[level - 1];
    let output = [];
    
    // Simple loop execution simulation
    if (initialization && condition && loopBody && update) {
      try {
        // Simulate loop execution based on the cards and level
        if (currentLevel.id === 1) {
          // Countdown from 5 to 1
          const isCountdownFrom5 = initialization.text.includes("count = 5");
          const isGreaterThanZero = condition.text.includes("count > 0");
          const isPrintCount = loopBody.text.includes("println(count)");
          const isDecrement = update.text.includes("count--") || update.text.includes("count -= 1");
          
          if (isCountdownFrom5 && isGreaterThanZero && isPrintCount && isDecrement) {
            for (let count = 5; count > 0; count--) {
              output.push(count.toString());
            }
          } else {
            // Simulate incorrect output
            output = ["Incorrect logic"];
          }
        } else if (currentLevel.id === 2) {
          // Guessing game
          const hasCorrectInit = initialization.text.includes("guess = 0") && initialization.text.includes("target = 7");
          const isNotEqualCondition = condition.text.includes("guess != target");
          const isPrintGuess = loopBody.text.includes("Trying");
          const isIncrement = update.text.includes("guess++");
          
          if (hasCorrectInit && isNotEqualCondition && isPrintGuess && isIncrement) {
            for (let guess = 0; guess < 7; guess++) {
              output.push(`Trying ${guess}`);
            }
          } else {
            // Simulate incorrect output
            output = ["Incorrect logic"];
          }
        } else if (currentLevel.id === 3) {
          // Fibonacci sequence
          const hasCorrectInit = initialization.text.includes("a = 0") && initialization.text.includes("b = 1");
          const isCountLessThan8 = condition.text.includes("count < 8");
          const hasFibLogic = loopBody.text.includes("temp = a + b");
          const isIncrement = update.text.includes("count++");
          
          if (hasCorrectInit && isCountLessThan8 && hasFibLogic && isIncrement) {
            let a = 0, b = 1, count = 0;
            while (count < 8) {
              output.push(a.toString());
              const temp = a + b;
              a = b;
              b = temp;
              count++;
            }
          } else {
            // Simulate incorrect output
            output = ["Incorrect logic"];
          }
        }
        
        setLoopOutput(output);
      } catch (error) {
        console.error("Error executing loop:", error);
        setLoopOutput(["Error executing loop"]);
      }
    }
    
    return output;
  };

  const checkSolution = () => {
    const currentLevel = levels[level - 1];
    const { initialization, condition, loopBody, update } = placedCards;
    
    // Execute the loop to get output
    const output = executeLoop();
    
    // Check if all cards are placed correctly
    if (
      initialization?.text === currentLevel.solution.initialization &&
      condition?.text === currentLevel.solution.condition &&
      loopBody?.text === currentLevel.solution.loopBody &&
      update?.text === currentLevel.solution.update &&
      JSON.stringify(output) === JSON.stringify(currentLevel.expectedOutput)
    ) {
      setShowSuccess(true);
      setShowError(false);
      setPoints(points + 15);
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#9333EA', '#6366F1', '#EC4899']
      });
    } else {
      setShowError(true);
      setShowSuccess(false);
      // Show error for 2 seconds before resetting
      setIsResetting(true);
      setTimeout(() => {
        resetGame();
        setIsResetting(false);
      }, 2000);
    }
  };

  const nextLevel = () => {
    if (level < levels.length) {
      setLevel(level + 1);
      setShowSuccess(false);
    } else {
      // Show completion
      setShowSuccess(true);
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#9333EA', '#6366F1', '#EC4899']
      });
    }
  };

  // Animation variants
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950 text-white overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="w-full max-w-5xl mx-auto p-4 pt-12 text-white relative z-10">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Code className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">While Loop Challenge</h1>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-yellow-400 border-yellow-400 flex items-center gap-1 px-3 py-1.5">
              <Sparkles className="h-4 w-4" />
              <span className="text-base">{points} Points</span>
            </Badge>
            <Badge variant="outline" className="text-purple-400 border-purple-400 flex items-center gap-1 px-3 py-1.5">
              <Award className="h-4 w-4" />
              <span className="text-base">Level {level}</span>
            </Badge>
          </div>
        </div>
        
        <Progress value={progress} className="h-2 mb-6" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-4 border-primary/50 shadow-xl bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm">
            <CardHeader className="bg-primary/20 border-b border-primary/30">
              <CardTitle className="text-xl text-white">{levels[level - 1]?.title || 'No level data available'}</CardTitle>
              <CardDescription className="text-gray-300">
                {levels[level - 1]?.description || 'No description available'}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-12 gap-6">
                {/* Left Side - Task Visualization */}
                <div className="col-span-12 md:col-span-3 flex flex-col">
                  <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <span className="bg-primary/20 p-1 rounded">Task</span> {currentTask}
                  </h2>
                  <div className="flex flex-col gap-4 bg-gray-800/80 p-4 rounded-lg border border-gray-700 shadow-inner">
                    {/* Visual representation based on the level */}
                    {level === 1 && (
                      <div className="flex flex-col items-center gap-2">
                        <div className="text-center text-gray-400 mb-2">Countdown:</div>
                        <div className="flex flex-wrap justify-center gap-2">
                          {[5, 4, 3, 2, 1].map(num => (
                            <motion.div 
                              key={num}
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ delay: (5-num) * 0.1 }}
                              className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg"
                            >
                              {num}
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {level === 2 && (
                      <div className="flex flex-col items-center gap-2">
                        <div className="text-center text-gray-400 mb-2">Guessing Game:</div>
                        <div className="relative w-full h-12 bg-gray-700 rounded-lg overflow-hidden">
                          <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-600 to-indigo-600" style={{ width: '70%' }}></div>
                          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-between px-4">
                            <span>0</span>
                            <span className="font-bold">Target: 7</span>
                          </div>
                        </div>
                        <div className="text-sm text-gray-400 mt-2">Keep guessing until you find 7</div>
                      </div>
                    )}
                    
                    {level === 3 && (
                      <div className="flex flex-col items-center gap-2">
                        <div className="text-center text-gray-400 mb-2">Fibonacci Sequence:</div>
                        <div className="flex flex-wrap justify-center gap-2">
                          {[0, 1, 1, 2, 3, 5, 8, 13].map((num, index) => (
                            <motion.div 
                              key={index}
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ delay: index * 0.1 }}
                              className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg text-sm"
                            >
                              {num}
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Output Display */}
                    {loopOutput.length > 0 && (
                      <div className="mt-4 w-full">
                        <h3 className="text-sm font-medium mb-2 text-gray-300">Output:</h3>
                        <div className="bg-black/70 text-green-400 p-3 rounded-md font-mono text-xs max-h-40 overflow-y-auto border border-gray-700">
                          {loopOutput.map((line, index) => (
                            <motion.div 
                              key={index}
                              initial={{ opacity: 0, x: -5 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                            >
                              {line}
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Middle - Code Editor */}
                <div className="col-span-12 md:col-span-5 flex flex-col">
                  <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <span className="bg-primary/20 p-1 rounded">Code Editor</span>
                  </h2>
                  <div className="bg-gray-900 text-green-400 p-4 rounded-md font-mono text-sm space-y-2 flex-grow overflow-x-auto border border-gray-700 shadow-inner">
                    <div className="flex">
                      <span className="text-gray-500 mr-2">1</span>
                      <span className="text-purple-400">public class</span> <span className="text-yellow-300">WhileLoopExample</span> <span>{"{"}</span>
                    </div>
                    <div className="flex">
                      <span className="text-gray-500 mr-2">2</span>
                      <span className="ml-4 text-purple-400">public static void</span> <span className="text-blue-400">main</span><span>(String[] args) {"{"}</span>
                    </div>
                    
                    <div className="flex">
                      <span className="text-gray-500 mr-2">3</span>
                      <span className="ml-8">
                        <motion.div
                          initial={{ backgroundColor: "rgba(76, 29, 149, 0)" }}
                          animate={{ backgroundColor: placedCards.initialization ? "rgba(76, 29, 149, 0.2)" : "rgba(76, 29, 149, 0)" }}
                          transition={{ duration: 0.3 }}
                          className="rounded px-1 py-0.5"
                        >
                          <div
                            onDragOver={handleDragOver}
                            onDrop={() => handleDrop('initialization')}
                            className="min-w-64 h-6 border-2 border-dashed border-purple-500/50 rounded px-2 flex items-center"
                          >
                            {placedCards.initialization ? 
                              <span className="text-yellow-300">{placedCards.initialization.text}</span> : 
                              <span className="text-gray-500 italic">// initialization</span>
                            }
                          </div>
                        </motion.div>
                      </span>
                    </div>
                    
                    <div className="flex">
                      <span className="text-gray-500 mr-2">4</span>
                      <span className="ml-8 text-purple-400">while</span> <span>(</span>
                      <motion.div
                        initial={{ backgroundColor: "rgba(76, 29, 149, 0)" }}
                        animate={{ backgroundColor: placedCards.condition ? "rgba(76, 29, 149, 0.2)" : "rgba(76, 29, 149, 0)" }}
                        transition={{ duration: 0.3 }}
                        className="rounded px-1 py-0.5"
                      >
                        <div
                          onDragOver={handleDragOver}
                          onDrop={() => handleDrop('condition')}
                          className="min-w-32 h-6 border-2 border-dashed border-purple-500/50 rounded px-2 flex items-center"
                        >
                          {placedCards.condition ? 
                            <span className="text-yellow-300">{placedCards.condition.text}</span> : 
                            <span className="text-gray-500 italic">// condition</span>
                          }
                        </div>
                      </motion.div>
                      <span>) {"{"}</span>
                    </div>
                    
                    <div className="flex">
                      <span className="text-gray-500 mr-2">5</span>
                      <span className="ml-12">
                        <motion.div
                          initial={{ backgroundColor: "rgba(76, 29, 149, 0)" }}
                          animate={{ backgroundColor: placedCards.loopBody ? "rgba(76, 29, 149, 0.2)" : "rgba(76, 29, 149, 0)" }}
                          transition={{ duration: 0.3 }}
                          className="rounded px-1 py-0.5"
                        >
                          <div
                            onDragOver={handleDragOver}
                            onDrop={() => handleDrop('loopBody')}
                            className="min-w-64 h-6 border-2 border-dashed border-purple-500/50 rounded px-2 flex items-center"
                          >
                            {placedCards.loopBody ? 
                              <span className="text-yellow-300">{placedCards.loopBody.text}</span> : 
                              <span className="text-gray-500 italic">// loop body</span>
                            }
                          </div>
                        </motion.div>
                      </span>
                    </div>
                    
                    <div className="flex">
                      <span className="text-gray-500 mr-2">6</span>
                      <span className="ml-12">
                        <motion.div
                          initial={{ backgroundColor: "rgba(76, 29, 149, 0)" }}
                          animate={{ backgroundColor: placedCards.update ? "rgba(76, 29, 149, 0.2)" : "rgba(76, 29, 149, 0)" }}
                          transition={{ duration: 0.3 }}
                          className="rounded px-1 py-0.5"
                        >
                          <div
                            onDragOver={handleDragOver}
                            onDrop={() => handleDrop('update')}
                            className="min-w-32 h-6 border-2 border-dashed border-purple-500/50 rounded px-2 flex items-center"
                          >
                            {placedCards.update ? 
                              <span className="text-yellow-300">{placedCards.update.text}</span> : 
                              <span className="text-gray-500 italic">// update</span>
                            }
                          </div>
                        </motion.div>
                      </span>
                    </div>
                    
                    <div className="flex">
                      <span className="text-gray-500 mr-2">7</span>
                      <span className="ml-8">{"}"}</span>
                    </div>
                    
                    {level === 2 && (
                      <div className="flex">
                        <span className="text-gray-500 mr-2">8</span>
                        <span className="ml-8 text-blue-400">System.out.println("Found it!");</span>
                      </div>
                    )}
                    
                    <div className="flex">
                      <span className="text-gray-500 mr-2">{level === 2 ? "9" : "8"}</span>
                      <span className="ml-4">{"}"}</span>
                    </div>
                    
                    <div className="flex">
                      <span className="text-gray-500 mr-2">{level === 2 ? "10" : "9"}</span>
                      <span>{"}"}</span>
                    </div>
                  </div>
                </div>

                {/* Right Side - Cards */}
                <div className="col-span-12 md:col-span-4 flex flex-col">
                  <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <span className="bg-primary/20 p-1 rounded">Code Blocks</span>
                  </h2>
                  <div className="space-y-4 bg-gray-800/80 p-4 rounded-lg border border-gray-700">
                    <div>
                      <h3 className="text-sm font-medium mb-2 text-gray-300 flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                        Initialization
                      </h3>
                      <div className="space-y-2">
                        {availableCards
                          .filter(card => card.type === 'initialization')
                          .map(card => (
                            <motion.div
                              key={card.id}
                              variants={cardVariants}
                              initial="initial"
                              animate="animate"
                              exit="exit"
                              draggable
                              onDragStart={() => handleDragStart(card)}
                              className="bg-gradient-to-r from-gray-900 to-gray-800 p-2 rounded border border-yellow-500/30 cursor-move hover:border-yellow-500 transition-colors shadow-md"
                            >
                              <code className="text-yellow-300 text-sm">{card.text}</code>
                            </motion.div>
                          ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-2 text-gray-300 flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                        Condition
                      </h3>
                      <div className="space-y-2">
                        {availableCards
                          .filter(card => card.type === 'condition')
                          .map(card => (
                            <motion.div
                              key={card.id}
                              variants={cardVariants}
                              initial="initial"
                              animate="animate"
                              exit="exit"
                              draggable
                              onDragStart={() => handleDragStart(card)}
                              className="bg-gradient-to-r from-gray-900 to-gray-800 p-2 rounded border border-blue-500/30 cursor-move hover:border-blue-500 transition-colors shadow-md"
                            >
                              <code className="text-blue-300 text-sm">{card.text}</code>
                            </motion.div>
                          ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-2 text-gray-300 flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-green-500"></span>
                        Loop Body
                      </h3>
                      <div className="space-y-2">
                        {availableCards
                          .filter(card => card.type === 'loopBody')
                          .map(card => (
                            <motion.div
                              key={card.id}
                              variants={cardVariants}
                              initial="initial"
                              animate="animate"
                              exit="exit"
                              draggable
                              onDragStart={() => handleDragStart(card)}
                              className="bg-gradient-to-r from-gray-900 to-gray-800 p-2 rounded border border-green-500/30 cursor-move hover:border-green-500 transition-colors shadow-md"
                            >
                              <code className="text-green-300 text-sm">{card.text}</code>
                            </motion.div>
                          ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-2 text-gray-300 flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-pink-500"></span>
                        Update
                      </h3>
                      <div className="space-y-2">
                        {availableCards
                          .filter(card => card.type === 'update')
                          .map(card => (
                            <motion.div
                              key={card.id}
                              variants={cardVariants}
                              initial="initial"
                              animate="animate"
                              exit="exit"
                              draggable
                              onDragStart={() => handleDragStart(card)}
                              className="bg-gradient-to-r from-gray-900 to-gray-800 p-2 rounded border border-pink-500/30 cursor-move hover:border-pink-500 transition-colors shadow-md"
                            >
                              <code className="text-pink-300 text-sm">{card.text}</code>
                            </motion.div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Section - Controls and Feedback */}
              <div className="mt-6 space-y-4">
                {!gameStarted && (
                  <div className="flex justify-center">
                    <Button onClick={startGame} className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 px-6 py-2 rounded-full shadow-lg transition-all duration-300 hover:shadow-purple-500/20">
                      <Play className="h-5 w-5" />
                      Start Challenge
                    </Button>
                  </div>
                )}

                {gameStarted && (
                  <div className="space-y-4">
                    <div className="flex justify-center gap-4">
                      <Button 
                        onClick={checkSolution} 
                        className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-6 py-2 rounded-full shadow-lg transition-all duration-300 hover:shadow-green-500/20"
                      >
                        <Play className="h-5 w-5" />
                        Run Code
                      </Button>
                      
                      <Button 
                        onClick={resetGame} 
                        variant="outline" 
                        className="flex items-center gap-2 border-gray-600 hover:bg-gray-800 px-6 py-2 rounded-full transition-all duration-300"
                      >
                        <RefreshCw className="h-4 w-4" />
                        Reset
                      </Button>
                      
                      {placedCardsHistory.length > 0 && (
                        <Button 
                          onClick={handleUndo} 
                          variant="outline" 
                          className="flex items-center gap-2 border-gray-600 hover:bg-gray-800 px-6 py-2 rounded-full transition-all duration-300"
                        >
                          <Undo2 className="h-4 w-4" />
                          Undo
                        </Button>
                      )}
                    </div>

                    {showSuccess && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-4"
                      >
                        <div className="text-green-400 font-bold mb-2 text-lg">Level Complete! 🎉</div>
                        <Button 
                          onClick={nextLevel} 
                          className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 px-6 py-2 rounded-full shadow-lg transition-all duration-300 hover:shadow-purple-500/20"
                        >
                          Next Level <ChevronRight className="h-5 w-5" />
                        </Button>
                      </motion.div>
                    )}

                    {showError && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-4"
                      >
                        <div className="text-red-400 font-bold mb-2 flex items-center justify-center gap-2 text-lg">
                          <XCircle className="h-5 w-5" />
                          Wrong Answer! Try Again
                        </div>
                        {isResetting && (
                          <div className="text-sm text-gray-400 mt-2">
                            Resetting in 2 seconds...
                          </div>
                        )}
                      </motion.div>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
