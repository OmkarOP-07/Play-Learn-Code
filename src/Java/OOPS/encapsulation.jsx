"use client"

import { useState, useEffect } from "react"
import { LockKeyhole, Unlock, Clock, Key, Lightbulb, BookOpen, RefreshCw, Award } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
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
import { TabsComponents } from "../../components/ui/tabs"
import { useJavaPoints } from "../JavaPointsContext";
// Game objects with encapsulation challenges
const roomObjects = [
  {
    id: "safe",
    name: "Wall Safe",
    description: "A secure safe with a digital keypad. It seems to require a specific code.",
    image: "🔒",
    unlocked: false,
    challenge: {
      description:
        "The safe has a private code that can only be accessed with the right methods. Complete the class to unlock it.",
      initialCode: `public class Safe {
  private int code = 1234;
  
  // Add a getter method for the code
  
  // Add a setter method that only accepts 
  // codes between 1000 and 9999
  
}`,
      solution: `public class Safe {
  private int code = 1234;
  
  public int getCode() {
    return code;
  }
  
  public void setCode(int newCode) {
    if (newCode >= 1000 && newCode <= 9999) {
      code = newCode;
    }
  }
}`,
      hint: "Remember that getter methods start with 'get' followed by the property name, and setter methods start with 'set'. The setter should validate the input before changing the private field.",
      clue: "The first digit of the final key is 7.",
    },
  },
  {
    id: "computer",
    name: "Locked Computer",
    description: "A computer with a password prompt on the screen.",
    image: "💻",
    unlocked: false,
    challenge: {
      description:
        "The computer has a User class with a private password. Implement proper encapsulation to access it.",
      initialCode: `public class User {
  private String username = "admin";
  private String password = "secret";
  
  // Add a getter for username
  
  // Add a getter for password that only returns
  // the first and last character with stars between
  // Example: "s****t" instead of "secret"
  
  // Add a setter for password that requires
  // the new password to be at least 6 characters
  
}`,
      solution: `public class User {
  private String username = "admin";
  private String password = "secret";
  
  public String getUsername() {
    return username;
  }
  
  public String getPassword() {
    if (password.length() <= 2) {
      return password;
    }
    char first = password.charAt(0);
    char last = password.charAt(password.length() - 1);
    String stars = "*".repeat(password.length() - 2);
    return first + stars + last;
  }
  
  public void setPassword(String newPassword) {
    if (newPassword != null && newPassword.length() >= 6) {
      password = newPassword;
    }
  }
}`,
      hint: "For the masked password getter, you need to return a new string that shows only the first and last characters. The setter should check if the new password meets the minimum length requirement.",
      clue: "The second digit of the final key is 3.",
    },
  },
  {
    id: "bookshelf",
    name: "Locked Bookshelf",
    description: "A bookshelf with a combination lock. One of the books seems important.",
    image: "📚",
    unlocked: false,
    challenge: {
      description:
        "The bookshelf contains a Book class with private properties. Implement the proper encapsulation methods.",
      initialCode: `public class Book {
  private String title;
  private String author;
  private int pageCount;
  
  // Constructor
  public Book(String title, String author, int pageCount) {
    // Initialize the private fields with validation
    // pageCount must be positive
  }
  
  // Add getters for all properties
  
  // Add a setter for pageCount that ensures
  // the value is always positive
  
}`,
      solution: `public class Book {
  private String title;
  private String author;
  private int pageCount;
  
  // Constructor
  public Book(String title, String author, int pageCount) {
    this.title = title;
    this.author = author;
    if (pageCount > 0) {
      this.pageCount = pageCount;
    } else {
      this.pageCount = 1;
    }
  }
  
  public String getTitle() {
    return title;
  }
  
  public String getAuthor() {
    return author;
  }
  
  public int getPageCount() {
    return pageCount;
  }
  
  public void setPageCount(int pageCount) {
    if (pageCount > 0) {
      this.pageCount = pageCount;
    }
  }
}`,
      hint: "Make sure your constructor validates the pageCount parameter. The getter methods should simply return the private fields, while the setter for pageCount should check if the new value is positive.",
      clue: "The third digit of the final key is 5.",
    },
  },
  {
    id: "lockbox",
    name: "Mysterious Lockbox",
    description: "A small box with a digital display showing temperature in Celsius.",
    image: "📦",
    unlocked: false,
    challenge: {
      description:
        "The lockbox has a Temperature class that stores temperature in Celsius but can display it in Fahrenheit. Implement the encapsulation methods.",
      initialCode: `public class Temperature {
  private double celsius;
  
  // Constructor
  public Temperature(double celsius) {
    this.celsius = celsius;
  }
  
  // Add a getter for celsius
  
  // Add a getter for fahrenheit that converts
  // from the stored celsius value
  // Formula: F = C * 9/5 + 32
  
  // Add a setter for celsius
  
  // Add a setter for fahrenheit that converts
  // to celsius before storing
  // Formula: C = (F - 32) * 5/9
  
}`,
      solution: `public class Temperature {
  private double celsius;
  
  // Constructor
  public Temperature(double celsius) {
    this.celsius = celsius;
  }
  
  public double getCelsius() {
    return celsius;
  }
  
  public double getFahrenheit() {
    return celsius * 9/5 + 32;
  }
  
  public void setCelsius(double celsius) {
    this.celsius = celsius;
  }
  
  public void setFahrenheit(double fahrenheit) {
    this.celsius = (fahrenheit - 32) * 5/9;
  }
}`,
      hint: "This is an example of encapsulation where the internal representation (Celsius) is hidden, but the class provides multiple ways to interact with the data (both Celsius and Fahrenheit).",
      clue: "The fourth digit of the final key is 9.",
    },
  },
]

