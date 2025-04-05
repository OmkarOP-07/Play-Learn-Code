"use client"

import { useState, useEffect } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { Check, X, ArrowRight, Award, HelpCircle, RefreshCw, Code, BookOpen } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { TabsComponents } from "../../components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog"
import { Progress } from "../../components/ui/progress"
import { Badge } from "../../components/ui/badge"

// Game scenarios with inheritance and polymorphism challenges
const gameScenarios = [
  {
    id: 1,
    title: "Basic Inheritance",
    description: "Arrange these classes in the correct inheritance hierarchy.",
    difficulty: "easy",
    classes: [
      {
        id: "animal",
        name: "Animal",
        type: "parent",
        code: `public class Animal {
  protected String name;
  
  public Animal(String name) {
    this.name = name;
  }
  
  public void makeSound() {
    System.out.println("Some generic sound");
  }
}`,
        position: 0,
      },
      {
        id: "dog",
        name: "Dog",
        type: "child",
        code: `public class Dog extends Animal {
  public Dog(String name) {
    super(name);
  }
  
  @Override
  public void makeSound() {
    System.out.println(name + " says: Woof!");
  }
}`,
        position: 1,
      },
      {
        id: "cat",
        name: "Cat",
        type: "child",
        code: `public class Cat extends Animal {
  public Cat(String name) {
    super(name);
  }
  
  @Override
  public void makeSound() {
    System.out.println(name + " says: Meow!");
  }
}`,
        position: 1,
      },
    ],
    correctHierarchy: [
      { id: "animal", position: 0 },
      { id: "dog", position: 1 },
      { id: "cat", position: 1 },
    ],
    polymorphismQuestion: {
      question: "Which statement demonstrates polymorphism with these classes?",
      options: [
        'Dog dog = new Dog("Buddy"); dog.makeSound();',
        'Animal animal = new Dog("Buddy"); animal.makeSound();',
        'Cat cat = new Animal("Whiskers");',
        'Animal animal = new Animal("Generic");',
      ],
      correctAnswer: 'Animal animal = new Dog("Buddy"); animal.makeSound();',
      explanation:
        "This demonstrates polymorphism because we're using a parent class reference (Animal) to refer to a child class object (Dog). When makeSound() is called, the Dog's implementation is executed, not the Animal's.",
    },
  },
  {
    id: 2,
    title: "Interfaces and Implementation",
    description: "Arrange these classes and interfaces in the correct hierarchy.",
    difficulty: "medium",
    classes: [
      {
        id: "shape",
        name: "Shape (Interface)",
        type: "interface",
        code: `public interface Shape {
  double calculateArea();
  double calculatePerimeter();
}`,
        position: 0,
      },
      {
        id: "rectangle",
        name: "Rectangle",
        type: "implementation",
        code: `public class Rectangle implements Shape {
  private double width;
  private double height;
  
  public Rectangle(double width, double height) {
    this.width = width;
    this.height = height;
  }
  
  @Override
  public double calculateArea() {
    return width * height;
  }
  
  @Override
  public double calculatePerimeter() {
    return 2 * (width + height);
  }
}`,
        position: 1,
      },
      {
        id: "circle",
        name: "Circle",
        type: "implementation",
        code: `public class Circle implements Shape {
  private double radius;
  
  public Circle(double radius) {
    this.radius = radius;
  }
  
  @Override
  public double calculateArea() {
    return Math.PI * radius * radius;
  }
  
  @Override
  public double calculatePerimeter() {
    return 2 * Math.PI * radius;
  }
}`,
        position: 1,
      },
      {
        id: "square",
        name: "Square",
        type: "child",
        code: `public class Square extends Rectangle {
  public Square(double side) {
    super(side, side);
  }
}`,
        position: 2,
      },
    ],
    correctHierarchy: [
      { id: "shape", position: 0 },
      { id: "rectangle", position: 1 },
      { id: "circle", position: 1 },
      { id: "square", position: 2 },
    ],
    polymorphismQuestion: {
      question: "Which code demonstrates polymorphism with these classes?",
      options: [
        "Rectangle rect = new Square(5.0);",
        "Shape shape = new Circle(10.0); double area = shape.calculateArea();",
        "Circle circle = new Shape();",
        "Square square = new Rectangle(5.0, 5.0);",
      ],
      correctAnswer: "Shape shape = new Circle(10.0); double area = shape.calculateArea();",
      explanation:
        "This demonstrates polymorphism because we're using an interface reference (Shape) to refer to a concrete implementation (Circle). When calculateArea() is called, the Circle's implementation is executed.",
    },
  },
  {
    id: 3,
    title: "Abstract Classes and Method Overriding",
    description: "Arrange these classes in the correct inheritance hierarchy.",
    difficulty: "hard",
    classes: [
      {
        id: "vehicle",
        name: "Vehicle (Abstract)",
        type: "abstract",
        code: `public abstract class Vehicle {
  protected String make;
  protected String model;
  
  public Vehicle(String make, String model) {
    this.make = make;
    this.model = model;
  }
  
  public abstract void start();
  
  public void stop() {
    System.out.println("Vehicle stopped");
  }
}`,
        position: 0,
      },
      {
        id: "car",
        name: "Car",
        type: "concrete",
        code: `public class Car extends Vehicle {
  private int numDoors;
  
  public Car(String make, String model, int numDoors) {
    super(make, model);
    this.numDoors = numDoors;
  }
  
  @Override
  public void start() {
    System.out.println("Car engine started");
  }
  
  @Override
  public void stop() {
    System.out.println("Car engine stopped");
  }
}`,
        position: 1,
      },
      {
        id: "motorcycle",
        name: "Motorcycle",
        type: "concrete",
        code: `public class Motorcycle extends Vehicle {
  private boolean hasSidecar;
  
  public Motorcycle(String make, String model, boolean hasSidecar) {
    super(make, model);
    this.hasSidecar = hasSidecar;
  }
  
  @Override
  public void start() {
    System.out.println("Motorcycle engine started");
  }
}`,
        position: 1,
      },
      {
        id: "electriccar",
        name: "ElectricCar",
        type: "child",
        code: `public class ElectricCar extends Car {
  private int batteryCapacity;
  
  public ElectricCar(String make, String model, int numDoors, int batteryCapacity) {
    super(make, model, numDoors);
    this.batteryCapacity = batteryCapacity;
  }
  
  @Override
  public void start() {
    System.out.println("Electric car powered on");
  }
}`,
        position: 2,
      },
    ],
    correctHierarchy: [
      { id: "vehicle", position: 0 },
      { id: "car", position: 1 },
      { id: "motorcycle", position: 1 },
      { id: "electriccar", position: 2 },
    ],
    polymorphismQuestion: {
      question: "Which statement about this code is true regarding polymorphism?",
      options: [
        "You cannot create an instance of the Vehicle class because it's abstract.",
        "The Motorcycle class must override the stop() method from Vehicle.",
        "The ElectricCar class cannot override methods from Vehicle.",
        "Abstract classes cannot participate in polymorphism.",
      ],
      correctAnswer: "You cannot create an instance of the Vehicle class because it's abstract.",
      explanation:
        "Abstract classes cannot be instantiated directly. They define a template for subclasses. However, you can use an abstract class reference to refer to any of its concrete subclasses, which is a form of polymorphism.",
    },
  },
  {
    id: 4,
    title: "Multiple Interfaces",
    description: "Arrange these interfaces and classes in the correct hierarchy.",
    difficulty: "hard",
    classes: [
      {
        id: "playable",
        name: "Playable (Interface)",
        type: "interface",
        code: `public interface Playable {
  void play();
  void stop();
}`,
        position: 0,
      },
      {
        id: "recordable",
        name: "Recordable (Interface)",
        type: "interface",
        code: `public interface Recordable {
  void record();
  void stopRecording();
}`,
        position: 0,
      },
      {
        id: "audioPlayer",
        name: "AudioPlayer",
        type: "implementation",
        code: `public class AudioPlayer implements Playable {
  private String currentTrack;
  
  public AudioPlayer(String track) {
    this.currentTrack = track;
  }
  
  @Override
  public void play() {
    System.out.println("Playing audio: " + currentTrack);
  }
  
  @Override
  public void stop() {
    System.out.println("Stopped playing audio");
  }
}`,
        position: 1,
      },
      {
        id: "videoRecorder",
        name: "VideoRecorder",
        type: "implementation",
        code: `public class VideoRecorder implements Recordable {
  @Override
  public void record() {
    System.out.println("Recording video");
  }
  
  @Override
  public void stopRecording() {
    System.out.println("Stopped recording video");
  }
}`,
        position: 1,
      },
      {
        id: "mediaPlayer",
        name: "MediaPlayer",
        type: "multiImplementation",
        code: `public class MediaPlayer implements Playable, Recordable {
  private String media;
  
  public MediaPlayer(String media) {
    this.media = media;
  }
  
  @Override
  public void play() {
    System.out.println("Playing media: " + media);
  }
  
  @Override
  public void stop() {
    System.out.println("Stopped playing media");
  }
  
  @Override
  public void record() {
    System.out.println("Recording media");
  }
  
  @Override
  public void stopRecording() {
    System.out.println("Stopped recording media");
  }
}`,
        position: 1,
      },
    ],
    correctHierarchy: [
      { id: "playable", position: 0 },
      { id: "recordable", position: 0 },
      { id: "audioPlayer", position: 1 },
      { id: "videoRecorder", position: 1 },
      { id: "mediaPlayer", position: 1 },
    ],
    polymorphismQuestion: {
      question: "Which statement demonstrates polymorphism with multiple interfaces?",
      options: [
        'Playable player = new AudioPlayer("Song"); player.play();',
        'MediaPlayer player = new MediaPlayer("Movie"); player.record();',
        'Recordable recorder = new MediaPlayer("Show"); recorder.stopRecording();',
        "VideoRecorder recorder = new VideoRecorder(); recorder.record();",
      ],
      correctAnswer: 'Recordable recorder = new MediaPlayer("Show"); recorder.stopRecording();',
      explanation:
        "This demonstrates polymorphism with multiple interfaces. A MediaPlayer object is being referenced through the Recordable interface, showing that a class can implement multiple interfaces and be used polymorphically through any of them.",
    },
  },
]

