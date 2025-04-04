"use client"

import React, { useState, useEffect } from "react"
import { ArrowRight, Award, Check, X, RefreshCw, HelpCircle } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { TabsComponents } from "../components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog"
import { Progress } from "../components/ui/progress"

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
    correctCatch: `try {
  int[] numbers = {1, 2, 3};
  int value = numbers[5];
  System.out.println("Value: " + value);
} catch (ArrayIndexOutOfBoundsException e) {
  System.out.println("Error: Trying to access index outside array bounds");
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
    correctCatch: `try {
  String text = null;
  int length = text.length();
  System.out.println("Length: " + length);
} catch (NullPointerException e) {
  System.out.println("Error: Cannot call methods on a null object");
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
  },
  {
    id: 3,
    title: "Invalid Number Format",
    description: "This code tries to convert an invalid string to a number.",
    code: `public class Main {
  public static void main(String[] args) {
    String input = "abc";
    int number = Integer.parseInt(input);
    System.out.println("Number: " + number);
  }
}`,
    exception: "NumberFormatException",
    correctCatch: `try {
  String input = "abc";
  int number = Integer.parseInt(input);
  System.out.println("Number: " + number);
} catch (NumberFormatException e) {
  System.out.println("Error: Cannot convert non-numeric string to a number");
}`,
    explanation:
      "This code throws a NumberFormatException because 'abc' cannot be converted to an integer. The parseInt() method requires a string containing a valid number representation.",
    options: ["NumberFormatException", "IllegalArgumentException", "InputMismatchException", "ParseException"],
    difficulty: "easy",
  },
  {
    id: 4,
    title: "Division by Zero",
    description: "This code attempts to divide by zero.",
    code: `public class Main {
  public static void main(String[] args) {
    int a = 10;
    int b = 0;
    int result = a / b;
    System.out.println("Result: " + result);
  }
}`,
    exception: "ArithmeticException",
    correctCatch: `try {
  int a = 10;
  int b = 0;
  int result = a / b;
  System.out.println("Result: " + result);
} catch (ArithmeticException e) {
  System.out.println("Error: Division by zero is not allowed");
}`,
    explanation:
      "This code throws an ArithmeticException because division by zero is not defined for integers in Java. Always check if your divisor is zero before performing division.",
    options: ["ArithmeticException", "NumberFormatException", "IllegalArgumentException", "MathException"],
    difficulty: "medium",
  },
  {
    id: 5,
    title: "File Not Found",
    description: "This code tries to read a file that doesn't exist.",
    code: `import java.io.File;
import java.io.FileReader;

public class Main {
  public static void main(String[] args) {
    File file = new File("nonexistent.txt");
    FileReader fr = new FileReader(file);
    // Read file contents...
  }
}`,
    exception: "FileNotFoundException",
    correctCatch: `import java.io.File;
import java.io.FileReader;
import java.io.FileNotFoundException;

public class Main {
  public static void main(String[] args) {
    try {
      File file = new File("nonexistent.txt");
      FileReader fr = new FileReader(file);
      // Read file contents...
    } catch (FileNotFoundException e) {
      System.out.println("Error: The specified file does not exist");
    }
  }
}`,
    explanation:
      "This code throws a FileNotFoundException because it's trying to read a file that doesn't exist. Always verify file existence or handle this exception when working with files.",
    options: ["FileNotFoundException", "IOException", "FileSystemException", "PathNotFoundException"],
    difficulty: "medium",
  },
  {
    id: 6,
    title: "Multiple Exceptions",
    description: "This code could throw multiple different exceptions.",
    code: `import java.io.FileReader;
import java.io.BufferedReader;

public class Main {
  public static void main(String[] args) {
    BufferedReader reader = new BufferedReader(new FileReader("data.txt"));
    String line = reader.readLine();
    int number = Integer.parseInt(line);
    System.out.println(10 / number);
  }
}`,
    exception: "Multiple Exceptions",
    correctCatch: `import java.io.FileReader;
import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.IOException;

public class Main {
  public static void main(String[] args) {
    try {
      BufferedReader reader = new BufferedReader(new FileReader("data.txt"));
      String line = reader.readLine();
      int number = Integer.parseInt(line);
      System.out.println(10 / number);
    } catch (FileNotFoundException e) {
      System.out.println("Error: File not found");
    } catch (IOException e) {
      System.out.println("Error: Problem reading the file");
    } catch (NumberFormatException e) {
      System.out.println("Error: Invalid number format in file");
    } catch (ArithmeticException e) {
      System.out.println("Error: Division by zero");
    }
  }
}`,
    explanation:
      "This code can throw multiple exceptions: FileNotFoundException if the file doesn't exist, IOException if there's a problem reading the file, NumberFormatException if the file doesn't contain a valid number, and ArithmeticException if the number is zero.",
    options: [
      "Multiple catch blocks",
      "Single catch block with | (OR) operator",
      "General Exception catch",
      "try-with-resources",
    ],
    difficulty: "hard",
  },
]