export default function EncapsulationGame() {
  const [objects, setObjects] = useState(roomObjects)
  const [selectedObject, setSelectedObject] = useState(null)
  const [userCode, setUserCode] = useState("")
  const [codeResult, setCodeResult] = useState(null)
  const [timer, setTimer] = useState(600) // 10 minutes in seconds
  const [gameStarted, setGameStarted] = useState(false)
  const [gameComplete, setGameComplete] = useState(false)
  const [showClue, setShowClue] = useState(false)
  const [finalCode, setFinalCode] = useState("")
  const [finalCodeSubmitted, setFinalCodeSubmitted] = useState(false)
  const [finalCodeCorrect, setFinalCodeCorrect] = useState(null)
  const { points, addPoints } = useJavaPoints();
  // Start the timer when game starts
  useEffect(() => {
    let interval
    if (gameStarted && !gameComplete && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1)
      }, 1000)
    } else if (timer === 0) {
      // Time's up!
      clearInterval(interval)
    }

    return () => clearInterval(interval)
  }, [gameStarted, gameComplete, timer])

  // Check if all objects are unlocked
  useEffect(() => {
    if (gameStarted && objects.every((obj) => obj.unlocked)) {
      setGameComplete(true)
    }
  }, [objects, gameStarted])

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Select an object to interact with
  const selectObject = (object) => {
    setSelectedObject(object)
    setUserCode(object.challenge.initialCode)
    setCodeResult(null)
    setShowClue(false)
  }

  // Check if the user's code is correct
  const checkCode = () => {
    // This is a simplified check - in a real game, you'd want to actually parse and evaluate the code
    // For this demo, we'll just check if the key parts of the solution are present

    const object = objects.find((obj) => obj.id === selectedObject.id)
    const solution = object.challenge.solution

    // Check for key patterns in the solution
    let isCorrect = true

    // Check for getter methods
    if (solution.includes("getCode()") && !userCode.includes("getCode()")) isCorrect = false
    if (solution.includes("getUsername()") && !userCode.includes("getUsername()")) isCorrect = false
    if (solution.includes("getPassword()") && !userCode.includes("getPassword()")) isCorrect = false
    if (solution.includes("getTitle()") && !userCode.includes("getTitle()")) isCorrect = false
    if (solution.includes("getAuthor()") && !userCode.includes("getAuthor()")) isCorrect = false
    if (solution.includes("getPageCount()") && !userCode.includes("getPageCount()")) isCorrect = false
    if (solution.includes("getCelsius()") && !userCode.includes("getCelsius()")) isCorrect = false
    if (solution.includes("getFahrenheit()") && !userCode.includes("getFahrenheit()")) isCorrect = false

    // Check for setter methods
    if (solution.includes("setCode(") && !userCode.includes("setCode(")) isCorrect = false
    if (solution.includes("setPassword(") && !userCode.includes("setPassword(")) isCorrect = false
    if (solution.includes("setPageCount(") && !userCode.includes("setPageCount(")) isCorrect = false
    if (solution.includes("setCelsius(") && !userCode.includes("setCelsius(")) isCorrect = false
    if (solution.includes("setFahrenheit(") && !userCode.includes("setFahrenheit(")) isCorrect = false

    // Check for validation logic
    if (object.id === "safe" && !userCode.includes("newCode >= 1000 && newCode <= 9999")) isCorrect = false
    if (object.id === "computer" && !userCode.includes("newPassword.length() >= 6")) isCorrect = false
    if (object.id === "bookshelf" && !userCode.includes("pageCount > 0")) isCorrect = false
    if (object.id === "lockbox" && !userCode.includes("celsius * 9/5 + 32")) isCorrect = false

    setCodeResult(isCorrect)

    if (isCorrect) {
      // Update the object to be unlocked
      setObjects(objects.map((obj) => (obj.id === selectedObject.id ? { ...obj, unlocked: true } : obj)))

      // Show the clue
      setShowClue(true)
    }
  }

  // Reset the game
  const resetGame = () => {
    setObjects(roomObjects.map((obj) => ({ ...obj, unlocked: false })))
    setSelectedObject(null)
    setUserCode("")
    setCodeResult(null)
    setTimer(600)
    setGameStarted(true)
    setGameComplete(false)
    setShowClue(false)
    setFinalCode("")
    setFinalCodeSubmitted(false)
    setFinalCodeCorrect(null)
  }

  // Check the final escape code
  const checkFinalCode = () => {
    setFinalCodeSubmitted(true)
    setFinalCodeCorrect(finalCode === "7359")
  }
  const nextLevel = () => {
    addPoints(10);
    navigate("/java/collections/arraylist");
  }
  // Start screen
  if (!gameStarted) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950 pt-16">
        <div className="w-full max-w-3xl">
          <Card className="w-full bg-black bg-opacity-30 border-2 border-primary/20  text-white shadow-xl mt-16">
            <CardHeader className="text-center bg-purple-600 rounded-t-lg">
              <CardTitle className="text-3xl">Encapsulation Escape Room</CardTitle>
              <CardDescription className="text-white text-lg">
                Use proper getters and setters to unlock the objects and escape!
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 text-center">
              <div className="flex justify-center mb-8">
                <LockKeyhole className="h-32 w-32 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Mission Briefing</h3>
              <p className="text-slate-300 mb-8">
                You're trapped in a room where all objects are locked with encapsulation! To escape, you must implement
                proper getter and setter methods for each object. Each unlocked object will reveal a clue to the final
                escape code. You have 10 minutes to escape!
              </p>
              <Button onClick={() => setGameStarted(true)} size="lg" className="bg-purple-600 hover:bg-purple-700">
                Start Escape Challenge
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Victory screen
  if (gameComplete && finalCodeCorrect) {
    return (
     <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950 pt-16"  >
        <Card className="w-full max-w-3xl bg-black bg-opacity-30 border-2 border-primary/20  text-white shadow-xl">
        <CardHeader className="text-center bg-purple-600 rounded-t-lg">
          <CardTitle className="text-3xl">Congratulations!</CardTitle>
          <CardDescription className="text-white text-lg">You've escaped the Encapsulation Room!</CardDescription>
        </CardHeader>
        <CardContent className="p-8 text-center">
          <div className="flex justify-center mb-8">
            <Award className="h-32 w-32 text-yellow-400" />
          </div>
          <h3 className="text-2xl font-bold mb-4">Escape Successful!</h3>
          <p className="text-slate-300 mb-8">
            You've mastered the art of encapsulation and escaped with {formatTime(timer)} remaining! You now understand
            how to properly protect data with private fields and control access with getters and setters.
          </p>
          <Button onClick={nextLevel} size="lg" className="bg-purple-600 hover:bg-purple-700">
            <RefreshCw className="mr-2 h-5 w-5" /> Next Level
          </Button>
        </CardContent>
      </Card>
      </div>
    )
  }

  // Game complete but need to enter final code
  if (gameComplete && !finalCodeCorrect) {
    return (
     <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950 pt-16"  >
     <Card className="ce w-full max-w-3xl  border-2 border-primary/20  text-white shadow-xl bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950">
        <CardHeader className="border-b border-slate-700">
          <div className="flex justify-between items-center">
            <CardTitle>Final Challenge</CardTitle>
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-yellow-400 mr-2" />
              <span className={timer < 60 ? "text-red-400" : "text-yellow-400"}>{formatTime(timer)}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold mb-4">Enter the Escape Code</h3>
            <p className="text-slate-300 mb-6">
              You've unlocked all the objects and collected all the clues. Now enter the 4-digit code to escape the
              room!
            </p>

            <div className="flex flex-col items-center gap-4">
              <div className="grid grid-cols-4 gap-4 mb-4">
                {objects.map((object) => (
                  <div key={object.id} className="p-4 bg-black bg-opacity-30 rounded-lg text-center">
                    <div className="text-3xl mb-2">{object.image}</div>
                    <div className="text-sm font-semibold">{object.name}</div>
                    <Badge className="mt-2 bg-green-600">Unlocked</Badge>
                    <div className="mt-3 p-2 bg-black bg-opacity-30 rounded text-yellow-400 text-sm">{object.challenge.clue}</div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4 mt-4">
                <input
                  type="text"
                  value={finalCode}
                  onChange={(e) => setFinalCode(e.target.value.replace(/[^0-9]/g, "").slice(0, 4))}
                  placeholder="Enter 4-digit code"
                  className="px-4 py-2 bg-black bg-opacity-30 border border-slate-700 rounded-md text-white text-center text-xl tracking-widest w-40"
                  maxLength={4}
                />
                <Button
                  onClick={checkFinalCode}
                  disabled={finalCode.length !== 4}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Key className="mr-2 h-4 w-4" /> Unlock
                </Button>
              </div>

              {finalCodeSubmitted && !finalCodeCorrect && (
                <div className="mt-4 p-3 bg-red-900/50 rounded-md text-white">
                  Incorrect code. Review your clues and try again!
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
     </div>
    )
  }

  // Main game screen
  return (
    <div className="flex justify-center items-center min-h-screen pt-24 bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950">
      <Card className="w-full max-w-4xl bg-black bg-opacity-30 border-2 border-primary/20  text-white shadow-xl">
        <CardHeader className="border-b border-slate-700">
          <div className="flex justify-between items-center">
            <CardTitle>Encapsulation Escape Room</CardTitle>
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-yellow-400 mr-2" />
              <span className={timer < 60 ? "text-red-400" : "text-yellow-400"}>{formatTime(timer)}</span>
            </div>
          </div>
          <Progress
            value={(objects.filter((obj) => obj.unlocked).length / objects.length) * 100}
            className="h-2 bg-black bg-opacity-30"
          />
        </CardHeader>

        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Room objects */}
            <div className="md:col-span-1 space-y-4">
              <h3 className="font-semibold text-lg mb-2">Room Objects</h3>
              {objects.map((object) => (
                <div
                  key={object.id}
                  className={`p-4 rounded-lg cursor-pointer transition-colors ${
                    selectedObject?.id === object.id
                      ? "bg-purple-900/50 border border-purple-500"
                      : object.unlocked
                        ? "bg-black bg-opacity-30 border border-green-500"
                        : "bg-black bg-opacity-30 border border-slate-600 hover:border-slate-500"
                  }`}
                  onClick={() => selectObject(object)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{object.image}</span>
                      <h4 className="font-semibold">{object.name}</h4>
                    </div>
                    {object.unlocked ? (
                      <Unlock className="h-5 w-5 text-green-400" />
                    ) : (
                      <LockKeyhole className="h-5 w-5 text-red-400" />
                    )}
                  </div>
                  <p className="text-sm text-slate-300">{object.description}</p>
                </div>
              ))}
            </div>

            {/* Challenge area */}
            <div className="md:col-span-2">
              {selectedObject ? (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-lg">{selectedObject.name} Challenge</h3>
                    <Badge className={selectedObject.unlocked ? "bg-green-600" : "bg-red-600"}>
                      {selectedObject.unlocked ? "Unlocked" : "Locked"}
                    </Badge>
                  </div>

                  <p className="text-slate-300 mb-4">{selectedObject.challenge.description}</p>

                  <TabsComponents.Root defaultValue="code" className="mb-6">
                    <TabsComponents.List className="bg-black bg-opacity-30">
                      <TabsComponents.Trigger value="code">Code Editor</TabsComponents.Trigger>
                      {showClue && <TabsComponents.Trigger value="clue">Clue</TabsComponents.Trigger>}
                    </TabsComponents.List>

                    <TabsComponents.Content value="code" className="mt-2">
                      <div className="mb-4">
                        <textarea
                          value={userCode}
                          onChange={(e) => setUserCode(e.target.value)}
                          className="w-full h-64 p-4 bg-black bg-opacity-30 text-slate-300 font-mono text-sm rounded-md border border-slate-700 focus:border-purple-500 focus:outline-none"
                          disabled={selectedObject.unlocked}
                        />
                      </div>

                      {codeResult !== null && (
                        <div className={`p-4 rounded-md mb-4 ${codeResult ? "bg-green-900/50" : "bg-red-900/50"}`}>
                          {codeResult ? (
                            <p>Correct! You've properly implemented encapsulation.</p>
                          ) : (
                            <p>Not quite right. Check your getter and setter implementations.</p>
                          )}
                        </div>
                      )}

                      <div className="flex justify-between">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              className="bg-transparent border-slate-600 text-slate-300 hover:bg-slate-700"
                            >
                              <Lightbulb className="h-4 w-4 mr-2" /> Hint
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-black bg-opacity-30 text-white border-slate-700">
                            <DialogHeader>
                              <DialogTitle>Encapsulation Hint</DialogTitle>
                              <DialogDescription className="text-slate-300">
                                Here's a hint to help you solve this challenge:
                              </DialogDescription>
                            </DialogHeader>
                            <div className="p-4 bg-black bg-opacity-30 rounded-md">{selectedObject.challenge.hint}</div>
                          </DialogContent>
                        </Dialog>

                        {!selectedObject.unlocked && (
                          <Button onClick={checkCode} className="bg-purple-600 hover:bg-purple-700">
                            Check Code
                          </Button>
                        )}
                      </div>
                    </TabsComponents.Content>

                    {showClue && (
                      <TabsComponents.Content value="clue" className="mt-2">
                        <div className="p-6 bg-black bg-opacity-30 rounded-lg border border-yellow-600/50">
                          <div className="flex items-center mb-4">
                            <BookOpen className="h-5 w-5 text-yellow-400 mr-2" />
                            <h4 className="font-semibold text-yellow-400">You found a clue!</h4>
                          </div>
                          <p className="text-yellow-300 text-lg">{selectedObject.challenge.clue}</p>
                          <p className="mt-4 text-slate-300 text-sm">
                            This is part of the escape code. Collect all clues to find the complete code.
                          </p>
                        </div>
                      </TabsComponents.Content>
                    )}
                  </TabsComponents.Root>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <LockKeyhole className="h-16 w-16 text-purple-400 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Select an Object</h3>
                  <p className="text-slate-300">
                    Click on a locked object to start solving its encapsulation challenge. Unlock all objects to find the
                    escape code!
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

