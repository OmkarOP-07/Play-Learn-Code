"use client";

import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Trophy, Code, ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { useNavigate } from 'react-router-dom';
import confetti from "canvas-confetti";

const availableItems = [
  { id: "class_vehicle", name: "class Vehicle", type: "keyword", description: "Base class declaration" },
  { id: "engine_status", name: "private boolean engineRunning;", type: "attribute", description: "Engine status" },
  { id: "start_engine", name: "public void startEngine() { engineRunning = true; System.out.println(\"Engine started!\"); }", type: "method", description: "Start engine method" },
  { id: "stop_engine", name: "public void stopEngine() { engineRunning = false; System.out.println(\"Engine stopped.\"); }", type: "method", description: "Stop engine method" },
  { id: "extends_car", name: "class Car extends Vehicle", type: "keyword", description: "Car class declaration" },
  { id: "speed", name: "private int speed;", type: "attribute", description: "Speed attribute" },
  { id: "accelerate", name: "public void accelerate() { speed += 10; System.out.println(\"Speed: \" + speed); }", type: "method", description: "Accelerate method" },
  { id: "brake", name: "public void brake() { speed = Math.max(0, speed - 10); System.out.println(\"Speed: \" + speed); }", type: "method", description: "Brake method" }
];

const correctBaseClass = ["class_vehicle", "engine_status", "start_engine", "stop_engine"];
const correctChildClass = ["extends_car", "speed", "accelerate", "brake"];

export function SingleInheritanceGame() {
  const [baseClass, setBaseClass] = useState([]);
  const [childClass, setChildClass] = useState([]);
  const [shuffledItems, setShuffledItems] = useState([...availableItems].sort(() => Math.random() - 0.5));
  const [showDialog, setShowDialog] = useState(false);
  const [points, setPoints] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [showRoute, setShowRoute] = useState(false);
  const navigate = useNavigate();

  const handleDrop = (item, type) => {
    if (submitted) return;

    if (type === "base") {
      setBaseClass(prev => [...prev, item]);
    } else if (type === "child") {
      setChildClass(prev => [...prev, item]);
    }
  };

  const calculatePoints = () => {
    let totalPoints = 0;

    const baseCorrectParts = baseClass.filter((item, index) => 
      item.id === correctBaseClass[index]).length;
    totalPoints += Math.floor((baseCorrectParts / correctBaseClass.length) * 50);

    const childCorrectParts = childClass.filter((item, index) => 
      item.id === correctChildClass[index]).length;
    totalPoints += Math.floor((childCorrectParts / correctChildClass.length) * 50);

    if (baseCorrectParts === correctBaseClass.length && childCorrectParts === correctChildClass.length) {
      totalPoints += 25;
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
    setBaseClass([]);
    setChildClass([]);
    setSubmitted(false);
    setShowDialog(false);
    setPoints(0);
  };

  const handleNextClick = () => {
    navigate('/Java/OOPS/Inheritance/multilevel');
  };

  return (
    <DndProvider backend={HTML5Backend}>
     <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950 overflow-hidden relative pt-16 text-white">
     <div className="w-full max-w-5xl mx-auto p-6">
        {/* Example Card */}
        <Card className="mb-6 border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Code className="h-5 w-5 text-white" />
              Single Inheritance Example
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-black bg-opacity-20 p-4 rounded-md font-mono text-sm">
              <div className="text-white">
                <p>class Vehicle {'{'}</p>
                <p className="ml-4">private boolean engineRunning;</p>
                <p className="ml-4"></p>
                <p className="ml-4">public void startEngine() {'{'}</p>
                <p className="ml-8">engineRunning = true;</p>
                <p className="ml-8">System.out.println("Engine started!");</p>
                <p className="ml-4">{'}'}</p>
                <p>{'}'}</p>
                <p></p>
                <p>class Car extends Vehicle {'{'}</p>
                <p className="ml-4">private int speed;</p>
                <p className="ml-4"></p>
                <p className="ml-4">public void accelerate() {'{'}</p>
                <p className="ml-8">speed += 10;</p>
                <p className="ml-8">System.out.println("Speed: " + speed);</p>
                <p className="ml-4">{'}'}</p>
                <p>{'}'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Game Card */}
        <Card className="border-2 border-primary shadow-md">
          <CardHeader>
            <CardTitle className="text-white">Build the Vehicle-Car Inheritance</CardTitle>
            <p className="text-sm text-white">
              Drag and drop elements to create a Vehicle base class and a Car child class.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-3 gap-6">
              {/* Available Items */}
              <div className="space-y-4">
                <h3 className="font-semibold text-sm text-white">Available Elements</h3>
                <div className="space-y-2">
                  {shuffledItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-2 bg-black bg-opacity-20 cursor-move hover:bg-black hover:bg-opacity-30"
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData("text/plain", JSON.stringify(item));
                      }}
                    >
                      <Badge variant="outline" className="text-white">{item.name}</Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Drop Zones */}
              <div className="col-span-2 grid grid-cols-2 gap-4">
                {/* Base Class Zone */}
                <div
                  className="p-4 border-2 border-dashed border-gray-300 rounded-md"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const item = JSON.parse(e.dataTransfer.getData("text/plain"));
                    handleDrop(item, "base");
                  }}
                >
                  <h3 className="font-semibold mb-2 text-white">Vehicle (Base Class)</h3>
                  <div className="space-y-2">
                    {baseClass.map((item, index) => (
                      <div key={index} className="p-2 bg-blue-50 rounded-md">
                        <Badge variant="outline" className="text-white">{item.name}</Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Child Class Zone */}
                <div
                  className="p-4 border-2 border-dashed border-gray-300 rounded-md"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const item = JSON.parse(e.dataTransfer.getData("text/plain"));
                    handleDrop(item, "child");
                  }}
                >
                  <h3 className="font-semibold mb-2 text-white">Car (Child Class)</h3>
                  <div className="space-y-2">
                    {childClass.map((item, index) => (
                      <div key={index} className="p-2 bg-green-50 rounded-md">
                        <Badge variant="outline" className="text-white">{item.name}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Submit and Reset Buttons */}
            <div className="flex justify-end gap-4">
              <Button
                variant="outline"
                onClick={handleReset}
                disabled={!baseClass.length && !childClass.length}
                className="border-2 border-primary/20 hover:bg-gray-100 text-white"
              >
                Reset
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={submitted || (!baseClass.length && !childClass.length)}
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
                <h3 className="text-xl font-bold text-white">Next: Multilevel Inheritance</h3>
                <p className="text-white">Learn about multilevel inheritance in Java</p>
              </div>
              <div className="flex items-center gap-2">
                {showRoute && (
                  <span className="text-sm text-white">/Java/OOPS/Inheritance/multilevel</span>
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
      </div>
    </DndProvider>
  );
}

export default SingleInheritanceGame; 