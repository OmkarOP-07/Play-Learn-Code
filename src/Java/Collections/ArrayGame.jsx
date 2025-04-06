"use client";

import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Code, Trophy, ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../components/ui/dialog";
import confetti from "canvas-confetti";
import { useNavigate } from "react-router-dom";

const availableItems = [
  // Array items
  { id: "array_declaration", name: "int[] numbers = new int[5];", type: "declaration", description: "Array declaration" },
  { id: "array_initialization", name: "int[] numbers = {1, 2, 3, 4, 5};", type: "initialization", description: "Array initialization" },
  { id: "array_access", name: "numbers[0] = 10;", type: "access", description: "Access array element" },
  { id: "array_length", name: "numbers.length", type: "property", description: "Get array length" },
  { id: "array_loop", name: "for(int i = 0; i < numbers.length; i++) { }", type: "loop", description: "Loop through array" },
  { id: "array_foreach", name: "for(int num : numbers) { }", type: "foreach", description: "Enhanced for loop" },
  { id: "array_copy", name: "System.arraycopy(source, 0, dest, 0, length);", type: "method", description: "Copy array elements" },
  { id: "array_sort", name: "Arrays.sort(numbers);", type: "method", description: "Sort array elements" },
  { id: "array_search", name: "Arrays.binarySearch(numbers, key);", type: "method", description: "Search in sorted array" },
  
  // List items
  { id: "list_declaration", name: "List<Integer> numbers = new ArrayList<>();", type: "declaration", description: "List declaration" },
  { id: "list_add", name: "numbers.add(10);", type: "method", description: "Add element to list" },
  { id: "list_get", name: "numbers.get(0);", type: "method", description: "Get element from list" },
  { id: "list_size", name: "numbers.size();", type: "method", description: "Get list size" },
  { id: "list_remove", name: "numbers.remove(0);", type: "method", description: "Remove element from list" },
  { id: "list_contains", name: "numbers.contains(10);", type: "method", description: "Check if list contains element" },
  { id: "list_clear", name: "numbers.clear();", type: "method", description: "Clear all elements from list" },
  { id: "list_iterator", name: "Iterator<Integer> it = numbers.iterator();", type: "method", description: "Get list iterator" },
  { id: "list_sort", name: "Collections.sort(numbers);", type: "method", description: "Sort list elements" }
];

const correctArrayCode = ["array_declaration", "array_initialization", "array_access", "array_length", "array_loop"];
const correctListCode = ["list_declaration", "list_add", "list_get", "list_size", "list_remove"];

