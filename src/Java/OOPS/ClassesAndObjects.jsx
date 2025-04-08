"use client";

import { useState, useEffect } from "react";
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
// Available items for drag and drop
const availableItems = [
  { id: "class", name: "class Student", type: "keyword", description: "Class declaration" },
  { id: "name", name: "private String name;", type: "attribute", description: "Student name attribute" },
  { id: "age", name: "private int age;", type: "attribute", description: "Student age attribute" },
  { id: "grade", name: "private char grade;", type: "attribute", description: "Student grade attribute" },
  { id: "constructor", name: "public Student(String n, int a) { this.name = n; this.age = a; }", type: "constructor", description: "Constructor" },
  { id: "setGrade", name: "public void setGrade(char g) { this.grade = g; }", type: "method", description: "Set grade method" },
  { id: "getName", name: "public String getName() { return name; }", type: "method", description: "Get name method" },
  { id: "getAge", name: "public int getAge() { return age; }", type: "method", description: "Get age method" },
  { id: "getGrade", name: "public char getGrade() { return grade; }", type: "method", description: "Get grade method" },
  { id: "study", name: "public void study() { System.out.println(name + \" is studying\"); }", type: "method", description: "Study method" }
];

// Correct order for the class
const correctOrder = ["class", "name", "age", "grade", "constructor", "setGrade", "getName", "getAge", "getGrade", "study"];

export function ClassesAndObjects() {
  const [classParts, setClassParts] = useState([]);
  const [shuffledItems, setShuffledItems] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showRoute, setShowRoute] = useState(false);
  const navigate = useNavigate();
  const { points, addPoints, isLoading } = useJavaPoints();  
  useEffect(() => {
    // Shuffle available items
    const shuffled = [...availableItems].sort(() => Math.random() - 0.5);
    setShuffledItems(shuffled);
  }, []);

  const handleDrop = (item) => {
    if (submitted) return;
    setClassParts(prev => [...prev, item]);
  };

  const calculatePoints = () => {
    let totalPoints = 0;
    
    // Check if all parts are in the correct order
    const correctParts = classParts.filter((item, index) => 
      item.id === correctOrder[index]).length;
    
    // Award points based on correct parts
    totalPoints = Math.floor((correctParts / correctOrder.length) * 100);
    
    // Bonus points for complete correctness
    if (correctParts === correctOrder.length) {
      totalPoints += 25;
    }
    
    return totalPoints;
  };

  const handleSubmit = () => {
    const earnedPoints = calculatePoints();
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
    setClassParts([]);
    setSubmitted(false);
    setShowDialog(false);
  };

  const handleNextClick = () => {
    addPoints(10);
    navigate('/Java/OOPS/Constructors');
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950 overflow-hidden relative pt-16 text-black">
      <div className="w-full max-w-5xl mx-auto p-6 pt-16 ">
        {/* Example Card */}
        <Card className="mb-6 border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Code className="h-5 w-5" />
              Example Code
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-black bg-opacity-30 p-4 rounded-md font-mono text-sm">
              <div className="text-white">
                <p>class Student {'{'}</p>
                <p className="ml-4">private String name;</p>
                <p className="ml-4">private int age;</p>
                <p className="ml-4">private char grade;</p>
                <p className="ml-4"></p>
                <p className="ml-4">public Student(String n, int a) {'{'}</p>
                <p className="ml-8">this.name = n;</p>
                <p className="ml-8">this.age = a;</p>
                <p className="ml-4">{'}'}</p>
                <p className="ml-4"></p>
                <p className="ml-4">public void setGrade(char g) {'{'}</p>
                <p className="ml-8">this.grade = g;</p>
                <p className="ml-4">{'}'}</p>
                <p className="ml-4"></p>
                <p className="ml-4">public String getName() {'{'}</p>
                <p className="ml-8">return name;</p>
                <p className="ml-4">{'}'}</p>
                <p>{'}'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Game Card */}
        <Card className="border-2 border-primary shadow-md">
          <CardHeader>
            <CardTitle className="text-white">Build the Student Class</CardTitle>
            <p className="text-sm text-white">
              Drag and drop elements to form the correct class structure.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-3 gap-6">
              {/* Available Items (Shuffled) */}
              <div className="space-y-4">
                <h3 className="font-semibold text-sm text-white">Available Elements</h3>
                <div className="space-y-2">
                  {shuffledItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-2 bg-black bg-opacity-30 rounded-md cursor-move hover:bg-black/50"
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData("text/plain", JSON.stringify(item));
                      }}
                    >
                      <Badge  className="text-white bg-transparent border-white hover:bg-transparent hover:text-white">{item.name}</Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Drop Zone */}
              <div
                className="col-span-2 p-4 border-2 border-dashed border-gray-300 rounded-md"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const item = JSON.parse(e.dataTransfer.getData("text/plain"));
                  handleDrop(item);
                }}
              >
                <h3 className="font-semibold mb-2 text-white">Student Class</h3>
                <div className="space-y-2">
                  {classParts.map((item, index) => (
                    <div key={index} className="p-2 bg-black bg-opacity-30 rounded-md">
                      <Badge  className="text-white bg-transparent border-white hover:bg-transparent hover:border-white hover:text-white">{item.name}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit and Reset Buttons */}
            <div className="flex justify-end gap-4">
              <Button 
                variant="outline" 
                onClick={handleReset} 
                disabled={!classParts.length}
                className="border-2 border-primary/20 hover:bg-white text-white"
              >
                Reset
              </Button>
              <Button 
                onClick={handleSubmit} 
                disabled={submitted || !classParts.length}
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
                <h3 className="text-xl font-bold text-white">Next Topic: Constructors</h3>
                <p className="text-white">Learn about constructors in Java</p>
              </div>
              <div className="flex items-center gap-2">
                {showRoute && (
                    <span className="text-sm text-white">/Java/OOPS/Constructors</span>
                )}
                <ArrowRight className="h-5 w-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Points Dialog */}
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent className="bg-black bg-opacity-30 text-white backdrop-blur-sm border border-white">
            <div className="text-center py-4">
              <div className="text-center mt-4 text-primary font-bold animate-bounce text-2xl text-white">
                Awesome job! +10 points!
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      </div>
     
    </DndProvider>
  );
} 

export default ClassesAndObjects;