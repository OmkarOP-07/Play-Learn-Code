import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Play, ChevronRight, Award, Sparkles, XCircle, Undo2 } from "lucide-react";
import confetti from "canvas-confetti";

export default function ControlStructures() {
  const navigate = useNavigate();
  const [level, setLevel] = useState(1);
  const [points, setPoints] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [currentLight, setCurrentLight] = useState("red");
  const [gameStarted, setGameStarted] = useState(false);
  const [draggedCard, setDraggedCard] = useState(null);
  const [isResetting, setIsResetting] = useState(false);
  const [placedCards, setPlacedCards] = useState({
    ifCondition: null,
    ifAction: null,
    elseIfCondition: null,
    elseIfAction: null,
    elseCondition: null,
    elseAction: null
  });
  const [placedCardsHistory, setPlacedCardsHistory] = useState([]);
  const [availableCards, setAvailableCards] = useState([
    { id: "red", text: "light = red", type: "condition" },
    { id: "yellow", text: "light = yellow", type: "condition" },
    { id: "green", text: "light = green", type: "condition" },
    { id: "go", text: "Go!", type: "action" },
    { id: "stop", text: "Stop!", type: "action" },
    { id: "slow", text: "Go slow!", type: "action" }
  ]);
  const [availableCardsHistory, setAvailableCardsHistory] = useState([]);

  const levels = [
    {
      level: 1,
      title: "Traffic Light Control",
      description: "Drag and drop the correct conditions and actions for the traffic light",
      light: "red",
      expectedOutput: "Stop!",
      solution: {
        ifCondition: "light = red",
        ifAction: "Stop!",
        elseIfCondition: "light = yellow",
        elseIfAction: "Go slow!",
        elseCondition: "light = green",
        elseAction: "Go!"
      }
    }
  ];

  useEffect(() => {
    if (level <= levels.length) {
      setCurrentLight(levels[level - 1].light);
      setPlacedCards({
        ifCondition: null,
        ifAction: null,
        elseIfCondition: null,
        elseIfAction: null,
        elseCondition: null,
        elseAction: null
      });
      setGameStarted(false);
      setShowError(false);
      // Reset available cards
      setAvailableCards([
        { id: "red", text: "light = red", type: "condition" },
        { id: "yellow", text: "light = yellow", type: "condition" },
        { id: "green", text: "light = green", type: "condition" },
        { id: "go", text: "Go!", type: "action" },
        { id: "stop", text: "Stop!", type: "action" },
        { id: "slow", text: "Go slow!", type: "action" }
      ]);
    }
  }, [level]);

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
    const isConditionSlot = slot.includes('Condition');
    const isActionSlot = slot.includes('Action');

    if (
      (isConditionSlot && draggedCard.type === 'condition') ||
      (isActionSlot && draggedCard.type === 'action')
    ) {
      // Save current state to history before making changes
      setPlacedCardsHistory(prev => [...prev, placedCards]);
      setAvailableCardsHistory(prev => [...prev, availableCards]);

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
    setPlacedCards({
      ifCondition: null,
      ifAction: null,
      elseIfCondition: null,
      elseIfAction: null,
      elseCondition: null,
      elseAction: null
    });
    setAvailableCards([
      { id: "red", text: "light = red", type: "condition" },
      { id: "yellow", text: "light = yellow", type: "condition" },
      { id: "green", text: "light = green", type: "condition" },
      { id: "go", text: "Go!", type: "action" },
      { id: "stop", text: "Stop!", type: "action" },
      { id: "slow", text: "Go slow!", type: "action" }
    ]);
    setPlacedCardsHistory([]);
    setAvailableCardsHistory([]);
    setShowError(false);
  };

  const checkSolution = () => {
    const currentLevel = levels[level - 1];
    const { ifCondition, ifAction, elseIfCondition, elseIfAction, elseCondition, elseAction } = placedCards;

    if (
      ifCondition?.text === currentLevel.solution.ifCondition &&
      ifAction?.text === currentLevel.solution.ifAction &&
      elseIfCondition?.text === currentLevel.solution.elseIfCondition &&
      elseIfAction?.text === currentLevel.solution.elseIfAction &&
      elseCondition?.text === currentLevel.solution.elseCondition &&
      elseAction?.text === currentLevel.solution.elseAction
    ) {
      setShowSuccess(true);
      setShowError(false);
      setPoints(points + 10);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
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
      navigate('/java/arrays');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 pt-24">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Award className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Traffic Light Control</h1>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="text-yellow-500 border-yellow-500 flex items-center gap-1">
            <Sparkles className="h-4 w-4" />
            <span>{points} Points</span>
          </Badge>
          <Badge variant="outline" className="text-purple-500 border-purple-500 flex items-center gap-1">
            <Award className="h-4 w-4" />
            <span>Level {level}</span>
          </Badge>
        </div>
      </div>

      <Card className="border-4 border-primary shadow-lg">
        <CardHeader className="bg-primary/10">
          <CardTitle className="text-xl">{levels[level - 1].title}</CardTitle>
          <CardDescription>
            {levels[level - 1].description}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-12 gap-6">
            {/* Left Side - Traffic Lights */}
            <div className="col-span-2 flex flex-col items-center">
              <h2 className="text-lg font-semibold mb-4">Traffic Lights</h2>
              <div className="flex flex-col items-center gap-4 bg-gray-100 p-6 rounded-lg">
                <div className="flex flex-col items-center gap-2">
                  <div className={`w-16 h-16 rounded-full ${
                    currentLight === "red" ? "bg-red-500" : "bg-gray-300"
                  } shadow-lg`} />
                  <p className="text-sm font-medium">Red Light</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className={`w-16 h-16 rounded-full ${
                    currentLight === "yellow" ? "bg-yellow-500" : "bg-gray-300"
                  } shadow-lg`} />
                  <p className="text-sm font-medium">Yellow Light</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className={`w-16 h-16 rounded-full ${
                    currentLight === "green" ? "bg-green-500" : "bg-gray-300"
                  } shadow-lg`} />
                  <p className="text-sm font-medium">Green Light</p>
                </div>
              </div>
            </div>

            {/* Middle - Code Editor */}
            <div className="col-span-6 flex flex-col">
              <h2 className="text-lg font-semibold mb-4">Your Code</h2>
              <div className="bg-black text-green-400 p-4 rounded-md font-mono text-sm space-y-2 flex-grow overflow-x-auto">
                <div>public class TrafficControl {"{"}</div>
                <div className="ml-4">public static void main(String[] args) {"{"}</div>
                <div className="ml-8">String light = "{currentLight}";</div>
                <div className="ml-8 flex items-center gap-2">
                  <span>if (</span>
                  <div
                    onDragOver={handleDragOver}
                    onDrop={() => handleDrop('ifCondition')}
                    className="w-64 h-6 border-2 border-dashed border-green-400 rounded px-2 flex items-center"
                  >
                    {placedCards.ifCondition ? placedCards.ifCondition.text : "Drop condition"}
                  </div>
                  <span>) {"{"}</span>
                </div>
                <div className="ml-12 flex items-center gap-2">
                  <span>System.out.println(</span>
                  <div
                    onDragOver={handleDragOver}
                    onDrop={() => handleDrop('ifAction')}
                    className="w-64 h-6 border-2 border-dashed border-green-400 rounded px-2 flex items-center"
                  >
                    {placedCards.ifAction ? placedCards.ifAction.text : "Drop action"}
                  </div>
                  <span>);</span>
                </div>
                <div className="ml-8">{"}"} else if (</div>
                <div className="ml-12 flex items-center gap-2">
                  <div
                    onDragOver={handleDragOver}
                    onDrop={() => handleDrop('elseIfCondition')}
                    className="w-64 h-6 border-2 border-dashed border-green-400 rounded px-2 flex items-center"
                  >
                    {placedCards.elseIfCondition ? placedCards.elseIfCondition.text : "Drop condition"}
                  </div>
                  <span>) {"{"}</span>
                </div>
                <div className="ml-16 flex items-center gap-2">
                  <span>System.out.println(</span>
                  <div
                    onDragOver={handleDragOver}
                    onDrop={() => handleDrop('elseIfAction')}
                    className="w-64 h-6 border-2 border-dashed border-green-400 rounded px-2 flex items-center"
                  >
                    {placedCards.elseIfAction ? placedCards.elseIfAction.text : "Drop action"}
                  </div>
                  <span>);</span>
                </div>
                <div className="ml-12">{"}"} else (</div>
                <div className="ml-12 flex items-center gap-2">
                  <div
                    onDragOver={handleDragOver}
                    onDrop={() => handleDrop('elseCondition')}
                    className="w-64 h-6 border-2 border-dashed border-green-400 rounded px-2 flex items-center"
                  >
                    {placedCards.elseCondition ? placedCards.elseCondition.text : "Drop condition"}
                  </div>
                  <span>) {"{"}</span>
                </div>
                <div className="ml-16 flex items-center gap-2">
                  <span>System.out.println(</span>
                  <div
                    onDragOver={handleDragOver}
                    onDrop={() => handleDrop('elseAction')}
                    className="w-64 h-6 border-2 border-dashed border-green-400 rounded px-2 flex items-center"
                  >
                    {placedCards.elseAction ? placedCards.elseAction.text : "Drop action"}
                  </div>
                  <span>);</span>
                </div>
                <div className="ml-12">{"}"}</div>
                <div className="ml-4">{"}"}</div>
                <div>{"}"}</div>
              </div>
            </div>

            {/* Right Side - Cards */}
            <div className="col-span-4 flex flex-col">
              <h2 className="text-lg font-semibold mb-4">Available Cards</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Conditions</h3>
                  <div className="space-y-2">
                    {availableCards
                      .filter(card => card.type === 'condition')
                      .map(card => (
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
                  <h3 className="text-sm font-medium mb-2">Actions</h3>
                  <div className="space-y-2">
                    {availableCards
                      .filter(card => card.type === 'action')
                      .map(card => (
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
                    <Button 
                      onClick={handleUndo} 
                      variant="outline" 
                      className="flex items-center gap-2"
                    >
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
                    {isResetting && (
                      <div className="text-sm text-gray-500 mt-2">
                        Resetting in 2 seconds...
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 