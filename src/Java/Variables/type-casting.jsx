"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, Award, Heart, RefreshCw, Home, ArrowRight } from "lucide-react"
import { useJavaPoints } from "../JavaPointsContext";

export default function GamePage() {
  const [gameState, setGameState] = useState("start") // start, playing, success, failure, complete
  const [currentLevel, setCurrentLevel] = useState(0)
  const [lives, setLives] = useState(3)
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState("")
  const [showFeedback, setShowFeedback] = useState(false)
  const [draggedType, setDraggedType] = useState(null)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const { points, addPoints } = useJavaPoints();
  const levels = [
    {
      type: "multiple-choice",
      question: "What happens when you cast an int to a byte in Java?",
      options: [
        "The value is truncated if it's too large",
        "The value is automatically rounded",
        "A compilation error occurs",
        "The value remains unchanged",
      ],
      correctAnswer: 0,
      explanation: "When casting from int to byte, the value is truncated to fit within the byte range (-128 to 127).",
    },
    {
      type: "drag-drop",
      question: "Match the correct conversion type:",
      sourceValue: "3.14159",
      targets: [
        { type: "int", result: "3", correct: false },
        { type: "double", result: "3.14159", correct: true },
        { type: "String", result: '"3.14159"', correct: false },
        { type: "char", result: "Invalid conversion", correct: false },
      ],
      explanation: "3.14159 is already a double literal in Java.",
    },
    {
      type: "multiple-choice",
      question: "Which of these is an example of widening conversion?",
      options: ["double to int", "int to byte", "byte to int", "float to int"],
      correctAnswer: 2,
      explanation: "Widening conversions go from smaller to larger data types (byte → int). No data loss occurs.",
    },
    {
      type: "drag-drop",
      question: "Convert this char to the appropriate type:",
      sourceValue: "'A'",
      targets: [
        { type: "int", result: "65", correct: true },
        { type: "boolean", result: "Invalid conversion", correct: false },
        { type: "String", result: '"A"', correct: false },
        { type: "double", result: "65.0", correct: false },
      ],
      explanation: "When a char is converted to int, it returns the ASCII/Unicode value (65 for 'A').",
    },
    {
      type: "multiple-choice",
      question: "What is the result of casting -150 to byte?",
      options: ["150", "-150", "106", "Error"],
      correctAnswer: 2,
      explanation: "When -150 is cast to byte, it wraps around due to byte's range (-128 to 127), resulting in 106.",
    },
  ]

  const handleComplete = () => {
    addPoints(10);
    navigate('/java/conditionals/if-else');
  }

  const handleAnswerSelect = (index) => {
    setSelectedAnswer(index)
  }

  const handleDragStart = (type) => {
    setDraggedType(type)
  }

  const handleDrop = (target) => {
    if (!draggedType) return

    checkAnswer(target)
    setDraggedType(null)
  }

  const checkAnswer = (answer) => {
    const currentQuestion = levels[currentLevel]
    let isCorrect = false

    if (currentQuestion.type === "multiple-choice") {
      isCorrect = answer === currentQuestion.correctAnswer
    } else if (currentQuestion.type === "drag-drop") {
      isCorrect = currentQuestion.targets[answer].correct
    }

    if (isCorrect) {
      setScore(score + 100)
      setFeedback("Correct! " + currentQuestion.explanation)
      setShowFeedback(true)
      setTimeout(() => {
        setShowFeedback(false)
        if (currentLevel < levels.length - 1) {
          setCurrentLevel(currentLevel + 1)
          setSelectedAnswer(null)
        } else {
          setGameState("complete")
        }
      }, 2000)
    } else {
      setLives(lives - 1)
      setFeedback("Incorrect. " + currentQuestion.explanation)
      setShowFeedback(true)
      setTimeout(() => {
        setShowFeedback(false)
        setSelectedAnswer(null)
        if (lives <= 1) {
          setGameState("failure")
        }
      }, 2000)
    }
  }

  const handleSubmit = () => {
    if (selectedAnswer !== null) {
      checkAnswer(selectedAnswer)
    }
  }

  const renderQuestion = () => {
    const currentQuestion = levels[currentLevel]

    if (currentQuestion.type === "multiple-choice") {
      return (
        <div className="w-full max-w-2xl mx-auto">
          <h3 className="text-xl font-bold mb-4">{currentQuestion.question}</h3>
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <motion.div
                key={index}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedAnswer === index
                    ? "border-purple-400 bg-purple-900/50"
                    : "border-purple-700 hover:border-purple-500"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswerSelect(index)}
              >
                {option}
              </motion.div>
            ))}
          </div>
          <motion.button
            className="mt-6 px-6 py-3 bg-purple-600 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={selectedAnswer === null}
            onClick={handleSubmit}
          >
            Submit Answer
          </motion.button>
        </div>
      )
    } else if (currentQuestion.type === "drag-drop") {
      return (
        <div className="w-full max-w-2xl mx-auto">
          <h3 className="text-xl font-bold mb-4">{currentQuestion.question}</h3>

          <div className="flex justify-center mb-8">
            <motion.div className="text-2xl font-mono bg-indigo-800 px-6 py-3 rounded-lg" whileHover={{ scale: 1.05 }}>
              {currentQuestion.sourceValue}
            </motion.div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {currentQuestion.targets.map((target, index) => (
              <motion.div
                key={index}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedAnswer === index
                    ? "border-purple-400 bg-purple-900/50"
                    : "border-purple-700 hover:border-purple-500"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswerSelect(index)}
              >
                <div className="font-bold mb-1">{target.type}</div>
                <div className="font-mono">{target.result}</div>
              </motion.div>
            ))}
          </div>

          <motion.button
            className="mt-6 px-6 py-3 bg-purple-600 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={selectedAnswer === null}
            onClick={handleSubmit}
          >
            Submit Answer
          </motion.button>
        </div>
      )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950 text-white overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/5"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10 ">
        {/* Header with game info */}
        <header className="flex justify-between items-center mb-8 ">
          <div className="text-2xl font-bold ">Java Type Casting</div>
          <div className="flex items-center space-x-6 ">
            <div className="flex items-center">
              <Award className="mr-2" />
              <span className="text-xl">{score}</span>
            </div>
            <div className="flex items-center">
              {[...Array(3)].map((_, i) => (
                <Heart
                  key={i}
                  className="w-6 h-6 mx-1"
                  fill={i < lives ? "#ec4899" : "none"}
                  stroke={i < lives ? "#ec4899" : "#6b7280"}
                />
              ))}
            </div>
          </div>
        </header>

        {/* Main game content */}
        <main className="py-8 bg-black bg-opacity-10 rounded-lg">
          <AnimatePresence mode="wait">
            {gameState === "start" && (
              <motion.div
                key="start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center max-w-2xl mx-auto"
              >
                <h1 className="text-4xl font-bold mb-4">Type Conversion Challenge</h1>
                <p className="text-xl mb-8">
                  Test your knowledge of Java type casting and conversion. Convert between different data types and
                  learn how Java handles type conversions.
                </p>
                <div className="bg-black bg-opacity-10 p-6 rounded-xl mb-8">
                  <h2 className="text-2xl font-bold mb-4">How to Play</h2>
                  <ul className="text-left space-y-2">
                    <li className="flex items-start">
                      <ChevronRight className="mt-1 mr-2 flex-shrink-0" />
                      <span>Answer questions about Java type conversion</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="mt-1 mr-2 flex-shrink-0" />
                      <span>Select the correct answer or match the right conversion</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="mt-1 mr-2 flex-shrink-0" />
                      <span>Learn about widening and narrowing conversions</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="mt-1 mr-2 flex-shrink-0" />
                      <span>Complete all levels to master Java type casting!</span>
                    </li>
                  </ul>
                </div>
                <motion.button
                  className="px-8 py-4 bg-purple-600 rounded-lg text-xl font-bold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleStart}
                >
                  Start Game
                </motion.button>
              </motion.div>
            )}

            {gameState === "playing" && (
              <motion.div
                key="playing"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="relative"
              >
                <div className="mb-6 flex justify-center">
                  <div className="bg-indigo-900/50 px-4 py-2 rounded-full">
                    Level {currentLevel + 1} of {levels.length}
                  </div>
                </div>

                {renderQuestion()}

                <AnimatePresence>
                  {showFeedback && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 px-6 py-4 rounded-lg text-white font-medium max-w-md text-center ${
                        feedback.startsWith("Correct") ? "bg-green-600" : "bg-red-600"
                      }`}
                    >
                      {feedback}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {gameState === "failure" && (
              <motion.div
                key="failure"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center max-w-2xl mx-auto"
              >
                <h1 className="text-4xl font-bold mb-4">Game Over</h1>
                <p className="text-xl mb-8">You've run out of lives! But don't worry, you can always try again.</p>
                <div className="mb-8">
                  <div className="text-2xl font-bold">Your Score: {score}</div>
                  <div className="text-lg">
                    Levels Completed: {currentLevel} of {levels.length}
                  </div>
                </div>
                <div className="flex justify-center space-x-4">
                  <motion.button
                    className="px-6 py-3 bg-indigo-700 rounded-lg font-bold flex items-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setGameState("start")}
                  >
                    <Home className="mr-2" />
                    Main Menu
                  </motion.button>
                  <motion.button
                    className="px-6 py-3 bg-purple-600 rounded-lg font-bold flex items-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleStart}
                  >
                    <RefreshCw className="mr-2" />
                    Try Again
                  </motion.button>
                </div>
              </motion.div>
            )}

            {gameState === "complete" && (
              <motion.div
                key="complete"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center max-w-2xl mx-auto"
              >
                <h1 className="text-4xl font-bold mb-4">Congratulations!</h1>
                <p className="text-xl mb-8">
                  You've completed all levels and mastered Java type casting and conversion!
                </p>
                <div className="mb-8">
                  <div className="text-2xl font-bold">Final Score: {score}</div>
                  <div className="text-lg">Lives Remaining: {lives}</div>
                </div>

                <div className="bg-indigo-900/50 p-6 rounded-xl mb-8 text-left">
                  <h2 className="text-2xl font-bold mb-4 text-center">Key Takeaways</h2>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <ArrowRight className="mt-1 mr-2 flex-shrink-0" />
                      <span>
                        <strong>Widening Conversion:</strong> Converting from smaller to larger data types (byte → int →
                        long → float → double)
                      </span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="mt-1 mr-2 flex-shrink-0" />
                      <span>
                        <strong>Narrowing Conversion:</strong> Converting from larger to smaller data types (double →
                        float → long → int → byte)
                      </span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="mt-1 mr-2 flex-shrink-0" />
                      <span>
                        <strong>Explicit Casting:</strong> Required for narrowing conversions to prevent data loss (int
                        x = (int)doubleValue)
                      </span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="mt-1 mr-2 flex-shrink-0" />
                      <span>
                        <strong>Implicit Casting:</strong> Automatic for widening conversions (double d = intValue)
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="flex justify-center space-x-4">
                  <motion.button
                    className="px-6 py-3 bg-indigo-700 rounded-lg font-bold flex items-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setGameState("start")}
                  >
                    <Home className="mr-2" />
                    Main Menu
                  </motion.button>
                  <motion.button
                    className="px-6 py-3 bg-purple-600 rounded-lg font-bold flex items-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleComplete}
                  >
                    <RefreshCw className="mr-2" />
                    Next Level
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Footer with progress bar for playing state */}
        {gameState === "playing" && (
          <footer className="fixed bottom-0 left-0 w-full bg-indigo-950/80 py-2">
            <div className="container mx-auto px-4">
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div
                  className="bg-purple-600 h-2.5 rounded-full"
                  style={{ width: `${(currentLevel / levels.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </footer>
        )}
      </div>
    </div>
  )
}

