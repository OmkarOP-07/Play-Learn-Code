"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { TabsComponents } from "../../components/ui/tabs"
import { Badge } from "../../components/ui/badge"
import { Sparkles, Play, Award, ChevronRight, Rocket } from "lucide-react"
import confetti from "canvas-confetti"
import { useJavaPoints } from "../JavaPointsContext";

export default function JavaLearningGame() {
  const navigate = useNavigate();
  const [name, setName] = useState("")
  const [output, setOutput] = useState("")
  const [showOutput, setShowOutput] = useState(false)
  const [level, setLevel] = useState(1)
  const [celebration, setCelebration] = useState(false)
  const { points, addPoints } = useJavaPoints();
  const runCode = () => {
    if (!name.trim()) {
      setOutput("Oops! You forgot to type your name!")
      return
    }

    setShowOutput(true)
    setOutput(`Hello ${name}!`)

    if (!celebration) {
      setCelebration(true)
      addPoints(10)

      // Trigger confetti effect
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    }
  }

  const resetGame = () => {
    setName("")
    setOutput("")
    setShowOutput(false)
    setCelebration(false)
  }

  const goToNextLevel = () => {
    navigate('/java/beginner/basic-syntax');
  }

  useEffect(() => {
    // Clean up confetti on unmount
    return () => {
      confetti.reset()
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950 text-white overflow-hidden relative">
      <div className="mx-auto p-4 pt-24 text-black text-white">
      <Card className="  shadow-lg bg-gray-200 text-black w-full max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6 bg-purple-500 p-2 rounded-md text-black border-2 border-purple-500">
        <div className="flex items-center gap-2  p-2 rounded-md text-black">
          <Rocket className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold ">Java Adventure</h1>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="text-yellow-500 border-yellow-500 flex items-center gap-1">
            <Sparkles className="h-4 w-4" />
            <span>{points} Points</span>
          </Badge>
          <Badge variant="outline" className="text-purple-500 border-purple-500 flex items-center gap-1">
            <Award className="h-4 w-4" />
            <span>Level {level}</span>
          </Badge>
        </div>
      </div>

        <CardHeader className="bg-primary/10">
          <CardTitle className="text-xl">Mission: Print Your Name!</CardTitle>
          <CardDescription>
            Let's learn how Java says hello to the world! Type your name and see what happens.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <TabsComponents.Root defaultValue="code" className="w-full">
            <TabsComponents.List className="grid w-full grid-cols-2">
              <TabsComponents.Trigger value="code">Your Code</TabsComponents.Trigger>
              <TabsComponents.Trigger value="explanation">How It Works</TabsComponents.Trigger>
            </TabsComponents.List>
            <TabsComponents.Content value="code" className="space-y-4">
              <div className="bg-black text-green-400 p-4 rounded-md font-mono text-sm overflow-x-auto">
                <div>public class Main {"{"}</div>
                <div className="ml-4">public static void main(String[] args) {"{"}</div>
                <div className="ml-8 flex items-center gap-2">
                  <span>System.out.println("Hello </span>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-32 h-6 px-1 py-0 bg-black border-green-400 text-green-400 inline-block"
                    placeholder="your name"
                  />
                  <span>");</span>
                </div>
                <div className="ml-4">{"}"}</div>
                <div>{"}"}</div>
              </div>

              <div className="flex justify-end">
                <Button onClick={runCode} className="flex items-center gap-2 bg-gray-200 text-white" size="sm">
                  <Play className="h-4 w-4" />
                  Run Code
                </Button>
              </div>

              {showOutput && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium mb-2">Output:</h3>
                  <div className="bg-gray-100 p-3 rounded-md">
                    {output}
                    {celebration && (
                      <div className="text-center mt-4 text-primary font-bold animate-bounce">
                        Awesome job! +10 points!
                      </div>
                    )}
                  </div>
                </div>
              )}
            </TabsComponents.Content>

            <TabsComponents.Content value="explanation">
              <div className="space-y-4 p-2">
                <div className="bg-blue-50 p-3 rounded-md">
                  <h3 className="font-bold text-blue-700">public class Main {"{"}</h3>
                  <p>
                    In Java, we put our code inside a <span className="font-bold">class</span>. Think of a class like a
                    container for our code!
                  </p>
                </div>

                <div className="bg-purple-50 p-3 rounded-md">
                  <h3 className="font-bold text-purple-700">public static void main(String[] args) {"{"}</h3>
                  <p>
                    This is a special method called <span className="font-bold">main</span>. It's where Java starts
                    running your program - like the starting line in a race!
                  </p>
                </div>

                <div className="bg-green-50 p-3 rounded-md">
                  <h3 className="font-bold text-green-700">System.out.println("Hello your name");</h3>
                  <p>
                    This line tells Java to print something to the screen. It's like telling Java to speak out loud!
                  </p>
                </div>

                <div className="bg-yellow-50 p-3 rounded-md">
                  <h3 className="font-bold text-yellow-700">{"}"}</h3>
                  <p>The curly braces {"{ }"} show where blocks of code begin and end. Like bookends for your code!</p>
                </div>
              </div>
            </TabsComponents.Content>
          </TabsComponents.Root>
        </CardContent>
        <CardFooter className="bg-primary/5 flex justify-between">
          <Button variant="outline" onClick={resetGame} className="bg-black text-white">
            Try Again
          </Button>

          {celebration && (
            <Button onClick={() => {
              goToNextLevel();
            }} className="flex items-center gap-2 bg-black text-white  ">
              Complete Level <ChevronRight className="h-4 w-4" />
            </Button>
         )}
        </CardFooter>
      </Card>
    </div>
    </div>
  )
}

