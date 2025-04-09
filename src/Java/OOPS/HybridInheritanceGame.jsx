"use client";

import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Trophy, Code } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import confetti from "canvas-confetti";

const availableItems = [
  { id: "class_vehicle", name: "class Vehicle", type: "keyword", description: "Base class declaration" },
  { id: "engine_status", name: "private boolean engineRunning;", type: "attribute", description: "Engine status" },
  { id: "start_engine", name: "public void startEngine() { engineRunning = true; System.out.println(\"Engine started!\"); }", type: "method", description: "Start engine method" },
  { id: "stop_engine", name: "public void stopEngine() { engineRunning = false; System.out.println(\"Engine stopped.\"); }", type: "method", description: "Stop engine method" },
  
  { id: "extends_car", name: "class Car extends Vehicle", type: "keyword", description: "Car class declaration" },
  { id: "fuel_level", name: "private int fuelLevel;", type: "attribute", description: "Fuel level" },
  { id: "refuel", name: "public void refuel(int amount) { fuelLevel += amount; System.out.println(\"Fuel level: \" + fuelLevel); }", type: "method", description: "Refuel method" },
  { id: "drive", name: "public void drive() { fuelLevel--; System.out.println(\"Driving using fuel.\"); }", type: "method", description: "Drive method" },
  
  { id: "extends_electric", name: "class ElectricVehicle extends Vehicle", type: "keyword", description: "ElectricVehicle class declaration" },
  { id: "battery_level", name: "private int batteryLevel;", type: "attribute", description: "Battery level" },
  { id: "charge", name: "public void charge(int amount) { batteryLevel += amount; System.out.println(\"Battery level: \" + batteryLevel); }", type: "method", description: "Charge method" },
  { id: "drive_electric", name: "public void driveElectric() { batteryLevel--; System.out.println(\"Driving using electricity.\"); }", type: "method", description: "Electric drive method" },
  
  { id: "extends_hybrid", name: "class HybridCar extends Car implements Electric", type: "keyword", description: "HybridCar class declaration" },
  { id: "mode", name: "private String currentMode;", type: "attribute", description: "Current driving mode" },
  { id: "switch_mode", name: "public void switchMode(String mode) { currentMode = mode; System.out.println(\"Switched to \" + mode + \" mode\"); }", type: "method", description: "Switch mode method" },
  { id: "hybrid_info", name: "public String getHybridInfo() { return \"Fuel: \" + fuelLevel + \", Battery: \" + batteryLevel; }", type: "method", description: "Get hybrid info method" }
];

const correctBaseClass = ["class_vehicle", "engine_status", "start_engine", "stop_engine"];
const correctCarClass = ["extends_car", "fuel_level", "refuel", "drive"];
const correctElectricClass = ["extends_electric", "battery_level", "charge", "drive_electric"];
const correctHybridClass = ["extends_hybrid", "mode", "switch_mode", "hybrid_info"];

