"use client";

import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Hash, Trophy, ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../components/ui/dialog";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDatabase } from '@fortawesome/free-solid-svg-icons';

const availableItems = [
  // HashMap items
  { id: "hashmap_declaration", name: "HashMap<String, Integer> map = new HashMap<>();", type: "declaration", description: "HashMap declaration" },
  { id: "hashmap_put", name: "map.put(\"key\", 10);", type: "method", description: "Add key-value pair" },
  { id: "hashmap_get", name: "map.get(\"key\");", type: "method", description: "Get value by key" },
  { id: "hashmap_containsKey", name: "map.containsKey(\"key\");", type: "method", description: "Check if key exists" },
  { id: "hashmap_containsValue", name: "map.containsValue(10);", type: "method", description: "Check if value exists" },
  { id: "hashmap_remove", name: "map.remove(\"key\");", type: "method", description: "Remove key-value pair" },
  { id: "hashmap_size", name: "map.size();", type: "method", description: "Get number of entries" },
  { id: "hashmap_clear", name: "map.clear();", type: "method", description: "Clear all entries" },
  { id: "hashmap_keyset", name: "Set<String> keys = map.keySet();", type: "method", description: "Get all keys" },
  { id: "hashmap_values", name: "Collection<Integer> values = map.values();", type: "method", description: "Get all values" },
  { id: "hashmap_entryset", name: "Set<Map.Entry<String, Integer>> entries = map.entrySet();", type: "method", description: "Get all entries" },
  { id: "hashmap_isempty", name: "map.isEmpty();", type: "method", description: "Check if map is empty" }
];

const correctHashMapCode = ["hashmap_declaration", "hashmap_put", "hashmap_get", "hashmap_containsKey", "hashmap_remove"];

const HashMapIcon = () => {
  return (
    <div>
      <FontAwesomeIcon icon={faDatabase} size="1x" />
    </div>
  );
};

export function HashMapGame() {
  const navigate = useNavigate();
  const [hashmapCode, setHashmapCode] = useState([]);
  const [shuffledItems, setShuffledItems] = useState([...availableItems].sort(() => Math.random() - 0.5));
  const [showDialog, setShowDialog] = useState(false);
  const [points, setPoints] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);
  const [showNextDialog, setShowNextDialog] = useState(false);

  const handleDragStart = (e, item) => {
    setDraggedItem(item);
    e.dataTransfer.setData('text/plain', JSON.stringify(item));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (submitted) return;
    
    const item = JSON.parse(e.dataTransfer.getData('text/plain'));
    setHashmapCode(prev => [...prev, item]);
    setDraggedItem(null);
  };

  const calculatePoints = () => {
    let totalPoints = 0;
    
    const correctParts = hashmapCode.filter((item, index) => 
      item.id === correctHashMapCode[index]).length;
    
    totalPoints = Math.floor((correctParts / correctHashMapCode.length) * 100);
    
    if (correctParts === correctHashMapCode.length) {
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
    setHashmapCode([]);
    setSubmitted(false);
    setShowDialog(false);
    setPoints(0);
  };

  const handleNext = () => {
    setShowNextDialog(true);
  };

  const handleConfirmNext = () => {
    setShowNextDialog(false);
    navigate("/Java/Collections/array-game");
  };

  return (
    <DndProvider backend={HTML5Backend}>
           <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950 text-white overflow-hidden relative">
           <div className="w-full max-w-5xl mx-auto p-6 pt-20 ">
        {/* Example Card */}
        <Card className="mb-6 bg-white/10 backdrop-blur-sm border border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <HashMapIcon />
              HashMaps in Java
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-black/40 p-4 rounded-md font-mono text-sm">
              <div className="text-white/90">
                <p>// HashMap Example</p>
                <p>HashMap&lt;String, Integer&gt; map = new HashMap&lt;&gt;();</p>
                <p>map.put(\"apple\", 1);</p>
                <p>map.put(\"banana\", 2);</p>
                <p>int value = map.get(\"apple\"); // Returns 1</p>
                <p>{`for(Map.Entry<String, Integer> entry : map.entrySet()) {`}</p>
                <p className="ml-4">System.out.println(entry.getKey() + \": \" + entry.getValue());</p>
                <p>{`}`}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Game Card */}
        <Card className="bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg">
          <CardHeader>
            <CardTitle className="text-white">Build the HashMap Structure</CardTitle>
            <p className="text-sm text-white/90">
              Drag and drop elements to create a proper HashMap implementation. Order matters!
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
                      onDragStart={(e) => handleDragStart(e, item)}
                    >
                      <Badge variant="outline" className="text-white border-white/20">{item.name}</Badge>
                      <p className="text-xs text-white/60 mt-1">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Drop Zone */}
              <div className="col-span-2">
                <div
                  className="p-4 border-2 border-dashed border-white/30 rounded-md bg-black/40 min-h-[400px]"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <h3 className="font-semibold mb-2 text-white">HashMap Implementation</h3>
                  <div className="space-y-2">
                    {hashmapCode.map((item, index) => (
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
                disabled={!hashmapCode.length}
                className="border border-white/20 hover:bg-white/10 bg-transparent text-white"
              >
                Reset
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={submitted || !hashmapCode.length}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300"
              >
                Submit
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Points Dialog */}
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent className="bg-[#1a1a1a]/95 backdrop-blur-sm border border-white/20">
            <DialogHeader>
              <DialogTitle className="sr-only">Game Results</DialogTitle>
              <DialogDescription className="sr-only">Your score in the HashMaps challenge</DialogDescription>
            </DialogHeader>
            <div className="text-center py-8">
              <div className="flex flex-col items-center justify-center">
                <Trophy className="h-12 w-12 text-yellow-500 mb-2 animate-bounce" />
                <div className="text-4xl font-bold text-primary mb-4">Hurray! 🎉</div>
                <div className="text-3xl text-primary font-bold">
                  +{points} points!
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
           </div>
     
    </DndProvider>
  );
} 

export default HashMapGame;
