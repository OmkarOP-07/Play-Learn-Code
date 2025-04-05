"use client"

import React, { useState, useEffect } from "react"
import { ArrowRight, Award, Check, X, RefreshCw, HelpCircle, Sword, Shield } from "lucide-react"
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

const codeSnippets = [
  {
    id: 1,
    title: "Array Index Problem",
    description: "This code tries to access an index that doesn't exist in the array.",
    code: `public class Main {
  public static void main(String[] args) {
    int[] numbers = {1, 2, 3};
    int value = numbers[5]; // Array has only 3 elements!
    System.out.println("Value: " + value);
  }
}`,
    exception: "ArrayIndexOutOfBoundsException",  
    correctCatch: `public class Main {
  public static void main(String[] args) {
    try {
      int[] numbers = {1, 2, 3};
      int value = numbers[5];
      System.out.println("Value: " + value);
    } catch (ArrayIndexOutOfBoundsException e) {
      System.out.println("Error: Trying to access index outside array bounds");
    }
  }
}`,
    explanation:
      "This code throws an ArrayIndexOutOfBoundsException because it's trying to access index 5 in an array that only has 3 elements (indexes 0, 1, and 2).",
    options: [
      "ArrayIndexOutOfBoundsException",
      "NullPointerException",
      "NumberFormatException",
      "IllegalArgumentException",
    ],
    difficulty: "easy",
    type: "mcq"
  },
  {
    id: 2,
    title: "Null Reference",
    description: "This code tries to call a method on a null object.",
    code: `public class Main {
  public static void main(String[] args) {
    String text = null;
    int length = text.length();
    System.out.println("Length: " + length);
  }
}`,
    exception: "NullPointerException",
    correctCatch: `public class Main {
  public static void main(String[] args) {
    try {
      String text = null;
      int length = text.length();
      System.out.println("Length: " + length);
    } catch (NullPointerException e) {
      System.out.println("Error: Cannot call methods on a null object");
    }
  }
}`,
    explanation:
      "This code throws a NullPointerException because it's trying to call the length() method on a null reference. Always check if an object is null before calling its methods.",
    options: [
      "NullPointerException",
      "ArrayIndexOutOfBoundsException",
      "NumberFormatException",
      "StringIndexOutOfBoundsException",
    ],
    difficulty: "easy",
    type: "mcq"
  },
  {
    id: 3,
    title: "File Handling Challenge",
    description: "Add exception handling to this file reading code.",
    code: `import java.io.*;

public class FileHandler {
  public static void readFile(String filename) {
    // [USER INPUT START]
    // Add try-catch block here
    FileReader file = new FileReader(filename);
    BufferedReader reader = new BufferedReader(file);
    String line = reader.readLine();
    while (line != null) {
      System.out.println(line);
      line = reader.readLine();
    }
    reader.close();
    // [USER INPUT END]
  }
}`,
    correctSolution: `import java.io.*;

public class FileHandler {
  public static void readFile(String filename) {
    try {
      FileReader file = new FileReader(filename);
      BufferedReader reader = new BufferedReader(file);
      String line = reader.readLine();
      while (line != null) {
        System.out.println(line);
        line = reader.readLine();
      }
      reader.close();
    } catch (FileNotFoundException e) {
      System.out.println("Error: File not found - " + filename);
    } catch (IOException e) {
      System.out.println("Error reading file: " + e.getMessage());
    }
  }
}`,
    explanation: "File operations can throw FileNotFoundException if the file doesn't exist and IOException for other I/O errors. Both should be handled.",
    difficulty: "medium",
    type: "coding"
  },
  {
    id: 4,
    title: "Class Cast Exception",
    description: "This code attempts an invalid type cast.",
    code: `public class Main {
  public static void main(String[] args) {
    Object obj = "Hello";
    Integer num = (Integer) obj;  // This will throw ClassCastException
  }
}`,
    exception: "ClassCastException",
    correctCatch: `public class Main {
  public static void main(String[] args) {
    try {
      Object obj = "Hello";
      Integer num = (Integer) obj;
    } catch (ClassCastException e) {
      System.out.println("Error: Cannot cast String to Integer");
    }
  }
}`,
    explanation: "This code throws a ClassCastException because it tries to cast a String to an Integer, which are incompatible types.",
    options: [
      "ClassCastException",
      "TypeMismatchException",
      "InvalidCastException",
      "RuntimeException"
    ],
    difficulty: "medium",
    type: "mcq"
  },
  {
    id: 5,
    title: "Database Connection Challenge",
    description: "Add exception handling to this database connection code.",
    code: `import java.sql.*;

public class DatabaseExample {
  public static void connectToDB(String url, String user, String password) {
    // [USER INPUT START]
    // Add try-catch block here
    Connection conn = DriverManager.getConnection(url, user, password);
    Statement stmt = conn.createStatement();
    ResultSet rs = stmt.executeQuery("SELECT * FROM users");
    while (rs.next()) {
      System.out.println(rs.getString("username"));
    }
    rs.close();
    stmt.close();
    conn.close();
    // [USER INPUT END]
  }
}`,
    correctSolution: `import java.sql.*;

public class DatabaseExample {
  public static void connectToDB(String url, String user, String password) {
    try {
      Connection conn = DriverManager.getConnection(url, user, password);
      Statement stmt = conn.createStatement();
      ResultSet rs = stmt.executeQuery("SELECT * FROM users");
      while (rs.next()) {
        System.out.println(rs.getString("username"));
      }
      rs.close();
      stmt.close();
      conn.close();
    } catch (SQLException e) {
      System.out.println("Database error: " + e.getMessage());
    }
  }
}`,
    explanation: "Database operations can throw SQLException for various database-related errors. This should be properly handled.",
    difficulty: "hard",
    type: "coding"
  },
  {
    id: 6,
    title: "Concurrent Modification",
    description: "This code modifies a collection while iterating over it.",
    code: `import java.util.*;

public class Main {
  public static void main(String[] args) {
    List<String> list = new ArrayList<>();
    list.add("A"); list.add("B"); list.add("C");
    
    for (String item : list) {
      if (item.equals("B")) {
        list.remove(item);  // This will throw ConcurrentModificationException
      }
    }
  }
}`,
    exception: "ConcurrentModificationException",
    correctCatch: `import java.util.*;

public class Main {
  public static void main(String[] args) {
    List<String> list = new ArrayList<>();
    list.add("A"); list.add("B"); list.add("C");
    
    Iterator<String> it = list.iterator();
    while (it.hasNext()) {
      String item = it.next();
      if (item.equals("B")) {
        it.remove();  // Safe removal using iterator
      }
    }
  }
}`,
    explanation: "This code throws a ConcurrentModificationException because it modifies the list while iterating over it. Use the iterator's remove method instead.",
    options: [
      "ConcurrentModificationException",
      "IllegalStateException",
      "ModificationDuringIterationException",
      "RuntimeException"
    ],
    difficulty: "hard",
    type: "mcq"
  }
]

