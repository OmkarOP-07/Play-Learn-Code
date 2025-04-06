"use client";

import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { HelpCircle, Play, Trophy, ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { useNavigate } from 'react-router-dom';
import confetti from "canvas-confetti";

// Available items for drag and drop
const availableItems = {
  constructorParts: [
    { id: "public", name: "public", type: "keyword", description: "Access modifier" },
    { id: "Fruit", name: "Fruit", type: "className", description: "Class name" },
    { id: "parameters", name: "(String name, String color, double price)", type: "parameters", description: "Constructor parameters" },
    { id: "body", name: "{ System.out.println(\"A fruit has been created!\"); }", type: "body", description: "Default constructor body" },
    { id: "paramBody", name: "{ this.name = name; this.color = color; this.price = price; }", type: "body", description: "Parameterized constructor body" }
  ]
};

const correctDefaultConstructor = ["public", "Fruit", "body"];
const correctParamConstructor = ["public", "Fruit", "parameters", "paramBody"];

export function ConstructorsGame() {
  const [defaultConstructor, setDefaultConstructor] = useState([]);
  const [paramConstructor, setParamConstructor] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [points, setPoints] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [showRoute, setShowRoute] = useState(false);
  const navigate = useNavigate();

  const handleDrop = (item, type) => {
    if (submitted) return; // Prevent drops after submission
    
    if (type === "default") {
      setDefaultConstructor(prev => [...prev, item]);
      checkCompletion();
    } else {
      setParamConstructor(prev => [...prev, item]);
      checkCompletion();
    }
  };

  const checkCompletion = () => {
    const isDefaultCorrect = defaultConstructor.every((item, index) => 
      item.name === correctDefaultConstructor[index]);
    const isParamCorrect = paramConstructor.every((item, index) => 
      item.name === correctParamConstructor[index]);

    if (isDefaultCorrect || isParamCorrect) {
      setShowPreview(true);
    }
  };

  const calculatePoints = () => {
    let totalPoints = 0;
    
    // Check default constructor - all parts must be in correct order
    const isDefaultCorrect = defaultConstructor.length === correctDefaultConstructor.length &&
      defaultConstructor.every((item, index) => 
        item.name === correctDefaultConstructor[index]);
    
    // Check parameterized constructor - all parts must be in correct order
    const isParamCorrect = paramConstructor.length === correctParamConstructor.length &&
      paramConstructor.every((item, index) => 
        item.name === correctParamConstructor[index]);

    // Award points
    if (isDefaultCorrect) {
      totalPoints += 50; // 50 points for correct default constructor
    } else if (defaultConstructor.length > 0) {
      // Partial points for attempting default constructor
      const correctParts = defaultConstructor.filter((item, index) => 
        correctDefaultConstructor[index] === item.name).length;
      totalPoints += Math.floor((correctParts / correctDefaultConstructor.length) * 25);
    }

    if (isParamCorrect) {
      totalPoints += 50; // 50 points for correct parameterized constructor
    } else if (paramConstructor.length > 0) {
      // Partial points for attempting parameterized constructor
      const correctParts = paramConstructor.filter((item, index) => 
        correctParamConstructor[index] === item.name).length;
      totalPoints += Math.floor((correctParts / correctParamConstructor.length) * 25);
    }

    // Bonus points for completing both correctly
    if (isDefaultCorrect && isParamCorrect) {
      totalPoints += 25; // 25 bonus points
    }

    return totalPoints;
  };

  const handleSubmit = () => {
    const earnedPoints = calculatePoints();
    setPoints(earnedPoints);
    setShowDialog(true);
    setSubmitted(true);

    // Trigger confetti effect
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const handleReset = () => {
    setDefaultConstructor([]);
    setParamConstructor([]);
    setShowPreview(false);
    setSubmitted(false);
    setShowDialog(false);
    setPoints(0);
  };

  const handleNextClick = () => {
    navigate('/Java/OOPS/Inheritance');
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-full max-w-5xl mx-auto p-6">
        <Card className="border-2 border-primary shadow-md">
          <CardHeader>
            <CardTitle className="text-white">Build Your Constructors</CardTitle>
            <p className="text-sm text-white">
              Drag and drop the elements to build default and parameterized constructors
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Example Code */}
            <div className="bg-black bg-opacity-30 p-4 rounded-md">
              <h3 className="font-semibold mb-2 text-white">Example:</h3>
              <pre className="text-sm text-white">
{`
public Fruit() {
    System.out.println("A fruit has been created!");
}


public Fruit(String name, String color, double price) {
    this.name = name;
    this.color = color;
    this.price = price;
}`}
              </pre>
            </div>

            <div className="grid grid-cols-3 gap-6 bg-black bg-opacity-30 p-4 rounded-md">
              {/* Available Items */}
              <div className="space-y-4">
                <h3 className="font-semibold text-sm text-white">Available Elements</h3>
                <div className="space-y-2">
                  {availableItems.constructorParts.map((item) => (
                    <div
                      key={item.id}
                      className="p-2 rounded-md bg-black bg-opacity-20 cursor-move hover:bg-black border-purple-500 border-2 hover:bg-opacity-30"
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData("text/plain", JSON.stringify(item));
                      }}
                    >
                      <Badge className="text-white bg-transparent border-none">{item.name}</Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Drop Zones */}
              <div className="col-span-2 grid grid-cols-2 gap-4">
                {/* Default Constructor Zone */}
                <div
                  className="p-4 border-2 border-dashed border-gray-300 rounded-md"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const item = JSON.parse(e.dataTransfer.getData("text/plain"));
                    handleDrop(item, "default");
                  }}
                >
                    <h3 className="font-semibold mb-2 text-white">Default Constructor</h3>
                  <div className="space-y-2">
                    {defaultConstructor.map((item, index) => (
                      <div key={index} className="p-2 bg-blue-50 rounded-md">
                        <Badge variant="outline" className="text-white">{item.name}</Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Parameterized Constructor Zone */}
                <div
                  className="p-4 border-2 border-dashed border-gray-300 rounded-md"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const item = JSON.parse(e.dataTransfer.getData("text/plain"));
                    handleDrop(item, "param");
                  }}
                >
                  <h3 className="font-semibold mb-2 text-white">Parameterized Constructor</h3>
                  <div className="space-y-2">
                    {paramConstructor.map((item, index) => (
                      <div key={index} className="p-2 bg-green-50 rounded-md">
                        <Badge variant="outline" className="text-white">{item.name}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Success Message */}
            {showPreview && !submitted && (
              <div className="bg-green-50 p-4 rounded-md">
                <p className="text-black">Great job! You've correctly built a constructor! Click submit to see your score.</p>
              </div>
            )}

            {/* Submit and Reset Buttons */}
            <div className="flex justify-end gap-4">
              <Button
                variant="outline"
                onClick={handleReset}
                disabled={!defaultConstructor.length && !paramConstructor.length}
                className="border-2 border-primary/20 hover:bg-gray-100 bg-white text-black"
              >
                Reset
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={submitted || (!defaultConstructor.length && !paramConstructor.length)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Submit
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Next Topic Card */}
        <Card 
          className="mt-6 border-2 border-primary/20 cursor-pointer transition-all duration-300 hover:scale-105"
          onMouseEnter={() => setShowRoute(true)}
          onMouseLeave={() => setShowRoute(false)}
          onClick={handleNextClick}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">Next Topic: Inheritance</h3>
                <p className="text-white">Learn about inheritance in Java</p>
              </div>
              <div className="flex items-center gap-2">
                {showRoute && (
                  <span className="text-sm text-white">/Java/OOPS/Inheritance</span>
                )}
                <ArrowRight className="h-5 w-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Points Dialog */}
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent className="bg-[#1a1a1a]/95 backdrop-blur-sm border border-white/20">
            <div className="text-center py-4">
              <div className="text-center mt-4 text-primary font-bold animate-bounce">
                Awesome job! +{points} points!
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DndProvider>
  );
}

export default function Constructors() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950 text-white p-8">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Constructors in Java</h1>
        <p className="text-xl mb-8 text-center max-w-3xl mx-auto">
          Learn about Default and Parameterized Constructors in Java through this interactive game.
          Drag and drop elements to build your constructors and see the generated code.
        </p>
        
        <ConstructorsGame />
      </div>
    </div>
  );
}