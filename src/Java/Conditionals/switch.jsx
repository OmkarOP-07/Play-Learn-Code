import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Play, ChevronRight, Award, Sparkles, XCircle, RotateCcw, Zap, Check } from "lucide-react";
import confetti from "canvas-confetti";
import { useJavaPoints } from "../JavaPointsContext";

export default function SwitchStatements() {
  const navigate = useNavigate();
  const [level, setLevel] = useState(1);
  const { points, addPoints } = useJavaPoints();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);
  const [outputResult, setOutputResult] = useState("");
  const [currentInput, setCurrentInput] = useState("");
  const [solution, setSolution] = useState([]);
  const [attempts, setAttempts] = useState(0);

  // The cases the player can select and arrange
  const [availableCases, setAvailableCases] = useState([]);
  
  // The cases the player has arranged in the switch statement
  const [orderedCases, setOrderedCases] = useState([]);

  const levels = useMemo(() => [
    {
      id: 1,
      title: "Weather App",
      description: "Create a switch statement that displays the correct message based on weather conditions.",
      input: "sunny",
      possibleInputs: ["sunny", "rainy", "cloudy", "snowy", "windy"],
      correctOutput: {
        "sunny": "Perfect day for outdoor activities!",
        "rainy": "Don't forget your umbrella!",
        "cloudy": "It might rain later, be prepared.",
        "snowy": "Drive carefully and stay warm!",
        "windy": "Hold onto your hat!",
        "default": "Weather condition not recognized."
      },
      casesToArrange: [
        { value: "\"sunny\"", output: "\"Perfect day for outdoor activities!\"" },
        { value: "\"rainy\"", output: "\"Don't forget your umbrella!\"" },
        { value: "\"cloudy\"", output: "\"It might rain later, be prepared.\"" },
        { value: "\"snowy\"", output: "\"Drive carefully and stay warm!\"" },
        { value: "\"windy\"", output: "\"Hold onto your hat!\"" },
        { value: "default", output: "\"Weather condition not recognized.\"" }
      ]
    },
    {
      id: 2,
      title: "Grade Calculator",
      description: "Create a switch statement that returns the appropriate message based on a student's grade.",
      input: "B",
      possibleInputs: ["A", "B", "C", "D", "F"],
      correctOutput: {
        "A": "Excellent work!",
        "B": "Good job!",
        "C": "Satisfactory.",
        "D": "Needs improvement.",
        "F": "Failed. Please retake the course.",
        "default": "Invalid grade."
      },
      casesToArrange: [
        { value: "\"A\"", output: "\"Excellent work!\"" },
        { value: "\"B\"", output: "\"Good job!\"" },
        { value: "\"C\"", output: "\"Satisfactory.\"" },
        { value: "\"D\"", output: "\"Needs improvement.\"" },
        { value: "\"F\"", output: "\"Failed. Please retake the course.\"" },
        { value: "default", output: "\"Invalid grade.\"" }
      ]
    },
    {
      id: 3,
      title: "Day of the Week",
      description: "Create a switch statement that returns if it's a weekday or weekend based on the day.",
      input: "Saturday",
      possibleInputs: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      correctOutput: {
        "Monday": "It's a weekday. Back to work!",
        "Tuesday": "It's a weekday. Keep going!",
        "Wednesday": "It's a weekday. Halfway there!",
        "Thursday": "It's a weekday. Almost there!",
        "Friday": "It's a weekday. Weekend is coming!",
        "Saturday": "It's the weekend. Time to relax!",
        "Sunday": "It's the weekend. Enjoy your day!",
        "default": "Invalid day."
      },
      casesToArrange: [
        { value: "\"Monday\"", output: "\"It's a weekday. Back to work!\"" },
        { value: "\"Tuesday\"", output: "\"It's a weekday. Keep going!\"" },
        { value: "\"Wednesday\"", output: "\"It's a weekday. Halfway there!\"" },
        { value: "\"Thursday\"", output: "\"It's a weekday. Almost there!\"" },
        { value: "\"Friday\"", output: "\"It's a weekday. Weekend is coming!\"" },
        { value: "\"Saturday\"", output: "\"It's the weekend. Time to relax!\"" },
        { value: "\"Sunday\"", output: "\"It's the weekend. Enjoy your day!\"" },
        { value: "default", output: "\"Invalid day.\"" }
      ]
    }
  ], []);

  useEffect(() => {
    if (levels && levels.length > 0 && level <= levels.length) {
      const currentLevel = levels[level - 1];
      setCurrentInput(currentLevel.input);
      setAvailableCases([...currentLevel.casesToArrange].sort(() => Math.random() - 0.5));
      setOrderedCases([]);
      setOutputResult("");
      setGameStarted(false);
      setShowError(false);
      setShowSuccess(false);
      setAttempts(0);
    }
  }, [level, levels]);

  const startGame = () => {
    setGameStarted(true);
  };

  const handleCaseSelect = (caseOption, index) => {
    if (selectedCase === index) {
      setSelectedCase(null);
    } else {
      setSelectedCase(index);
    }
  };

  const handleAddCase = () => {
    if (selectedCase !== null) {
      const caseToAdd = availableCases[selectedCase];
      setOrderedCases([...orderedCases, caseToAdd]);
      setAvailableCases(availableCases.filter((_, index) => index !== selectedCase));
      setSelectedCase(null);
    }
  };

  const handleRemoveCase = (index) => {
    const caseToRemove = orderedCases[index];
    setAvailableCases([...availableCases, caseToRemove]);
    setOrderedCases(orderedCases.filter((_, idx) => idx !== index));
  };

  const handleMoveCaseUp = (index) => {
    if (index > 0) {
      const newOrderedCases = [...orderedCases];
      [newOrderedCases[index], newOrderedCases[index - 1]] = [newOrderedCases[index - 1], newOrderedCases[index]];
      setOrderedCases(newOrderedCases);
    }
  };

  const handleMoveCaseDown = (index) => {
    if (index < orderedCases.length - 1) {
      const newOrderedCases = [...orderedCases];
      [newOrderedCases[index], newOrderedCases[index + 1]] = [newOrderedCases[index + 1], newOrderedCases[index]];
      setOrderedCases(newOrderedCases);
    }
  };

  const changeInput = (input) => {
    setCurrentInput(input);
    setOutputResult("");
  };

  const runCode = () => {
    // Validate that we have at least one case
    if (orderedCases.length === 0) {
      setShowError(true);
      setErrorMessage("You need to add at least one case!");
      return;
    }

    // Check if we have a default case if required
    const currentLevel = levels[level - 1];
    const hasDefaultCase = orderedCases.some(c => c.value === "default");
    const needsDefaultCase = currentLevel.casesToArrange.some(c => c.value === "default");
    
    if (needsDefaultCase && !hasDefaultCase) {
      setShowError(true);
      setErrorMessage("Your switch statement should include a default case!");
      return;
    }

    // Simulate running the code
    let found = false;
    let result = "";
    
    // Find the matching case
    for (const caseItem of orderedCases) {
      if (caseItem.value === `"${currentInput}"` || caseItem.value === "default" && !found) {
        result = caseItem.output.replace(/"/g, '');
        found = true;
        
        // If it's not a default case, we break
        if (caseItem.value !== "default") {
          break;
        }
      }
    }
    
    if (!found) {
      result = "No matching case found.";
    }
    
    setOutputResult(result);
    setAttempts(attempts + 1);
    
    // Check if the output is correct
    const expectedOutput = currentLevel.correctOutput[currentInput] || currentLevel.correctOutput.default;
    
    if (result === expectedOutput) {
      setShowSuccess(true);
      setShowError(false);  
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } else {
      setShowError(true);
      setErrorMessage(`Expected output: "${expectedOutput}"`);
    }
  };

  const resetGame = () => {
    const currentLevel = levels[level - 1];
    setAvailableCases([...currentLevel.casesToArrange].sort(() => Math.random() - 0.5));
    setOrderedCases([]);
    setOutputResult("");
    setShowError(false);
    setShowSuccess(false);
    setAttempts(0);
  };

  const nextLevel = () => {
    if (level < levels.length) {
      setLevel(level + 1);
      setShowSuccess(false);
    } else {
      addPoints(10);
      navigate('/java/loops/for-loop');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950 text-white overflow-hidden relative">
      <div className="w-full max-w-4xl mx-auto p-4 pt-12 md:pt-16 text-white">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-yellow-400" />
            <h1 className="text-xl md:text-2xl font-bold">Java Switch Statement Challenge</h1>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-yellow-400 border-yellow-400 flex items-center gap-1">
              <Sparkles className="h-4 w-4" />
              <span>{points} Points</span>
            </Badge>
            <Badge variant="outline" className="text-purple-400 border-purple-400 flex items-center gap-1">
              <Award className="h-4 w-4" />
              <span>Level {level}</span>
            </Badge>
          </div>
        </div>

        <Card className="border-4 border-primary shadow-lg mb-6">
          <CardHeader className="bg-primary/10">
            <CardTitle className="text-xl">{levels[level - 1]?.title || 'No level data available'}</CardTitle>
            <CardDescription>
              {levels[level - 1]?.description || 'No description available'}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 md:p-6">
            {/* Input Selection */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Test Input:</h2>
              <div className="flex flex-wrap gap-2">
                {levels[level - 1]?.possibleInputs.map((input) => (
                  <Button
                    key={input}
                    variant={currentInput === input ? "default" : "outline"}
                    size="sm"
                    onClick={() => changeInput(input)}
                    className="text-sm"
                  >
                    {input}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
              {/* Switch Statement Builder */}
              <div className="lg:col-span-7 space-y-4">
                <h2 className="text-lg font-semibold">Your Switch Statement</h2>
                <div className="bg-black text-green-400 p-4 rounded-md font-mono text-sm space-y-2 overflow-x-auto">
                  <div>public class SwitchExample {"{"}</div>
                  <div className="ml-4">public static void main(String[] args) {"{"}</div>
                  <div className="ml-8">String input = "{currentInput}";</div>
                  <div className="ml-8">String output;</div>
                  <div className="ml-8">switch(input) {"{"}</div>
                  
                  {orderedCases.map((caseItem, index) => (
                    <div key={index} className="ml-12">
                      <div className="flex justify-between items-center">
                        <span>case {caseItem.value}:</span>
                        <div className="flex gap-1">
                          <button 
                            onClick={() => handleMoveCaseUp(index)}
                            className="text-xs bg-purple-900 px-1 rounded" 
                            disabled={index === 0}
                          >
                            ↑
                          </button>
                          <button 
                            onClick={() => handleMoveCaseDown(index)}
                            className="text-xs bg-purple-900 px-1 rounded" 
                            disabled={index === orderedCases.length - 1}
                          >
                            ↓
                          </button>
                          <button 
                            onClick={() => handleRemoveCase(index)}
                            className="text-xs bg-red-900 px-1 rounded"
                          >
                            x
                          </button>
                        </div>
                      </div>
                      <div className="ml-4">output = {caseItem.output};</div>
                      <div className="ml-4">break;</div>
                    </div>
                  ))}
                  
                  <div className="ml-8">{"};"}</div>
                  <div className="ml-8">System.out.println(output);</div>
                  <div className="ml-4">{"}"}</div>
                  <div>{"}"}</div>
                </div>

                {/* Output Display */}
                <div className="p-4 bg-gray-800 rounded-md border border-gray-700">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <span>Output:</span>
                    {showSuccess && <Check className="h-4 w-4 text-green-500" />}
                  </h3>
                  <div className="font-mono bg-black p-2 rounded min-h-8">
                    {outputResult || "[No output yet. Run your code!]"}
                  </div>
                </div>
              </div>

              {/* Available Cases */}
              <div className="lg:col-span-5 space-y-4">
                <h2 className="text-lg font-semibold">Available Cases</h2>
                <div className="bg-gray-800 p-4 rounded-md space-y-2 max-h-64 overflow-y-auto">
                  {availableCases.length > 0 ? (
                    availableCases.map((caseOption, index) => (
                      <div 
                        key={index}
                        onClick={() => handleCaseSelect(caseOption, index)}
                        className={`p-3 rounded cursor-pointer ${
                          selectedCase === index 
                            ? 'bg-purple-700 border-2 border-purple-500' 
                            : 'bg-gray-700 hover:bg-gray-600'
                        }`}
                      >
                        <div className="font-medium">case {caseOption.value}:</div>
                        <div className="text-sm text-gray-300 ml-4">output = {caseOption.output};</div>
                        <div className="text-sm text-gray-300 ml-4">break;</div>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-400 text-center p-4">All cases have been used!</div>
                  )}
                </div>
                
                {availableCases.length > 0 && (
                  <Button 
                    onClick={handleAddCase}
                    disabled={selectedCase === null}
                    className="w-full"
                  >
                    Add Selected Case to Switch
                  </Button>
                )}
              </div>
            </div>

            {/* Game Controls */}
            <div className="mt-6 space-y-4">
              {!gameStarted ? (
                <div className="flex justify-center">
                  <Button onClick={startGame} className="flex items-center gap-2">
                    <Play className="h-4 w-4" />
                    Start Challenge
                  </Button>
                </div>
              ) : (
                <div className="flex flex-wrap justify-center gap-4">
                  <Button onClick={runCode} className="flex items-center gap-2">
                    <Play className="h-4 w-4" />
                    Run Code
                  </Button>
                  <Button onClick={resetGame} variant="outline" className="flex items-center gap-2">
                    <RotateCcw className="h-4 w-4" />
                    Reset
                  </Button>
                </div>
              )}

              {showSuccess && (
                <div className="text-center py-4">
                  <div className="text-green-500 font-bold mb-2">Challenge Complete! 🎉</div>
                  <Button onClick={nextLevel} className="flex items-center gap-2">
                    Next Level <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}

              {showError && (
                <div className="text-center py-4">
                  <div className="text-red-500 font-bold mb-2 flex items-center justify-center gap-2">
                    <XCircle className="h-5 w-5" />
                    {errorMessage || "There's an issue with your solution. Try again!"}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}