export function HybridInheritanceGame() {
  const [baseClass, setBaseClass] = useState([]);
  const [carClass, setCarClass] = useState([]);
  const [electricClass, setElectricClass] = useState([]);
  const [hybridClass, setHybridClass] = useState([]);
  const [shuffledItems, setShuffledItems] = useState([...availableItems].sort(() => Math.random() - 0.5));
  const [showDialog, setShowDialog] = useState(false);
  const [points, setPoints] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleDrop = (item, type) => {
    if (submitted) return;

    switch(type) {
      case "base":
        setBaseClass(prev => [...prev, item]);
        break;
      case "car":
        setCarClass(prev => [...prev, item]);
        break;
      case "electric":
        setElectricClass(prev => [...prev, item]);
        break;
      case "hybrid":
        setHybridClass(prev => [...prev, item]);
        break;
    }
  };

  const calculatePoints = () => {
    let totalPoints = 0;

    const baseCorrectParts = baseClass.filter((item, index) => 
      item.id === correctBaseClass[index]).length;
    totalPoints += Math.floor((baseCorrectParts / correctBaseClass.length) * 25);

    const carCorrectParts = carClass.filter((item, index) => 
      item.id === correctCarClass[index]).length;
    totalPoints += Math.floor((carCorrectParts / correctCarClass.length) * 25);

    const electricCorrectParts = electricClass.filter((item, index) => 
      item.id === correctElectricClass[index]).length;
    totalPoints += Math.floor((electricCorrectParts / correctElectricClass.length) * 25);

    const hybridCorrectParts = hybridClass.filter((item, index) => 
      item.id === correctHybridClass[index]).length;
    totalPoints += Math.floor((hybridCorrectParts / correctHybridClass.length) * 25);

    if (baseCorrectParts === correctBaseClass.length && 
        carCorrectParts === correctCarClass.length && 
        electricCorrectParts === correctElectricClass.length &&
        hybridCorrectParts === correctHybridClass.length) {
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
    setCarClass([]);
    setElectricClass([]);
    setHybridClass([]);
    setSubmitted(false);
    setShowDialog(false);
    setPoints(0);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-full mx-auto pt-20 bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950 flex flex-col items-center p-4">
        {/* Example Card */}
        <Card className="mb-6 bg-black bg-opacity-20 backdrop-blur-sm border border-white/20 w-[85%]">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Code className="h-5 w-5" />
              Hybrid Inheritance Example
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-black/40 p-4 rounded-md font-mono text-sm">
              <div className="text-white/90">
                <p>class Vehicle {'{'}</p>
                <p className="ml-4">private boolean engineRunning;</p>
                <p className="ml-4">public void startEngine() {'{'}</p>
                <p className="ml-8">engineRunning = true;</p>
                <p className="ml-4">{'}'}</p>
                <p>{'}'}</p>
                <p></p>
                <p>class Car extends Vehicle {'{'}</p>
                <p className="ml-4">private int fuelLevel;</p>
                <p className="ml-4">public void refuel(int amount) {'{'}</p>
                <p className="ml-8">fuelLevel += amount;</p>
                <p className="ml-4">{'}'}</p>
                <p>{'}'}</p>
                <p></p>
                <p>class ElectricVehicle extends Vehicle {'{'}</p>
                <p className="ml-4">private int batteryLevel;</p>
                <p className="ml-4">public void charge(int amount) {'{'}</p>
                <p className="ml-8">batteryLevel += amount;</p>
                <p className="ml-4">{'}'}</p>
                <p>{'}'}</p>
                <p></p>
                <p>class HybridCar extends Car implements Electric {'{'}</p>
                <p className="ml-4">private String currentMode;</p>
                <p className="ml-4">public void switchMode(String mode) {'{'}</p>
                <p className="ml-8">currentMode = mode;</p>
                <p className="ml-4">{'}'}</p>
                <p>{'}'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Game Card */}
        <Card className="bg-black bg-opacity-20 backdrop-blur-sm border border-white/20 shadow-lg w-[85%]">
          <CardHeader>
            <CardTitle className="text-white">Build the Hybrid Inheritance Structure</CardTitle>
            <p className="text-sm text-white/90">
              Drag and drop elements to create a hybrid inheritance structure combining multiple and hierarchical inheritance.
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
                      className="p-2 bg-black/40 rounded-md cursor-move hover:bg-black hover:bg-opacity-30 transition-colors"
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData("text/plain", JSON.stringify(item));
                      }}
                    >
                      <Badge className="text-white border-white/20 bg-transparent hover:bg-transparent hover:text-white">{item.name}</Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Drop Zones */}
              <div className="col-span-2 grid grid-cols-1 gap-4">
                {/* Base Class Zone */}
                <div
                  className="p-4 border-2 border-dashed border-white/30 rounded-md bg-black/40"
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
                      <div key={index} className="p-2 bg-white/10 rounded-md">
                        <Badge className="text-white border-white/20 bg-transparent hover:bg-transparent hover:text-white">{item.name}</Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Car Class Zone */}
                <div
                  className="p-4 border-2 border-dashed border-white/30 rounded-md bg-black/40"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const item = JSON.parse(e.dataTransfer.getData("text/plain"));
                    handleDrop(item, "car");
                  }}
                >
                  <h3 className="font-semibold mb-2 text-white">Car (Child Class)</h3>
                  <div className="space-y-2">
                    {carClass.map((item, index) => (
                      <div key={index} className="p-2 bg-white/10 rounded-md">
                        <Badge className="text-white border-white/20 bg-transparent hover:bg-transparent hover:text-white">{item.name}</Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Electric Vehicle Class Zone */}
                <div
                  className="p-4 border-2 border-dashed border-white/30 rounded-md bg-black/40"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const item = JSON.parse(e.dataTransfer.getData("text/plain"));
                    handleDrop(item, "electric");
                  }}
                >
                  <h3 className="font-semibold mb-2 text-white">ElectricVehicle (Child Class)</h3>
                  <div className="space-y-2">
                    {electricClass.map((item, index) => (
                      <div key={index} className="p-2 bg-white/10 rounded-md">
                        <Badge className="text-white border-white/20 bg-transparent hover:bg-transparent hover:text-white">{item.name}</Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hybrid Car Class Zone */}
                <div
                  className="p-4 border-2 border-dashed border-white/30 rounded-md bg-black/40"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const item = JSON.parse(e.dataTransfer.getData("text/plain"));
                    handleDrop(item, "hybrid");
                  }}
                >
                  <h3 className="font-semibold mb-2 text-white">HybridCar (Hybrid Class)</h3>
                  <div className="space-y-2">
                    {hybridClass.map((item, index) => (
                      <div key={index} className="p-2 bg-white/10 rounded-md">
                        <Badge className="text-white border-white/20 bg-transparent hover:bg-transparent hover:text-white">{item.name}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Submit and Reset Buttons */}
            <div className="flex justify-end gap-4">
              <Button
                                onClick={handleReset}
                disabled={!baseClass.length && !carClass.length && !electricClass.length && !hybridClass.length}
                className="border border-white/20 hover:bg-white/10 bg-transparent text-white"
              >
                Reset
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={submitted || (!baseClass.length && !carClass.length && !electricClass.length && !hybridClass.length)}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300"
              >
                Submit
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Points Dialog */}
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent className="bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950 border border-white/20">
            <div className="text-center py-4">
              <div className="text-center mt-4 text-primary font-bold animate-bounce text-2xl text-white">
                Awesome job! Total 10 points added!
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DndProvider>
  );
} 

export default HybridInheritanceGame;