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
import { useJavaPoints } from "../JavaPointsContext";
const availableItems = [
  { id: "class_vehicle", name: "class Vehicle", type: "keyword", description: "Base class declaration" },
  { id: "engine_status", name: "private boolean engineRunning;", type: "attribute", description: "Engine status" },
  { id: "start_engine", name: "public void startEngine() { engineRunning = true; System.out.println(\"Engine started!\"); }", type: "method", description: "Start engine method" },
  { id: "stop_engine", name: "public void stopEngine() { engineRunning = false; System.out.println(\"Engine stopped.\"); }", type: "method", description: "Stop engine method" },
  { id: "extends_car", name: "class Car extends Vehicle", type: "keyword", description: "Car class declaration" },
  { id: "speed", name: "private int speed;", type: "attribute", description: "Speed attribute" },
  { id: "accelerate", name: "public void accelerate() { speed += 10; System.out.println(\"Speed: \" + speed); }", type: "method", description: "Accelerate method" },
  { id: "brake", name: "public void brake() { speed = Math.max(0, speed - 10); System.out.println(\"Speed: \" + speed); }", type: "method", description: "Brake method" },
  { id: "extends_sportscar", name: "class SportsCar extends Car", type: "keyword", description: "SportsCar class declaration" },
  { id: "turbo", name: "private boolean turboEnabled;", type: "attribute", description: "Turbo status" },
  { id: "turbo_boost", name: "public void turboBoost() { turboEnabled = true; speed += 30; System.out.println(\"TURBO BOOST! Speed: \" + speed); }", type: "method", description: "Turbo boost method" },
  { id: "drift_mode", name: "public void driftMode() { System.out.println(\"Drifting!\"); }", type: "method", description: "Drift mode method" }
];

const correctBaseClass = ["class_vehicle", "engine_status", "start_engine", "stop_engine"];
const correctIntermediateClass = ["extends_car", "speed", "accelerate", "brake"];
const correctChildClass = ["extends_sportscar", "turbo", "turbo_boost", "drift_mode"];