// Helper function to get class type badge color
const getClassTypeColor = (type) => {
  switch (type) {
    case "parent":
      return "bg-blue-500"
    case "child":
      return "bg-green-500"
    case "interface":
      return "bg-purple-500"
    case "implementation":
      return "bg-indigo-500"
    case "abstract":
      return "bg-amber-500"
    case "concrete":
      return "bg-teal-500"
    case "multiImplementation":
      return "bg-pink-500"
    default:
      return "bg-gray-500"
  }
}

// Helper function to get class type label
const getClassTypeLabel = (type) => {
  switch (type) {
    case "parent":
      return "Parent Class"
    case "child":
      return "Child Class"
    case "interface":
      return "Interface"
    case "implementation":
      return "Implementation"
    case "abstract":
      return "Abstract Class"
    case "concrete":
      return "Concrete Class"
    case "multiImplementation":
      return "Multiple Implementation"
    default:
      return "Class"
  }
}

export default function ClassBuilderGame() {
  const [currentScenario, setCurrentScenario] = useState(gameScenarios[0])
  const [classes, setClasses] = useState([])
  const [hierarchyCorrect, setHierarchyCorrect] = useState(null)
  const [selectedPolymorphismAnswer, setSelectedPolymorphismAnswer] = useState("")
  const [polymorphismCorrect, setPolymorphismCorrect] = useState(null)
  const [showPolymorphismQuestion, setShowPolymorphismQuestion] = useState(false)
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [progress, setProgress] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)
  const [activeTab, setActiveTab] = useState("hierarchy")

  // Initialize or reset the current scenario
  useEffect(() => {
    if (currentScenario) {
      // Shuffle the classes for the hierarchy challenge
      const shuffledClasses = [...currentScenario.classes].sort(() => Math.random() - 0.5)
      setClasses(shuffledClasses)
      setHierarchyCorrect(null)
      setSelectedPolymorphismAnswer("")
      setPolymorphismCorrect(null)
      setShowPolymorphismQuestion(false)
      setActiveTab("hierarchy")
    }
  }, [currentScenario])

  // Handle drag and drop for class hierarchy
  const handleDragEnd = (result) => {
    console.log(result); // Check if this logs when you drag an item
    if (!result.destination) return

    const items = Array.from(classes)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setClasses(items)
  }

  // Check if the hierarchy is correct
  const checkHierarchy = () => {
    // Create a map of class IDs to their current positions in the list
    const currentPositions = {}
    classes.forEach((cls, index) => {
      currentPositions[cls.id] = index
    })

    // Check if the relative positions match the correct hierarchy
    // This is a simplified check - in a real game you'd want more sophisticated validation
    let isCorrect = true

    // Check that parent classes come before their children
    for (let i = 0; i < currentScenario.correctHierarchy.length; i++) {
      for (let j = 0; j < currentScenario.correctHierarchy.length; j++) {
        const classA = currentScenario.correctHierarchy[i]
        const classB = currentScenario.correctHierarchy[j]

        // If A should be at a higher level (smaller position) than B
        if (classA.position < classB.position) {
          // Then A should appear before B in our list
          if (currentPositions[classA.id] > currentPositions[classB.id]) {
            isCorrect = false
            break
          }
        }
      }
      if (!isCorrect) break
    }

    setHierarchyCorrect(isCorrect)

    if (isCorrect) {
      setScore(score + 10)
      setShowPolymorphismQuestion(true)
      setActiveTab("polymorphism")
    }
  }

  // Check polymorphism answer
  const checkPolymorphismAnswer = () => {
    const isCorrect = selectedPolymorphismAnswer === currentScenario.polymorphismQuestion.correctAnswer
    setPolymorphismCorrect(isCorrect)

    if (isCorrect) {
      setScore(score + 15)
      setProgress(progress + 33.33)

      if (progress >= 66.66) {
        setTimeout(() => {
          const nextLevel = level + 1
          if (nextLevel <= 3) {
            setLevel(nextLevel)
            setProgress(0)
            // Get scenarios for the next level
            const nextLevelScenarios = gameScenarios.filter(
              (scenario) =>
                (nextLevel === 1 && scenario.difficulty === "easy") ||
                (nextLevel === 2 && scenario.difficulty === "medium") ||
                (nextLevel === 3 && scenario.difficulty === "hard"),
            )
            if (nextLevelScenarios.length > 0) {
              setCurrentScenario(nextLevelScenarios[0])
            }
          } else {
            setGameComplete(true)
          }
        }, 1500)
      } else {
        // Move to next scenario in the same level
        setTimeout(() => {
          const currentLevelScenarios = gameScenarios.filter(
            (scenario) =>
              (level === 1 && scenario.difficulty === "easy") ||
              (level === 2 && scenario.difficulty === "medium") ||
              (level === 3 && scenario.difficulty === "hard"),
          )

          const currentIndex = currentLevelScenarios.findIndex((s) => s.id === currentScenario.id)
          if (currentIndex < currentLevelScenarios.length - 1) {
            setCurrentScenario(currentLevelScenarios[currentIndex + 1])
          } else {
            // If we've gone through all scenarios at this level, move to next level
            const nextLevel = level + 1
            if (nextLevel <= 3) {
              setLevel(nextLevel)
              setProgress(0)
              const nextLevelScenarios = gameScenarios.filter(
                (scenario) =>
                  (nextLevel === 1 && scenario.difficulty === "easy") ||
                  (nextLevel === 2 && scenario.difficulty === "medium") ||
                  (nextLevel === 3 && scenario.difficulty === "hard"),
              )
              if (nextLevelScenarios.length > 0) {
                setCurrentScenario(nextLevelScenarios[0])
              }
            } else {
              setGameComplete(true)
            }
          }
        }, 1500)
      }
    }
  }

  // Reset the game
  const resetGame = () => {
    setScore(0)
    setLevel(1)
    setProgress(0)
    setGameComplete(false)
    setCurrentScenario(gameScenarios[0])
    setClasses([...gameScenarios[0].classes].sort(() => Math.random() - 0.5))
    setHierarchyCorrect(null)
    setSelectedPolymorphismAnswer("")
    setPolymorphismCorrect(null)
    setShowPolymorphismQuestion(false)
    setActiveTab("hierarchy")
  }

  // Render game completion screen
  if (gameComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950 text-white overflow-hidden relative">
        <div className="flex justify-center items-center mt-20">
          <Card className="w-full max-w-3xl bg-slate-800 border-slate-700 text-white shadow-xl ">
            <CardHeader className="text-center bg-indigo-600 rounded-t-lg">
              <CardTitle className="text-3xl">Congratulations!</CardTitle>
              <CardDescription className="text-white text-lg">You've mastered inheritance and polymorphism</CardDescription>
            </CardHeader>
            <CardContent className="p-8 text-center">
              <div className="flex justify-center mb-8">
                <Award className="h-32 w-32 text-yellow-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Final Score: {score}</h3>
              <p className="text-slate-300 mb-8">
                You've successfully learned how to build class hierarchies and understand polymorphic behavior in Java!
                These concepts are fundamental to object-oriented programming.
              </p>
              <Button onClick={resetGame} size="lg" className="bg-indigo-600 hover:bg-indigo-700">
                <RefreshCw className="mr-2 h-5 w-5" /> Play Again
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950 text-white overflow-hidden relative">
      <div className="flex justify-center items-center mt-20">
        <Card className="w-full max-w-4xl bg-slate-800 border-slate-700 text-white shadow-xl">
          <CardHeader className="border-b border-slate-700">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>
                  Level {level}: {level === 1 ? "Basic" : level === 2 ? "Intermediate" : "Advanced"}
                </CardTitle>
                <CardDescription className="text-slate-300">
                  {currentScenario.title} - {currentScenario.description}
                </CardDescription>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-indigo-400">{score} pts</div>
                <div className="text-xs text-slate-400">SCORE</div>
              </div>
            </div>
            <Progress value={progress} className="h-2 bg-slate-700" />
          </CardHeader>

          <CardContent className="p-6">
            <TabsComponents.Root value={activeTab} onValueChange={setActiveTab} className="mb-6">
              <TabsComponents.List className="bg-slate-700">
                <TabsComponents.Trigger value="hierarchy" disabled={hierarchyCorrect === true && showPolymorphismQuestion}>
                  <Code className="h-4 w-4 mr-2" /> Class Hierarchy
                </TabsComponents.Trigger>
                <TabsComponents.Trigger value="polymorphism" disabled={!showPolymorphismQuestion}>
                  <BookOpen className="h-4 w-4 mr-2" /> Polymorphism
                </TabsComponents.Trigger>
              </TabsComponents.List>

              <TabsComponents.Content value="hierarchy" className="mt-4">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Arrange the classes in the correct hierarchy</h3>
                  <p className="text-slate-300 mb-4">
                    Drag and drop the classes to arrange them in the correct inheritance hierarchy. Parent classes should
                    come before their children.
                  </p>
                </div>

                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="classes">
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3">
                        {classes.map((cls, index) => (
                          <Draggable key={cls.id} draggableId={cls.id} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="p-4 bg-slate-700 rounded-lg border border-slate-600 cursor-move"
                              >
                                <div className="flex justify-between items-center mb-2">
                                  <h4 className="font-semibold">{cls.name}</h4>
                                  <Badge className={`${getClassTypeColor(cls.type)}`}>{getClassTypeLabel(cls.type)}</Badge>
                                </div>
                                <pre className="p-3 bg-slate-900 rounded text-xs overflow-x-auto">
                                  <code className="text-slate-300 font-mono">{cls.code}</code>
                                </pre>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>

                {hierarchyCorrect !== null && (
                  <div
                    className={`p-4 rounded-md mt-6 flex items-center ${
                      hierarchyCorrect ? "bg-green-900/50" : "bg-red-900/50"
                    }`}
                  >
                    {hierarchyCorrect ? (
                      <>
                        <Check className="h-5 w-5 text-green-400 mr-2" />
                        <span>Correct! You've arranged the classes in the right hierarchy.</span>
                      </>
                    ) : (
                      <>
                        <X className="h-5 w-5 text-red-400 mr-2" />
                        <span>Not quite right. Try again!</span>
                      </>
                    )}
                  </div>
                )}

                {hierarchyCorrect !== true && (
                  <div className="mt-6">
                    <Button onClick={checkHierarchy} className="bg-indigo-600 hover:bg-indigo-700">
                      Check Hierarchy
                    </Button>
                  </div>
                )}
              </TabsComponents.Content>

              <TabsComponents.Content value="polymorphism" className="mt-4">
                {showPolymorphismQuestion && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{currentScenario.polymorphismQuestion.question}</h3>
                      <div className="space-y-3 mt-4">
                        {currentScenario.polymorphismQuestion.options.map((option) => (
                          <div
                            key={option}
                            className={`p-4 rounded-md cursor-pointer border transition-colors ${
                              selectedPolymorphismAnswer === option
                                ? "bg-slate-700 border-indigo-500"
                                : "bg-slate-900 border-slate-700 hover:border-slate-500"
                            }`}
                            onClick={() => setSelectedPolymorphismAnswer(option)}
                          >
                            <code className="text-sm font-mono">{option}</code>
                          </div>
                        ))}
                      </div>
                    </div>

                    {polymorphismCorrect !== null && (
                      <div
                        className={`p-4 rounded-md flex flex-col ${
                          polymorphismCorrect ? "bg-green-900/50" : "bg-red-900/50"
                        }`}
                      >
                        <div className="flex items-center mb-2">
                          {polymorphismCorrect ? (
                            <>
                              <Check className="h-5 w-5 text-green-400 mr-2" />
                              <span className="font-semibold">Correct!</span>
                            </>
                          ) : (
                            <>
                              <X className="h-5 w-5 text-red-400 mr-2" />
                              <span className="font-semibold">Incorrect</span>
                            </>
                          )}
                        </div>
                        <p className="text-sm">{currentScenario.polymorphismQuestion.explanation}</p>
                      </div>
                    )}

                    {polymorphismCorrect !== true && (
                      <Button
                        onClick={checkPolymorphismAnswer}
                        disabled={!selectedPolymorphismAnswer}
                        className="bg-indigo-600 hover:bg-indigo-700"
                      >
                        Check Answer
                      </Button>
                    )}
                  </div>
                )}
              </TabsComponents.Content>
            </TabsComponents.Root>
          </CardContent>

          <CardFooter className="flex justify-between border-t border-slate-700 p-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="bg-transparent border-slate-600 text-slate-300 hover:bg-slate-700">
                  <HelpCircle className="h-4 w-4 mr-2" /> Hint
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-800 text-white border-slate-700">
                <DialogHeader>
                  <DialogTitle>OOP Concept Hint</DialogTitle>
                  <DialogDescription className="text-slate-300">
                    Here's a hint to help you understand the concept:
                  </DialogDescription>
                </DialogHeader>
                <div className="p-4 bg-slate-900 rounded-md">
                  {activeTab === "hierarchy" ? (
                    <>
                      <h4 className="font-semibold mb-2">Inheritance Hierarchy Tips:</h4>
                      <ul className="list-disc pl-5 space-y-2 text-slate-300">
                        <li>Parent classes should come before their children</li>
                        <li>Interfaces are at the top of the hierarchy</li>
                        <li>Abstract classes can have both abstract and concrete methods</li>
                        <li>A class can implement multiple interfaces but extend only one class</li>
                      </ul>
                    </>
                  ) : (
                    <>
                      <h4 className="font-semibold mb-2">Polymorphism Tips:</h4>
                      <ul className="list-disc pl-5 space-y-2 text-slate-300">
                        <li>Polymorphism allows a parent class reference to refer to a child class object</li>
                        <li>Method overriding is a key aspect of polymorphism</li>
                        <li>The actual method executed depends on the object's type, not the reference type</li>
                        <li>Interfaces enable polymorphic behavior across unrelated classes</li>
                      </ul>
                    </>
                  )}
                </div>
              </DialogContent>
            </Dialog>

            <div className="flex gap-2">
              {polymorphismCorrect === true && (
                <Button
                  onClick={() => {
                    const currentLevelScenarios = gameScenarios.filter(
                      (scenario) =>
                        (level === 1 && scenario.difficulty === "easy") ||
                        (level === 2 && scenario.difficulty === "medium") ||
                        (level === 3 && scenario.difficulty === "hard"),
                    )

                    const currentIndex = currentLevelScenarios.findIndex((s) => s.id === currentScenario.id)
                    if (currentIndex < currentLevelScenarios.length - 1) {
                      setCurrentScenario(currentLevelScenarios[currentIndex + 1])
                    } else {
                      // If we've gone through all scenarios at this level, move to next level
                      const nextLevel = level + 1
                      if (nextLevel <= 3) {
                        setLevel(nextLevel)
                        setProgress(0)
                        const nextLevelScenarios = gameScenarios.filter(
                          (scenario) =>
                            (nextLevel === 1 && scenario.difficulty === "easy") ||
                            (nextLevel === 2 && scenario.difficulty === "medium") ||
                            (nextLevel === 3 && scenario.difficulty === "hard"),
                        )
                        if (nextLevelScenarios.length > 0) {
                          setCurrentScenario(nextLevelScenarios[0])
                        }
                      } else {
                        setGameComplete(true)
                      }
                    }
                  }}
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  Next Challenge <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