const tasks = [
  {
    id: 1,
    title: "Task 1: The First Encounter (Handling Arithmetic Exception)",
    description: "You are trapped in the Crash Zone, and your first challenge is to deal with a DivideByZeroError.",
    objective: "Catch the ArithmeticException and prevent the program from crashing.",
    code: `public class CrashZone {
  public static void main(String[] args) {
    try {
      <span style="color: #ff8c00; font-weight: bold;">int result = 10 / 0;  // This will cause ArithmeticException</span>
    } catch (ArithmeticException e) {
      System.out.println("You can't divide by zero! Fix it.");
    }
  }
}`,
    explanation: "The highlighted line throws an <strong>ArithmeticException</strong> because division by zero is mathematically undefined."
  },
  {
    id: 2,
    title: "Task 2: The Null Pointer Trap",
    description: "In the Crash Zone, the NullPointerException lurks!",
    objective: "Handle NullPointerException when trying to call a method on a null object.",
    code: `public class CrashZone {
  public static void main(String[] args) {
    try {
      String text = null;
      <span style="color: #ff8c00; font-weight: bold;">System.out.println(text.length());  // NullPointerException</span>
    } catch (NullPointerException e) {
      System.out.println("Null object used! Handle it.");
    }
  }
}`,
    explanation: "The highlighted line throws a <strong>NullPointerException</strong> because we're calling <code>length()</code> on a null reference."
  },
  {
    id: 3,
    title: "Task 3: Custom Exception - Invalid Age",
    description: "Defend JavaLand by creating a custom exception.",
    objective: "Check if a user is eligible to enter a special area based on their age.",
    code: `class InvalidAgeException extends Exception {
  public InvalidAgeException(String message) {
    super(message);
  }
}

public class CrashZone {
  public static void main(String[] args) {
    try {
      <span style="color: #ff8c00; font-weight: bold;">validateAge(16);  // Will throw InvalidAgeException</span>
    } catch (InvalidAgeException e) {
      System.out.println(e.getMessage());
    }
  }

  public static void validateAge(int age) throws InvalidAgeException {
    if (age < 18) {
      throw new InvalidAgeException("Age must be at least 18 to enter!");
    }
  }
}`,
    explanation: "The highlighted line throws a <strong>custom InvalidAgeException</strong> because 16 is below the required age (18)."
  },
  {
    id: 4,
    title: "Task 4: The Final Bug Lord Battle (Multiple Exceptions)",
    description: "The Bug Lord is attacking with multiple errors at once!",
    objective: "Handle both ArithmeticException and NullPointerException in the same program.",
    code: `public class CrashZone {
  public static void main(String[] args) {
    try {
      <span style="color: #ff8c00; font-weight: bold;">int result = 10 / 0;  // ArithmeticException</span>
      <span style="color: #ff8c00; font-weight: bold;">String text = null;
      System.out.println(text.length());  // NullPointerException</span>
    } catch (ArithmeticException e) {
      System.out.println("You can't divide by zero!");
    } catch (NullPointerException e) {
      System.out.println("You tried to use a null object!");
    }
  }
}`,
    explanation: "The first highlighted line throws an <strong>ArithmeticException</strong>, while the second throws a <strong>NullPointerException</strong>. Both are caught separately."
  }
]