export default function ExceptionGame() {
  const [currentSnippet, setCurrentSnippet] = useState(codeSnippets[0])
  const [selectedOption, setSelectedOption] = useState("")
  const [result, setResult] = useState(null)
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [progress, setProgress] = useState(0)
  const [showSolution, setShowSolution] = useState(false)
  const [gameComplete, setGameComplete] = useState(false)

  useEffect(() => {
    // Reset game state whenchanges
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
      setResult(null)
      setShowSolution(false)
    } else if (level > 3) {
      setGameComplete(true)
    }
  }, [level])

  const handleOptionSelect = (option) => {
    setSelectedOption(option)
  }

  const handleSubmit = () => {
    if (
      selectedOption === currentSnippet.exception ||
      (currentSnippet.id === 6 && selectedOption === "Multiple catch blocks")
    ) {
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
  }

  const handleNextSnippet = () => {
    // Find snippets for current level
    const snippetsForLevel = codeSnippets.filter(
      (snippet) =>
        (level === 1 && snippet.difficulty === "easy") ||
        (level === 2 && snippet.difficulty === "medium") ||
        (level === 3 && snippet.difficulty === "hard"),
    )

    // Make sure we don't show the same snippet again
    const availableSnippets = snippetsForLevel.filter((snippet) => snippet.id !== currentSnippet.id)

    if (availableSnippets.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableSnippets.length)
      setCurrentSnippet(availableSnippets[randomIndex])
      setSelectedOption("")
      setResult(null)
      setShowSolution(false)
    } else {
      // If no more snippets for this level, move to next level
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
    setResult(null)
    setShowSolution(false)
  }

  if (gameComplete) {
    return (
      <Card className="w-full max-w-3xl bg-slate-800 border-slate-700 text-white shadow-xl">
        <CardHeader className="text-center bg-emerald-600 rounded-t-lg">
          <CardTitle className="text-3xl">Congratulations!</CardTitle>
          <CardDescription className="text-white text-lg">You've completed all levels</CardDescription>
        </CardHeader>
        <CardContent className="p-8 text-center">
          <div className="flex justify-center mb-8">
            <Award className="h-32 w-32 text-yellow-400" />
          </div>
          <h3 className="text-2xl font-bold mb-4">Final Score: {score}</h3>
          <p className="text-slate-300 mb-8">
            You've mastered the basics of Java exception handling! You now understand how to identify and catch
            different types of exceptions.
          </p>
          <Button onClick={resetGame} size="lg" className="bg-emerald-600 hover:bg-emerald-700">
            <RefreshCw className="mr-2 h-5 w-5" /> Play Again
          </Button>
        </CardContent>
      </Card>
    )
  }
  

  return (
    <div className="flex justify-center items-center min-h-screen pt-24">
    <div className="w-full max-w-3xl p-4    ">
    <Card className="w-full max-w-3xl bg-slate-800 border-slate-700 text-white shadow-xl">
      <CardHeader className="border-b border-slate-700">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>
              Level {level}: {level === 1 ? "Beginner" : level === 2 ? "Intermediate" : "Advanced"}
            </CardTitle>
            <CardDescription className="text-slate-300">Identify the exception in this code snippet</CardDescription>
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

        {result && (
          <div
            className={`p-4 rounded-md mb-6 flex items-center ${
              result === "correct" ? "bg-emerald-900/50" : "bg-red-900/50"
            }`}
          >
            {result === "correct" ? (
              <>
                <Check className="h-5 w-5 text-emerald-400 mr-2" />
                <span>Correct! You identified the exception.</span>
              </>
            ) : (
              <>
                <X className="h-5 w-5 text-red-400 mr-2" />
                <span>Incorrect. Try again or view the solution.</span>
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
                Here's a hint to help you identify the exception:
              </DialogDescription>
            </DialogHeader>
            <div className="p-4 bg-slate-900 rounded-md">
              {currentSnippet.id === 1 &&
                "When you try to access an array element outside its bounds, Java throws a specific exception."}
              {currentSnippet.id === 2 &&
                "When you try to call a method on a null reference, Java throws a specific exception."}
              {currentSnippet.id === 3 &&
                "When you try to convert a non-numeric string to a number, Java throws a specific exception."}
              {currentSnippet.id === 4 && "When you try to divide a number by zero, Java throws a specific exception."}
              {currentSnippet.id === 5 &&
                "When you try to access a file that doesn't exist, Java throws a specific exception."}
              {currentSnippet.id === 6 &&
                "This code could throw multiple different exceptions. Consider what approach would handle all cases."}
            </div>
          </DialogContent>
        </Dialog>

        <div>
          {!result ? (
            <Button onClick={handleSubmit} disabled={!selectedOption} className="bg-emerald-600 hover:bg-emerald-700">
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