export function MultilevelInheritanceGame() {
  const [baseClass, setBaseClass] = useState([]);
  const [intermediateClass, setIntermediateClass] = useState([]);
  const [childClass, setChildClass] = useState([]);
  const [shuffledItems, setShuffledItems] = useState([...availableItems].sort(() => Math.random() - 0.5));
  const [showDialog, setShowDialog] = useState(false);
  const { points, addPoints } = useJavaPoints();
  const [submitted, setSubmitted] = useState(false);
  const [showRoute, setShowRoute] = useState(false);
  const navigate = useNavigate();

  const handleDrop = (item, type) => {
    if (submitted) return;

    switch(type) {
      case "base":
        setBaseClass(prev => [...prev, item]);
        break;
      case "intermediate":
        setIntermediateClass(prev => [...prev, item]);
        break;
      case "child":
        setChildClass(prev => [...prev, item]);
        break;
    }
  };

  const calculatePoints = () => {
    let totalPoints = 0;

    const baseCorrectParts = baseClass.filter((item, index) => 
      item.id === correctBaseClass[index]).length;
    totalPoints += Math.floor((baseCorrectParts / correctBaseClass.length) * 33);

    const intermediateCorrectParts = intermediateClass.filter((item, index) => 
      item.id === correctIntermediateClass[index]).length;
    totalPoints += Math.floor((intermediateCorrectParts / correctIntermediateClass.length) * 33);

    const childCorrectParts = childClass.filter((item, index) => 
      item.id === correctChildClass[index]).length;
    totalPoints += Math.floor((childCorrectParts / correctChildClass.length) * 34);

    if (baseCorrectParts === correctBaseClass.length && 
        intermediateCorrectParts === correctIntermediateClass.length && 
        childCorrectParts === correctChildClass.length) {
      totalPoints += 25;
    }

    return totalPoints;
  };

  const handleSubmit = () => {
    const earnedPoints = calculatePoints();
    addPoints(10);
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
    setIntermediateClass([]);
    setChildClass([]);
    setSubmitted(false);
    setShowDialog(false);
  };

  const handleNextClick = () => {
    navigate('/Java/OOPS/HierarchicalInheritanceGame');
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-full mx-auto p-6 bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950 justify-center items-center flex flex-col pt-20">
        {/* Example Card */}
        <Card className="mb-6 border-2 border-primary w-[70%]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Code className="h-5 w-5" />
              Multilevel Inheritance Example
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-black bg-opacity-20 p-4 rounded-md font-mono text-sm">
              <div className="text-white">
                <p>class Vehicle {'{'}</p>
                <p className="ml-4">private boolean engineRunning;</p>
                <p className="ml-4">public void startEngine() {'{'}</p>
                <p className="ml-8">engineRunning = true;</p>
                <p className="ml-8">System.out.println("Engine started!");</p>
                <p className="ml-4">{'}'}</p>
                <p>{'}'}</p>
                <p></p>
                <p>class Car extends Vehicle {'{'}</p>
                <p className="ml-4">private int speed;</p>
                <p className="ml-4">public void accelerate() {'{'}</p>
                <p className="ml-8">speed += 10;</p>
                <p className="ml-4">{'}'}</p>
                <p>{'}'}</p>
                <p></p>
                <p>class SportsCar extends Car {'{'}</p>
                <p className="ml-4">private boolean turboEnabled;</p>
                <p className="ml-4">public void turboBoost() {'{'}</p>
                <p className="ml-8">turboEnabled = true;</p>
                <p className="ml-8">speed += 30;</p>
                <p className="ml-4">{'}'}</p>
                <p>{'}'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Game Card */}
        <Card className="border-2 border-primary shadow-md">
          <CardHeader>
            <CardTitle className="text-white">Build the Vehicle-Car-SportsCar Inheritance</CardTitle>
            <p className="text-sm text-white">
              Drag and drop elements to create a three-level inheritance structure.
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
                      className="p-2 bg-black bg-opacity-20 rounded-md cursor-move hover:bg-black hover:bg-opacity-30"
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData("text/plain", JSON.stringify(item));
                      }}
                    >
                      <Badge className="text-white bg-transparent hover:bg-transparent hover:text-white">{item.name}</Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Drop Zones */}
              <div className="col-span-2 grid grid-cols-1 gap-4">
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
                      <div key={index} className="p-2 bg-black bg-opacity-20 rounded-md hover:bg-black hover:bg-opacity-30">
                        <Badge className="text-white bg-transparent hover:bg-transparent hover:text-white">{item.name}</Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Intermediate Class Zone */}
                <div
                  className="p-4 border-2 border-dashed border-gray-300 rounded-md"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const item = JSON.parse(e.dataTransfer.getData("text/plain"));
                    handleDrop(item, "intermediate");
                  }}
                >
                  <h3 className="font-semibold mb-2 text-white">Car (Intermediate Class)</h3>
                  <div className="space-y-2">
                    {intermediateClass.map((item, index) => (
                      <div key={index} className="p-2 bg-black bg-opacity-20 rounded-md hover:bg-black hover:bg-opacity-30">
                        <Badge className="text-white bg-transparent hover:bg-transparent hover:text-white">{item.name}</Badge>
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
                  <h3 className="font-semibold mb-2 text-white">SportsCar (Child Class)</h3>
                  <div className="space-y-2">
                    {childClass.map((item, index) => (
                      <div key={index} className="p-2 bg-black bg-opacity-20 rounded-md hover:bg-black hover:bg-opacity-30">
                        <Badge className="text-white bg-transparent hover:bg-transparent hover:text-white">{item.name}</Badge>
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
                disabled={!baseClass.length && !intermediateClass.length && !childClass.length}
                  className="border-2 border-primary/20 hover:bg-gray-100 bg-white text-black"
              >
                Reset
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={submitted || (!baseClass.length && !intermediateClass.length && !childClass.length)}
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
                <h3 className="text-xl font-bold text-white">Next: Hierarchical Inheritance</h3>
                <p className="text-white">Learn about Hierarchical Inheritance in Java</p>
              </div>
              <div className="flex items-center gap-2">
                {showRoute && (
                  <span className="text-sm text-white">/Java/OOPS/HierarchicalInheritanceGame</span>
                )}
                <ArrowRight className="h-5 w-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Points Dialog */}
       <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent className="bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950 border border-white/20">
            <div className="text-center py-4">
              <div className="text-center mt-4 text-primary font-bold animate-bounce text-2xl text-white">
                Awesome job! +2.5 points!
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DndProvider>
  );
}

export default MultilevelInheritanceGame; 