export default function ExceptionGame() {
  const [currentSnippet, setCurrentSnippet] = useState(codeSnippets[0])
  const [selectedOption, setSelectedOption] = useState("")
  const [userCode, setUserCode] = useState("")
  const [result, setResult] = useState(null)
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [progress, setProgress] = useState(0)
  const [showSolution, setShowSolution] = useState(false)
  const [gameComplete, setGameComplete] = useState(false)
  const [showStory, setShowStory] = useState(true)
  const [currentStoryPart, setCurrentStoryPart] = useState(0)
  const [showTasks, setShowTasks] = useState(false)
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0)

  const storyParts = [
    {
      title: "Level 6: The Shadow of the Bug Lord",
      content: (
        <>
          <p className="mb-4">The Bug Lord has sent his army of bugs to break JavaLand! These bugs cause unexpected errors that crash your programs.</p>
          <div className="flex justify-center my-4">
            <Sword className="h-12 w-12 text-red-500 animate-pulse" />
          </div>
          <p>To stop them, you must learn the secret power of <strong>Exception Handling</strong>. Only by using this power can you protect your code and keep JavaLand safe from the chaos.</p>
        </>
      )
    },
    {
      title: "Mission: The Unstable Realm",
      content: (
        <>
          <p className="mb-4">The Bug Lord's minions are attacking your code with various errors:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Array out of bounds attacks</li>
            <li>Null reference strikes</li>
            <li>Invalid number format spells</li>
            <li>Division by zero curses</li>
            <li>Illegal argument invasions</li>
            <li>Security violations</li>
          </ul>
          <div className="flex justify-center my-4">
            <Shield className="h-12 w-12 text-blue-500 animate-bounce" />
          </div>
          <p>Your mission is to defend against these attacks using <strong>try-catch blocks</strong> and <strong>custom exceptions</strong>.</p>
        </>
      )
    },
    {
      title: "Your Weapons: Exception Handling",
      content: (
        <>
          <div className="mb-4 p-4 bg-slate-900 rounded-md">
            <h4 className="font-semibold mb-2 text-emerald-400">Try-Catch Blocks:</h4>
            <pre className="bg-black p-3 rounded text-sm">
              <code>{`try {
  // Code that might throw an exception
} catch (ExceptionType e) {
  // Handle the exception
}`}</code>
            </pre>
            <p className="mt-2 text-slate-300">This allows you to check for errors and handle them gracefully.</p>
          </div>
          
          <div className="p-4 bg-slate-900 rounded-md">
            <h4 className="font-semibold mb-2 text-emerald-400">Custom Exceptions:</h4>
            <pre className="bg-black p-3 rounded text-sm">
              <code>{`class CustomException extends Exception {
  public CustomException(String message) {
    super(message);
  }
}`}</code>
            </pre>
            <p className="mt-2 text-slate-300">Create your own exceptions for special error cases.</p>
          </div>
        </>
      )
    }
  ]

  useEffect(() => {
    const snippetsForLevel = codeSnippets.filter(
      (snippet) =>
        (level === 1 && snippet.difficulty === "easy") ||
        (level === 2 && snippet.difficulty === "medium") ||
        (level === 3 && snippet.difficulty === "hard"),
    )

    if (snippetsForLevel.length > 0) {
      const randomIndex = Math.floor(Math.random() * snippetsForLevel.length)
      setCurrentSnippet(snippetsForLevel[randomIndex])
      setSelectedOption("")
      setUserCode("")
      setResult(null)
      setShowSolution(false)
    } else if (level > 3) {
      setGameComplete(true)
    }
  }, [level])

  const handleOptionSelect = (option) => {
    setSelectedOption(option)
  }

  const handleCodeChange = (e) => {
    setUserCode(e.target.value)
  }

  const normalizeCode = (code) => {
    return code
      .replace(/\s+/g, ' ') // Replace all whitespace sequences with single space
      .replace(/\s*([{};])\s*/g, '$1') // Remove spaces around braces and semicolons
      .trim()
  }

  const handleSubmit = () => {
    if (currentSnippet.type === "mcq") {
      // MCQ handling remains the same
      if (selectedOption === currentSnippet.exception) {
        setResult("correct")
        setScore(score + 10)
        setProgress(progress + 33.33)
  
        if (progress >= 66.66) {
          setTimeout(() => {
            setLevel((prev) => prev + 1)
            setProgress(0)
          }, 1500)
        }
      } else {
        setResult("incorrect")
      }
    } else if (currentSnippet.type === "coding") {
      // NEW CODE FOR HANDLING CODING CHALLENGES
      const editableCode = document.querySelector('.editable-code').textContent;
      const fullSolution = currentSnippet.code.replace(
        /\/\/ \[USER INPUT START\][\s\S]*?\/\/ \[USER INPUT END\]/,
        editableCode
      );
  
      // Improved normalization function
      const normalizeForComparison = (code) => {
        return code
          .replace(/\s+/g, ' ')         // Collapse whitespace
          .replace(/\/\/.*?\n/g, '')     // Remove single-line comments
          .replace(/\/\*.*?\*\//g, '')   // Remove multi-line comments
          .replace(/\s*([{};=])\s*/g, '$1') // Remove spaces around special chars
          .trim()
          .toLowerCase();
      };
  
      const normalizedUserCode = normalizeForComparison(fullSolution);
      const normalizedSolution = normalizeForComparison(currentSnippet.correctSolution);
  
      // More flexible comparison
      const isCorrect = (
        normalizedUserCode.includes(normalizedSolution) || 
        normalizedSolution.includes(normalizedUserCode) ||
        Math.abs(normalizedUserCode.length - normalizedSolution.length) < 10
      );
  
      if (isCorrect) {
        setResult("correct");
        setScore(score + 20);
        setProgress(progress + 33.33);
  
        if (progress >= 66.66) {
          setTimeout(() => {
            setLevel((prev) => prev + 1);
            setProgress(0);
          }, 1500);
        }
      } else {
        setResult("incorrect");
      }
    }
  };

  const handleNextSnippet = () => {
    const snippetsForLevel = codeSnippets.filter(
      (snippet) =>
        (level === 1 && snippet.difficulty === "easy") ||
        (level === 2 && snippet.difficulty === "medium") ||
        (level === 3 && snippet.difficulty === "hard"),
    )

    const availableSnippets = snippetsForLevel.filter((snippet) => snippet.id !== currentSnippet.id)

    if (availableSnippets.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableSnippets.length)
      setCurrentSnippet(availableSnippets[randomIndex])
      setSelectedOption("")
      setUserCode("")
      setResult(null)
      setShowSolution(false)
    } else {
      setLevel((prev) => prev + 1)
    }
  }

  const resetGame = () => {
    setScore(0)
    setLevel(1)
    setProgress(0)
    setGameComplete(false)
    setCurrentSnippet(codeSnippets[0])
    setSelectedOption("")
    setUserCode("")
    setResult(null)
    setShowSolution(false)
    setShowStory(true)
    setCurrentStoryPart(0)
    setShowTasks(false)
    setCurrentTaskIndex(0)
  }

  const handleNextStoryPart = () => {
    if (currentStoryPart < storyParts.length - 1) {
      setCurrentStoryPart(currentStoryPart + 1)
    } else {
      setShowStory(false)
      setShowTasks(true)
    }
  }

  const handleNextTask = () => {
    if (currentTaskIndex < tasks.length - 1) {
      setCurrentTaskIndex(currentTaskIndex + 1)
    } else {
      setShowTasks(false)
      // Start the main game after completing all tasks
      const snippetsForLevel = codeSnippets.filter(snippet => snippet.difficulty === "easy")
      const randomIndex = Math.floor(Math.random() * snippetsForLevel.length)
      setCurrentSnippet(snippetsForLevel[randomIndex])
    }
  }

  const handlePreviousTask = () => {
    if (currentTaskIndex > 0) {
      setCurrentTaskIndex(currentTaskIndex - 1)
    }
  }

  if (gameComplete) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950 pt-16">
        <Card className="w-full max-w-3xl bg-slate-800 border-slate-700 text-white shadow-xl">
          <CardHeader className="text-center bg-emerald-600 rounded-t-lg">
            <CardTitle className="text-3xl">Congratulations!</CardTitle>
            <CardDescription className="text-white text-lg">
              You've defeated the Bug Lord and mastered exception handling!
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 text-center">
            <div className="flex justify-center mb-8">
              <Award className="h-32 w-32 text-yellow-400" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Final Score: {score}</h3>
            <p className="text-slate-300 mb-8">
              You've completed all challenges and protected JavaLand from the Bug Lord's attacks!
              Ready to learn about Inheritance and Polymorphism next?
            </p>
            <div className="flex justify-center gap-4">
              <Button 
                onClick={resetGame} 
                size="lg" 
                variant="outline"
                className="bg-transparent border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                <RefreshCw className="mr-2 h-5 w-5" /> Play Again
              </Button>
              <Button 
                onClick={() => window.location.href = "/java/inheritance"} 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700"
              >
                <ArrowRight className="mr-2 h-5 w-5" /> Next Concept
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (showStory) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950 pt-16">
        <Card className="w-full max-w-3xl bg-slate-800 border-slate-700 text-white shadow-xl">
          <CardHeader className="border-b border-slate-700">
            <CardTitle className="text-2xl text-center text-yellow-400">
              {storyParts[currentStoryPart].title}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="text-lg text-slate-300">
              {storyParts[currentStoryPart].content}
            </div>
          </CardContent>
          <CardFooter className="flex justify-center border-t border-slate-700 p-6">
            <Button 
              onClick={handleNextStoryPart} 
              size="lg" 
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              {currentStoryPart < storyParts.length - 1 ? "Continue" : "Begin Tasks"} 
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  if (showTasks) {
    const currentTask = tasks[currentTaskIndex]
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950 pt-16">
        <Card className="w-full max-w-3xl bg-slate-800 border-slate-700 text-white shadow-xl">
          <CardHeader className="border-b border-slate-700">
            <CardTitle className="text-xl">{currentTask.title}</CardTitle>
            <CardDescription className="text-slate-300">{currentTask.description}</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Objective:</h3>
              <p className="text-slate-300">{currentTask.objective}</p>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Solution Code:</h3>
              <pre className="p-4 rounded-md bg-slate-900 overflow-x-auto">
                <code 
                  className="text-sm font-mono" 
                  dangerouslySetInnerHTML={{ __html: currentTask.code }} 
                />
              </pre>
            </div>

            <div className="p-4 bg-slate-700 rounded-md">
              <h4 className="font-semibold mb-2">Explanation:</h4>
              <p 
                className="text-slate-300" 
                dangerouslySetInnerHTML={{ __html: currentTask.explanation }} 
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t border-slate-700 p-4">
            <Button 
              onClick={handlePreviousTask} 
              disabled={currentTaskIndex === 0}
              variant="outline"
              className="bg-transparent border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              Previous Task
            </Button>
            
            <Button 
              onClick={handleNextTask} 
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              {currentTaskIndex < tasks.length - 1 ? "Next Task" : "Start Challenges"} 
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex justify-center items-center min-h-screen pt-24 bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950 pt-16">
      <div className="w-full max-w-3xl p-4">
        <Card className="w-full max-w-3xl bg-slate-800 border-slate-700 text-white shadow-xl">
          <CardHeader className="border-b border-slate-700">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>
                  Level {level}: {level === 1 ? "Beginner" : level === 2 ? "Intermediate" : "Advanced"}
                </CardTitle>
                <CardDescription className="text-slate-300">
                  {currentSnippet.type === "mcq" 
                    ? "Identify the exception in this code snippet" 
                    : "Write the exception handling code for this scenario"}
                </CardDescription>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-emerald-400">{score} pts</div>
                <div className="text-xs text-slate-400">SCORE</div>
              </div>
            </div>
            <Progress value={progress} className="h-2 bg-slate-700" />
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">{currentSnippet.title}</h3>
              <p className="text-slate-300 mb-4">{currentSnippet.description}</p>
            </div>

            {currentSnippet.type === "mcq" ? (
              <>
                <TabsComponents.Root defaultValue="code" className="mb-6">
                  <TabsComponents.List className="bg-slate-700">
                    <TabsComponents.Trigger value="code">Code Snippet</TabsComponents.Trigger>
                    {showSolution && <TabsComponents.Trigger value="solution">Solution</TabsComponents.Trigger>}
                  </TabsComponents.List>
                  <TabsComponents.Content value="code" className="mt-2">
                    <pre className="p-4 rounded-md bg-slate-900 overflow-x-auto">
                      <code className="text-sm text-slate-300 font-mono">{currentSnippet.code}</code>
                    </pre>
                  </TabsComponents.Content>
                  {showSolution && (
                    <TabsComponents.Content value="solution" className="mt-2">
                      <pre className="p-4 rounded-md bg-slate-900 overflow-x-auto">
                        <code className="text-sm text-emerald-400 font-mono">{currentSnippet.correctCatch}</code>
                      </pre>
                      <div className="mt-4 p-4 bg-slate-700 rounded-md">
                        <h4 className="font-semibold mb-2">Explanation:</h4>
                        <p className="text-slate-300">{currentSnippet.explanation}</p>
                      </div>
                    </TabsComponents.Content>
                  )}
                </TabsComponents.Root>

                <div className="space-y-3 mb-6">
                  <h3 className="font-semibold">What exception will this code throw?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {currentSnippet.options.map((option) => (
                      <div
                        key={option}
                        className={`p-3 rounded-md cursor-pointer border transition-colors ${
                          selectedOption === option
                            ? "bg-slate-700 border-emerald-500"
                            : "bg-slate-900 border-slate-700 hover:border-slate-500"
                        }`}
                        onClick={() => handleOptionSelect(option)}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Code to Fix:</h3>
                  <pre 
  className="p-4 rounded-md bg-slate-900 overflow-x-auto mb-4 editable-code" 
  contentEditable
  suppressContentEditableWarning
  style={{ 
    whiteSpace: "pre-wrap", 
    outline: "none",
    minHeight: "200px"
  }}
>
  {currentSnippet.code.split('\n').map((line, i) => {
    if (line.includes('[USER INPUT START]')) {
      return (
        <React.Fragment key={i}>
          <div className="bg-yellow-900/30 px-1 -mx-1 border-l-2 border-yellow-500">
            {line.replace('[USER INPUT START]', '')}
            <span className="text-yellow-400 text-xs block mb-2">
              // Write your exception handling code here
            </span>
          </div>
        </React.Fragment>
      );
    } else if (line.includes('[USER INPUT END]')) {
      return (
        <div key={i} className="bg-yellow-900/30 px-1 -mx-1 border-l-2 border-yellow-500">
          {line.replace('[USER INPUT END]', '')}
        </div>
      );
    }
    return <div key={i}>{line}</div>;
  })}
</pre>
                </div>

                {showSolution && (
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">Correct Solution:</h3>
                    <pre className="p-4 rounded-md bg-slate-900 overflow-x-auto">
                      <code className="text-sm text-emerald-400 font-mono">{currentSnippet.correctSolution}</code>
                    </pre>
                    <div className="mt-4 p-4 bg-slate-700 rounded-md">
                      <h4 className="font-semibold mb-2">Explanation:</h4>
                      <p className="text-slate-300">{currentSnippet.explanation}</p>
                    </div>
                  </div>
                )}
              </>
            )}

            {result && (
              <div
                className={`p-4 rounded-md mb-6 flex items-center ${
                  result === "correct" ? "bg-emerald-900/50" : "bg-red-900/50"
                }`}
              >
                {result === "correct" ? (
                  <>
                    <Check className="h-5 w-5 text-emerald-400 mr-2" />
                    <span>
                      {currentSnippet.type === "mcq" 
                        ? "Correct! You identified the exception." 
                        : "Correct! Your solution handles the exceptions properly."}
                    </span>
                  </>
                ) : (
                  <>
                    <X className="h-5 w-5 text-red-400 mr-2" />
                    <span>
                      {currentSnippet.type === "mcq" 
                        ? "Incorrect. Try again or view the solution." 
                        : "Your solution doesn't match. Try again or view the solution."}
                    </span>
                  </>
                )}
              </div>
            )}
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
                  <DialogTitle>Exception Handling Tip</DialogTitle>
                  <DialogDescription className="text-slate-300">
                    Here's a hint to help you {currentSnippet.type === "mcq" ? "identify" : "handle"} the exception:
                  </DialogDescription>
                </DialogHeader>
                <div className="p-4 bg-slate-900 rounded-md">
                  {currentSnippet.id === 1 &&
                    "When you try to access an array element outside its bounds, Java throws a specific exception."}
                  {currentSnippet.id === 2 &&
                    "When you try to call a method on a null reference, Java throws a specific exception."}
                  {currentSnippet.id === 3 &&
                    "File operations can throw FileNotFoundException if the file doesn't exist and IOException for other I/O errors."}
                  {currentSnippet.id === 4 &&
                    "When you try to cast an object to an incompatible type, Java throws this exception."}
                  {currentSnippet.id === 5 &&
                    "Database operations can throw SQLException for various database-related errors."}
                  {currentSnippet.id === 6 &&
                    "When you modify a collection while iterating over it, Java throws this exception."}
                </div>
              </DialogContent>
            </Dialog>

            <div>
              {!result ? (
                <Button 
                  onClick={handleSubmit} 
                  disabled={
                    currentSnippet.type === "mcq" 
                      ? !selectedOption 
                      : false
                  } 
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  Submit Answer
                </Button>
              ) : (
                <div className="flex gap-3">
                  {result === "incorrect" && (
                    <Button
                      variant="outline"
                      onClick={() => setShowSolution(!showSolution)}
                      className="bg-transparent border-slate-600 text-slate-300 hover:bg-slate-700"
                    >
                      {showSolution ? "Hide Solution" : "Show Solution"}
                    </Button>
                  )}
                  <Button onClick={handleNextSnippet} className="bg-emerald-600 hover:bg-emerald-700">
                    Next Challenge <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}