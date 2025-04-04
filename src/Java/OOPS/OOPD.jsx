"use client";

import { useState } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Play } from "lucide-react";

const ItemType = {
  ATTRIBUTE: "attribute",
};

// Draggable Attribute Component
const Attribute = ({ name, value }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType.ATTRIBUTE,
    item: { name, value },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`p-2 px-4 bg-blue-500 text-white rounded-md cursor-pointer ${isDragging ? "opacity-50" : ""}`}
    >
      {name}: {value}
    </div>
  );
};

// Drop Zone Component
const DropZone = ({ onDrop, assignedValues }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemType.ATTRIBUTE,
    drop: (item) => onDrop(item.name, item.value),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div ref={drop} className={`p-4 min-h-[100px] border-2 border-dashed ${isOver ? "bg-green-100" : "bg-gray-100"}`}>
      {assignedValues.length > 0 ? (
        assignedValues.map(({ name, value }, index) => (
          <Badge key={index} className="m-1 bg-green-500 text-white">{`${name} = ${value};`}</Badge>
        ))
      ) : (
        <p className="text-gray-500">Drop values here...</p>
      )}
    </div>
  );
};

export default function OOPGame() {
  const [assignedValues, setAssignedValues] = useState([]);
  const [objectName, setObjectName] = useState("");
  const [showSyntax, setShowSyntax] = useState(false);

  const handleDrop = (name, value) => {
    if (!assignedValues.some((attr) => attr.name === name)) {
      setAssignedValues([...assignedValues, { name, value }]);
    }
  };

  const createObject = () => {
    if (objectName.trim()) {
      setShowSyntax(true);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-full max-w-4xl mx-auto p-6 pt-24">
        <Card className="border-2 border-primary shadow-md">
          <CardHeader>
            <CardTitle>OOP in Java: Instantiating Objects & Assigning Values</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Java Syntax */}
            <div className="bg-gray-800 text-green-400 p-4 rounded-md font-mono text-sm">
              <div>class Car {"{"}</div>
              <div className="ml-4 text-yellow-300">// Instance Variables</div>
              <div className="ml-4">String color;</div>
              <div className="ml-4">int speed;</div>
              <div className="ml-4">String model;</div>
              <div className="ml-4 text-yellow-300">// Constructor</div>
              <div className="ml-4">Car() {"{"}</div>
              <div className="ml-8">System.out.println("Car Created!");</div>
              <div className="ml-4">{"}"}</div>
              <div>{"}"}</div>
            </div>

            {/* Drag & Drop Section */}
            <div className="flex gap-6">
              {/* Attributes */}
              <div className="flex flex-col gap-3">
                <h3 className="font-semibold">Drag these values:</h3>
                <Attribute name="color" value='"Red"' />
                <Attribute name="speed" value="120" />
                <Attribute name="model" value='"Tesla Model S"' />
              </div>

              {/* Drop Zone */}
              <DropZone onDrop={handleDrop} assignedValues={assignedValues} />
            </div>

            {/* Object Creation */}
            <div>
              <h3 className="font-semibold mb-2">Instantiate an Object:</h3>
              <div className="flex gap-2">
                <Input
                  value={objectName}
                  onChange={(e) => setObjectName(e.target.value)}
                  placeholder="Enter object name (e.g., myCar)"
                  className="w-40"
                />
                <Button onClick={createObject} className="flex items-center gap-2">
                  <Play className="h-4 w-4" />
                  Generate Code
                </Button>
              </div>

              {showSyntax && (
                <div className="mt-4 p-3 bg-gray-800 text-green-400 rounded-md font-mono text-sm">
                  <p className="text-yellow-300">// Object Instantiation</p>
                  <p>Car {objectName} = new Car();</p>
                  {assignedValues.length > 0 && (
                    <>
                      <p className="text-yellow-300 mt-2">// Assigning Values</p>
                      {assignedValues.map(({ name, value }) => (
                        <p key={name}>
                          {objectName}.{name} = {value};
                        </p>
                      ))}
                    </>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DndProvider>
  );
} 