export function ArrayGame() {
  const navigate = useNavigate();
  const [arrayCode, setArrayCode] = useState([]);
  const [listCode, setListCode] = useState([]);
  const [shuffledItems, setShuffledItems] = useState([...availableItems].sort(() => Math.random() - 0.5));
  const [showDialog, setShowDialog] = useState(false);
  const [points, setPoints] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [showNextDialog, setShowNextDialog] = useState(false);

  const handleDrop = (item, type) => {
    if (submitted) return;
    if (type === "array") {
      setArrayCode(prev => [...prev, item]);
    } else if (type === "list") {
      setListCode(prev => [...prev, item]);
    }
  };

  const calculatePoints = () => {
    let totalPoints = 0;
    
    const arrayCorrectParts = arrayCode.filter((item, index) => 
      item.id === correctArrayCode[index]).length;
    totalPoints += Math.floor((arrayCorrectParts / correctArrayCode.length) * 50);

    const listCorrectParts = listCode.filter((item, index) => 
      item.id === correctListCode[index]).length;
    totalPoints += Math.floor((listCorrectParts / correctListCode.length) * 50);

    if (arrayCorrectParts === correctArrayCode.length && 
        listCorrectParts === correctListCode.length) {
      totalPoints += 25;
    }

    return totalPoints;
  };

  const handleSubmit = () => {
    const earnedPoints = calculatePoints();
    setPoints(earnedPoints);
    setShowDialog(true);
    setSubmitted(true);

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const handleReset = () => {
    setArrayCode([]);
    setListCode([]);
    setSubmitted(false);
    setShowDialog(false);
    setPoints(0);
  };

  const handleNext = () => {
    setShowNextDialog(true);
  };

  const handleConfirmNext = () => {
    setShowNextDialog(false);
    navigate("/Java/Collections/HashMapGame");
  };

  return (
    <DndProvider backend={HTML5Backend}>
           <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950 text-white overflow-hidden relative">
           <div className="w-full max-w-5xl mx-auto p-6 pt-20 ">
        {/* Example Card */}
        <Card className="mb-6 bg-white/10 backdrop-blur-sm border border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Code className="h-5 w-5" />
              Arrays & Lists in Java
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-black/40 p-4 rounded-md font-mono text-sm">
              <div className="text-white/90">
                <p>// Array Example</p>
                <p>int[] numbers = new int[5];</p>
                <p>numbers[0] = 10;</p>
                <p>{`for(int i = 0; i < numbers.length; i++) {`}</p>
                <p className="ml-4">System.out.println(numbers[i]);</p>
                <p>{`}`}</p>
                <p></p>
                <p>// List Example</p>
                <p>List&lt;Integer&gt; numbers = new ArrayList&lt;&gt;();</p>
                <p>numbers.add(10);</p>
                <p>{`for(int num : numbers) {`}</p>
                <p className="ml-4">System.out.println(num);</p>
                <p>{`}`}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Game Card */}
        <Card className="bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg">
          <CardHeader>
            <CardTitle className="text-white">Build the Array and List Structure</CardTitle>
            <p className="text-sm text-white/90">
              Drag and drop elements to create proper Array and List implementations. Order matters!
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
                      className="p-2 bg-black/40 rounded-md cursor-move hover:bg-white/10 transition-colors"
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData("text/plain", JSON.stringify(item));
                      }}
                    >
                      <Badge variant="outline" className="text-white border-white/20">{item.name}</Badge>
                      <p className="text-xs text-white/60 mt-1">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Drop Zones */}
              <div className="col-span-2 grid grid-cols-1 gap-4">
                {/* Array Zone */}
                <div
                  className="p-4 border-2 border-dashed border-white/30 rounded-md bg-black/40"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const item = JSON.parse(e.dataTransfer.getData("text/plain"));
                    handleDrop(item, "array");
                  }}
                >
                  <h3 className="font-semibold mb-2 text-white">Array Implementation</h3>
                  <div className="space-y-2">
                    {arrayCode.map((item, index) => (
                      <div key={index} className="p-2 bg-white/10 rounded-md">
                        <Badge variant="outline" className="text-white border-white/20">{item.name}</Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* List Zone */}
                <div
                  className="p-4 border-2 border-dashed border-white/30 rounded-md bg-black/40"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const item = JSON.parse(e.dataTransfer.getData("text/plain"));
                    handleDrop(item, "list");
                  }}
                >
                  <h3 className="font-semibold mb-2 text-white">List Implementation</h3>
                  <div className="space-y-2">
                    {listCode.map((item, index) => (
                      <div key={index} className="p-2 bg-white/10 rounded-md">
                        <Badge variant="outline" className="text-white border-white/20">{item.name}</Badge>
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
                disabled={!arrayCode.length && !listCode.length}
                className="border border-white/20 hover:bg-white/10 bg-transparent text-white"
              >
                Reset
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={submitted || (!arrayCode.length && !listCode.length)}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300"
              >
                Submit
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Next Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-white mb-4">Next Topic</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
              <CardHeader>
                <CardTitle className="text-white">HashMaps</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 mb-4">
                  Learn about HashMaps in Java and how to use them effectively for key-value pair storage.
                </p>
                <Button
                  onClick={handleNext}
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300"
                >
                  Continue to HashMaps <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Points Dialog */}
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent className="bg-[#1a1a1a]/95 backdrop-blur-sm border border-white/20">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-primary text-center">
                Game Results
              </DialogTitle>
              <DialogDescription className="text-center text-white/80">
                Here's how you did in the Arrays & Lists challenge!
              </DialogDescription>
            </DialogHeader>
            <div className="text-center py-4">
              <div className="text-center mt-4 text-primary font-bold animate-bounce text-xl">
                Awesome job! +{points} points!
              </div>
              <p className="text-white/80 mt-2">
                {points >= 100 ? "Perfect! You've mastered Arrays & Lists in Java!" :
                 points >= 75 ? "Great work! Keep practicing to improve!" :
                 "Good effort! Try again to improve your score!"}
              </p>
              <Button
                onClick={handleNext}
                className="mt-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300"
              >
                Next Topic <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Next Topic Confirmation Dialog */}
        <Dialog open={showNextDialog} onOpenChange={setShowNextDialog}>
          <DialogContent className="bg-[#1a1a1a]/95 backdrop-blur-sm border border-white/20">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-primary text-center">
                Ready for the Next Challenge?
              </DialogTitle>
              <DialogDescription className="text-center text-white/80">
                You've completed the Arrays & Lists challenge! Would you like to move on to HashMaps?
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-center gap-4 mt-4">
              <Button
                variant="outline"
                onClick={() => setShowNextDialog(false)}
                className="border border-white/20 hover:bg-white/10 bg-transparent text-white"
              >
                Stay Here
              </Button>
              <Button
                onClick={handleConfirmNext}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300"
              >
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
           </div>
    
    </DndProvider>
  );
} 
export default ArrayGame;