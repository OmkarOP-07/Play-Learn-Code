"use client"

import { useState, useEffect, useMemo } from "react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Play, ChevronRight, Award, Sparkles, XCircle, Undo2 } from "lucide-react"
import confetti from "canvas-confetti"

export default function ForLoops() {
  const [level, setLevel] = useState(1)
  const [points, setPoints] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [draggedCard, setDraggedCard] = useState(null)
  const [isResetting, setIsResetting] = useState(false)
  const [currentTask, setCurrentTask] = useState("Count from 1 to 5")

  // For loop specific state
  const [placedCards, setPlacedCards] = useState({
    initialization: null,
    condition: null,
    increment: null,
    loopBody: null,
  })

  const [placedCardsHistory, setPlacedCardsHistory] = useState([])
  const [availableCards, setAvailableCards] = useState([
    { id: "init1", text: "int i = 0;", type: "initialization" },
    { id: "init2", text: "int i = 1;", type: "initialization" },
    { id: "cond1", text: "i < 5", type: "condition" },
    { id: "cond2", text: "i <= 5", type: "condition" },
    { id: "cond3", text: "i < 10", type: "condition" },
    { id: "inc1", text: "i++", type: "increment" },
    { id: "inc2", text: "i += 1", type: "increment" },
    { id: "inc3", text: "i += 2", type: "increment" },
    { id: "body1", text: "System.out.println(i);", type: "loopBody" },
    { id: "body2", text: 'System.out.println("Loop: " + i);', type: "loopBody" },
    { id: "body3", text: "sum += i;", type: "loopBody" },
  ])

  const [availableCardsHistory, setAvailableCardsHistory] = useState([])
  const [loopOutput, setLoopOutput] = useState([])

  const levels = useMemo(() => {
    return [
      {
        id: 1,
        title: "Basic For Loop",
        description: "Create a for loop that counts from 1 to 5 and prints each number.",
        task: "Count from 1 to 5",
        solution: {
          initialization: "int i = 1;",
          condition: "i <= 5",
          increment: "i++",
          loopBody: "System.out.println(i);",
        },
        expectedOutput: ["1", "2", "3", "4", "5"],
      },
      {
        id: 2,
        title: "Sum Calculation",
        description: "Create a for loop that calculates the sum of numbers from 0 to 9.",
        task: "Calculate sum of numbers 0-9",
        solution: {
          initialization: "int i = 0;",
          condition: "i < 10",
          increment: "i++",
          loopBody: "sum += i;",
        },
        expectedOutput: ["Sum: 45"],
      },
      {
        id: 3,
        title: "Skip Counting",
        description: "Create a for loop that counts from 1 to 9 by 2s (odd numbers only).",
        task: "Count odd numbers from 1 to 9",
        solution: {
          initialization: "int i = 1;",
          condition: "i < 10",
          increment: "i += 2",
          loopBody: "System.out.println(i);",
        },
        expectedOutput: ["1", "3", "5", "7", "9"],
      },
    ]
  }, [])

  useEffect(() => {
    if (levels && levels.length > 0 && level <= levels.length) {
      setCurrentTask(levels[level - 1].task)
      setPlacedCards({
        initialization: null,
        condition: null,
        increment: null,
        loopBody: null,
      })
      setGameStarted(false)
      setShowError(false)
      setLoopOutput([])

      // Reset available cards based on the level
      setAvailableCards([
        { id: "init1", text: "int i = 0;", type: "initialization" },
        { id: "init2", text: "int i = 1;", type: "initialization" },
        { id: "cond1", text: "i < 5", type: "condition" },
        { id: "cond2", text: "i <= 5", type: "condition" },
        { id: "cond3", text: "i < 10", type: "condition" },
        { id: "inc1", text: "i++", type: "increment" },
        { id: "inc2", text: "i += 1", type: "increment" },
        { id: "inc3", text: "i += 2", type: "increment" },
        { id: "body1", text: "System.out.println(i);", type: "loopBody" },
        { id: "body2", text: 'System.out.println("Loop: " + i);', type: "loopBody" },
        { id: "body3", text: "sum += i;", type: "loopBody" },
      ])
    }
  }, [level, levels])

  const startGame = () => {
    setGameStarted(true)
  }

  const handleDragStart = (card) => {
    setDraggedCard(card)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (slot) => {
    if (!draggedCard) return

    // Check if the card matches the slot type
    if (draggedCard.type === slot) {
      // Save current state to history before making changes
      setPlacedCardsHistory((prev) => [...prev, { ...placedCards }])
      setAvailableCardsHistory((prev) => [...prev, [...availableCards]])

      setPlacedCards((prev) => ({
        ...prev,
        [slot]: draggedCard,
      }))

      // Remove the used card from available cards
      setAvailableCards((prev) => prev.filter((card) => card.id !== draggedCard.id))
    }
    setDraggedCard(null)
  }

  const handleUndo = () => {
    if (placedCardsHistory.length > 0) {
      // Restore the last state
      setPlacedCards(placedCardsHistory[placedCardsHistory.length - 1])
      setAvailableCards(availableCardsHistory[availableCardsHistory.length - 1])

      // Remove the last state from history
      setPlacedCardsHistory((prev) => prev.slice(0, -1))
      setAvailableCardsHistory((prev) => prev.slice(0, -1))
    }
  }

  const resetGame = () => {
    setPlacedCards({
      initialization: null,
      condition: null,
      increment: null,
      loopBody: null,
    })

    setAvailableCards([
      { id: "init1", text: "int i = 0;", type: "initialization" },
      { id: "init2", text: "int i = 1;", type: "initialization" },
      { id: "cond1", text: "i < 5", type: "condition" },
      { id: "cond2", text: "i <= 5", type: "condition" },
      { id: "cond3", text: "i < 10", type: "condition" },
      { id: "inc1", text: "i++", type: "increment" },
      { id: "inc2", text: "i += 1", type: "increment" },
      { id: "inc3", text: "i += 2", type: "increment" },
      { id: "body1", text: "System.out.println(i);", type: "loopBody" },
      { id: "body2", text: 'System.out.println("Loop: " + i);', type: "loopBody" },
      { id: "body3", text: "sum += i;", type: "loopBody" },
    ])

    setPlacedCardsHistory([])
    setAvailableCardsHistory([])
    setShowError(false)
    setLoopOutput([])
  }

  const executeLoop = () => {
    const { initialization, condition, increment, loopBody } = placedCards
    const currentLevel = levels[level - 1]
    const output = []

    // Simple loop execution simulation
    if (initialization && condition && increment && loopBody) {
      try {
        // Simulate loop execution based on the cards
        if (currentLevel.id === 1) {
          // Count from 1 to 5
          const start = initialization.text.includes("= 1") ? 1 : 0
          const end = condition.text.includes("<= 5") ? 5 : 4
          const step = increment.text.includes("+= 2") ? 2 : 1

          for (let i = start; i <= end; i += step) {
            output.push(i.toString())
          }
        } else if (currentLevel.id === 2) {
          // Sum calculation
          const start = initialization.text.includes("= 0") ? 0 : 1
          const end = condition.text.includes("< 10") ? 9 : 5
          const step = increment.text.includes("+= 2") ? 2 : 1

          let sum = 0
          for (let i = start; i <= end; i += step) {
            sum += i
          }
          output.push(`Sum: ${sum}`)
        } else if (currentLevel.id === 3) {
          // Odd numbers
          const start = initialization.text.includes("= 1") ? 1 : 0
          const end = condition.text.includes("< 10") ? 9 : 5
          const step = increment.text.includes("+= 2") ? 2 : 1

          for (let i = start; i < end; i += step) {
            output.push(i.toString())
          }
        }

        setLoopOutput(output)
      } catch (error) {
        console.error("Error executing loop:", error)
        setLoopOutput(["Error executing loop"])
      }
    }

    return output
  }

  const checkSolution = () => {
    const currentLevel = levels[level - 1]
    const { initialization, condition, increment, loopBody } = placedCards

    // Execute the loop to get output
    const output = executeLoop()

    // Check if all cards are placed correctly
    if (
      initialization?.text === currentLevel.solution.initialization &&
      condition?.text === currentLevel.solution.condition &&
      increment?.text === currentLevel.solution.increment &&
      loopBody?.text === currentLevel.solution.loopBody &&
      JSON.stringify(output) === JSON.stringify(currentLevel.expectedOutput)
    ) {
      setShowSuccess(true)
      setShowError(false)
      setPoints(points + 10)
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    } else {
      setShowError(true)
      setShowSuccess(false)
      // Show error for 2 seconds before resetting
      setIsResetting(true)
      setTimeout(() => {
        resetGame()
        setIsResetting(false)
      }, 2000)
    }
  }

  const nextLevel = () => {
    if (level < levels.length) {
      setLevel(level + 1)
      setShowSuccess(false)
    } else {
      // Navigate to next section or show completion
      setShowSuccess(true)
      // In a real app, you might use router.push('/next-section') here
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950 text-white overflow-hidden relative">
      <div className="w-full max-w-7xl mx-auto p-4 pt-16 text-white"> {/* Increased max-w to 7xl */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6"> {/* Stack on mobile */}
          <div className="flex items-center gap-2">
            <Award className="h-6 w-6 text-primary md:h-8 md:w-8" /> {/* Responsive icon size */}
            <h1 className="text-2xl md:text-3xl font-bold">For Loop Challenge</h1> {/* Responsive font size */}
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <Badge variant="outline" className="text-yellow-500 border-yellow-500 flex items-center gap-1">
              <Sparkles className="h-4 w-4 md:h-5 md:w-5" /> {/* Responsive icon size */}
              <span>{points} Points</span>
            </Badge>
            <Badge variant="outline" className="text-purple-500 border-purple-500 flex items-center gap-1">
              <Award className="h-4 w-4 md:h-5 md:w-5" /> {/* Responsive icon size */}
              <span>Level {level}</span>
            </Badge>
          </div>
        </div>

        <Card className="border-4 border-primary shadow-lg">
          <CardHeader className="bg-primary/10">
            <CardTitle className="text-xl">{levels[level - 1]?.title || "No level data available"}</CardTitle>
            <CardDescription>{levels[level - 1]?.description || "No description available"}</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-12 gap-6">
              {/* Left Side - Task Visualization */}
              <div className="col-span-2 flex flex-col items-center">
                <h2 className="text-lg font-semibold mb-4">Task</h2>
                <div className="flex flex-col items-center gap-4 bg-gray-100 p-6 rounded-lg text-black">
                  <div className="text-center font-medium">{currentTask}</div>

                  {/* Visual representation based on the level */}
                  {level === 1 && (
                    <div className="flex flex-col items-center gap-2">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <div
                          key={num}
                          className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold"
                        >
                          {num}
                        </div>
                      ))}
                    </div>
                  )}

                  {level === 2 && (
                    <div className="flex flex-col items-center gap-2">
                      <div className="text-lg font-bold">0+1+2+...+9</div>
                      <div className="text-xl font-bold">=45</div>
                    </div>
                  )}

                  {level === 3 && (
                    <div className="flex flex-col items-center gap-2">
                      {[1, 3, 5, 7, 9].map((num) => (
                        <div
                          key={num}
                          className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold"
                        >
                          {num}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Output Display */}
                {loopOutput.length > 0 && (
                  <div className="mt-4 w-full">
                    <h3 className="text-sm font-medium mb-2">Output:</h3>
                    <div className="bg-black text-green-400 p-2 rounded-md font-mono text-xs max-h-40 overflow-y-auto">
                      {loopOutput.map((line, index) => (
                        <div key={index}>{line}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Middle - Code Editor */}
              <div className="col-span-6 flex flex-col">
                <h2 className="text-lg font-semibold mb-4 text-center">Your Code</h2>
                <div className="bg-black text-green-400 p-4 rounded-md font-mono text-sm space-y-2 flex-grow overflow-x-auto ">
                  <div>public class ForLoopExample {"{"}</div>
                  <div className="ml-4">public static void main(String[] args) {"{"}</div>

                  {level === 2 && <div className="ml-8">int sum = 0;</div>}

                  <div className="ml-8 flex items-center gap-2">
                    <span>for (</span>
                    <div
                      onDragOver={handleDragOver}
                      onDrop={() => handleDrop("initialization")}
                      className="w-38 h-6 border-2 border-dashed border-green-400 rounded px-2 flex items-center"
                    >
                      {placedCards.initialization ? placedCards.initialization.text : "initialization"}
                    </div>
                    <span> </span>
                    <div
                      onDragOver={handleDragOver}
                      onDrop={() => handleDrop("condition")}
                      className="w-22 h-6 border-2 border-dashed border-green-400 rounded px-2 flex items-center"
                    >
                      {placedCards.condition ? placedCards.condition.text : "condition"}
                    </div>
                    <span>; </span>
                    <div
                      onDragOver={handleDragOver}
                      onDrop={() => handleDrop("increment")}
                      className="w-22 h-6 border-2 border-dashed border-green-400 rounded px-2 flex items-center"
                    >
                      {placedCards.increment ? placedCards.increment.text : "increment"}
                    </div>
                    <span>) {"{"}</span>
                  </div>

                  <div className="ml-12 flex items-center gap-2">
                    <div
                      onDragOver={handleDragOver}
                      onDrop={() => handleDrop("loopBody")}
                      className="w-64 h-6 border-2 border-dashed border-green-400 rounded px-2 flex items-center"
                    >
                      {placedCards.loopBody ? placedCards.loopBody.text : "loop body"}
                    </div>
                  </div>

                  <div className="ml-8">{"}"}</div>

                  {level === 2 && <div className="ml-8">System.out.println("Sum: " + sum);</div>}

                  <div className="ml-4">{"}"}</div>
                  <div>{"}"}</div>
                </div>
              </div>

              {/* Right Side - Cards */}
              <div className="col-span-4 flex flex-col">
                <h2 className="text-lg font-semibold mb-4 text-center">Available Cards</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2 text-center">Initialization</h3>
                    <div className="text-black flex justify-center gap-2 ">
                      {availableCards
                        .filter((card) => card.type === "initialization")
                        .map((card) => (
                          <div
                            key={card.id}
                            draggable
                            onDragStart={() => handleDragStart(card)}
                            className="bg-white p-2 rounded border border-gray-200 cursor-move hover:border-primary transition-colors"
                          >
                            {card.text}
                          </div>
                        ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2 text-center">Condition</h3>
                    <div className="text-black flex justify-center gap-2 ">
                      {availableCards
                        .filter((card) => card.type === "condition")
                        .map((card) => (
                          <div
                            key={card.id}
                            draggable
                            onDragStart={() => handleDragStart(card)}
                            className="bg-white p-2 rounded border border-gray-200 cursor-move hover:border-primary transition-colors"
                          >
                            {card.text}
                          </div>
                        ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2 text-center">Increment</h3>
                    <div className="text-black flex justify-center gap-2 ">
                      {availableCards
                        .filter((card) => card.type === "increment")
                        .map((card) => (
                          <div
                            key={card.id}
                            draggable
                            onDragStart={() => handleDragStart(card)}
                            className="bg-white p-2 rounded border border-gray-200 cursor-move hover:border-primary transition-colors"
                          >
                            {card.text}
                          </div>
                        ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Loop Body</h3>
                    <div className="space-y-2 text-black">
                      {availableCards
                        .filter((card) => card.type === "loopBody")
                        .map((card) => (
                          <div
                            key={card.id}
                            draggable
                            onDragStart={() => handleDragStart(card)}
                            className="bg-white p-2 rounded border border-gray-200 cursor-move hover:border-primary transition-colors"
                          >
                            {card.text}
                          </div>
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
                  <Button onClick={startGame} className="flex items-center gap-2">
                    <Play className="h-4 w-4" />
                    Start Game
                  </Button>
                </div>
              )}

              {gameStarted && (
                <div className="space-y-4">
                  <div className="flex justify-center gap-4">
                    <Button onClick={checkSolution} className="flex items-center gap-2">
                      Run Code
                    </Button>
                    {placedCardsHistory.length > 0 && (
                      <Button onClick={handleUndo} variant="outline" className="flex items-center gap-2">
                        <Undo2 className="h-4 w-4" />
                        Undo
                      </Button>
                    )}
                  </div>

                  {showSuccess && (
                    <div className="text-center py-4">
                      <div className="text-green-600 font-bold mb-2">Level Complete! 🎉</div>
                      <Button onClick={nextLevel} className="flex items-center gap-2">
                        Next Level <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  )}

                  {showError && (
                    <div className="text-center py-4">
                      <div className="text-red-600 font-bold mb-2 flex items-center justify-center gap-2">
                        <XCircle className="h-5 w-5" />
                        Wrong Answer! Try Again
                      </div>
                      {isResetting && <div className="text-sm text-gray-500 mt-2">Resetting in 2 seconds...</div>}
                    </div>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

