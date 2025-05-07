"use client";
jjj
import { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Sparkles, Play, ChevronRight } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useJavaPoints } from "../JavaPointsContext";
const arrayTypes = [
  { type: "int", syntax: "int arr[] = {1, 2, 3, 4};", values: [1, 2, 3, 4] },
  { type: "char", syntax: "char arr[] = {'A', 'B', 'C'};", values: ["A", "B", "C"] },
  { type: "bool", syntax: "bool arr[] = {true, false, true};", values: [true, false, true] },
];

export default function ArrayGamePage() {
  const [droppedArray, setDroppedArray] = useState(null);
  const [level, setLevel] = useState(1);
  const { points, addPoints } = useJavaPoints();
  // Draggable component
  const ArrayDragItem = ({ type, syntax }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: "ARRAY",
      item: { type, syntax },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }));

    return (
      <div
        ref={drag}
        className={`w-40 h-20 bg-gray-200 border border-black rounded-lg p-4 flex flex-col items-center justify-center cursor-grab ${
          isDragging ? "opacity-50" : "opacity-100"
        }`}
      >
        <span className="text-lg font-semibold">{type.toUpperCase()} Array</span>
      </div>
    );
  };

  // Drop area
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "ARRAY",
    drop: (item) => {
      setDroppedArray(arrayTypes.find((arr) => arr.type === item.type));
      addPoints(10); // Award points on successful drop
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div className="w-full max-w-4xl mx-auto p-4 pt-24">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Play className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Array Learning Game</h1>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="text-yellow-500 border-yellow-500 flex items-center gap-1">
            <Sparkles className="h-4 w-4" />
            <span>{points} Points</span>
          </Badge>
        </div>
      </div>

      {/* Card for Instructions */}
      <Card className="border-4 border-primary shadow-lg">
        <CardHeader className="bg-primary/10">
          <CardTitle className="text-xl">Mission: Learn How Arrays Are Stored</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {/* Draggable Items */}
          <div className="flex gap-6 mb-10">
            {arrayTypes.map((array) => (
              <ArrayDragItem key={array.type} type={array.type} syntax={array.syntax} />
            ))}
          </div>

          {/* Drop Zone */}
          <div
            ref={drop}
            className={`w-full h-40 border-2 border-dashed border-black flex items-center justify-center bg-gray-100 rounded-lg relative ${
              isOver ? "bg-gray-200" : ""
            }`}
          >
            {droppedArray ? (
              <div className="text-center">
                <p className="text-lg font-bold">{droppedArray.syntax}</p>
                <div className="flex mt-4 space-x-2">
                  {droppedArray.values.map((el, index) => (
                    <div key={index} className="w-12 h-12 border border-black flex items-center justify-center">
                      <span className="text-lg">{el.toString()}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  Indexing: {droppedArray.values.map((_, i) => `[${i}]`).join(" ")}
                </p>
              </div>
            ) : (
              <p className="text-gray-500">Drop an array here</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Footer Buttons */}
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={() => setDroppedArray(null)}>
          Reset Game
        </Button>

        {droppedArray && (
          <Button onClick={() => setLevel(level + 1)} className="flex items-center gap-2">
            Next Challenge <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
} 