"use client"
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { BookOpen, Code, Coffee, PlayCircle } from 'lucide-react';
import Tooltip from "../../components/ui/tooltip";
import { useJavaPoints } from "../JavaPointsContext";

const JavaLearner = () => {
  const [activeExample, setActiveExample] = useState('hello');
  const [activeToken, setActiveToken] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const codeBlockRef = useRef(null);
  const { points, addPoints } = useJavaPoints();
  const keywordDefinitions = {
    'public': 'An access modifier that makes a class, method, or field accessible from any other class.',
    'class': 'A blueprint for creating objects that defines attributes and behaviors (methods).',
    'static': 'Indicates that a method or field belongs to the class itself, not to instances of the class.',
    'void': 'Indicates that a method doesn\'t return any value.',
    'main': 'The entry point of a Java application. The JVM looks for this specific method to start execution.',
    'String[]': 'An array of String objects, used for command-line arguments.',
    'args': 'Command-line arguments passed to the program.',
    'System': 'A built-in class that provides access to system resources.',
    'out': 'A static field in System class representing the standard output stream.',
    'println': 'A method that prints the specified message followed by a line break.',
    'int': 'A primitive data type for integer values.',
    'for': 'A control flow statement for iterating a specific number of times.',
    'if': 'A conditional statement that executes code based on whether a condition is true.',
    'else': 'The alternative branch of an if statement.',
    'return': 'Statement to exit from a method, with or without a value.',
    'new': 'Operator used to create instances of classes.',
    'String': 'A built-in class that represents a sequence of characters.'
  };
  
  const codeExamples = {
    hello: `public class HelloWorld {
    public static void main(String[] args) {
        // This is a comment
        System.out.println("Hello, World!");
    }
}`,
    variables: `public class Variables {
    public static void main(String[] args) {
        int number = 10;
        String text = "Java is fun";
        boolean isActive = true;
        
        System.out.println(number);
        System.out.println(text);
        System.out.println(isActive);
    }
}`,
    loop: `public class ForLoop {
    public static void main(String[] args) {
        // Print numbers from 1 to 5
        for (int i = 1; i <= 5; i++) {
            System.out.println("Count: " + i);
        }
    }
}`
  };

  const tokenizeCode = (sourceCode) => {
    const tokens = [];
    let currentWord = '';
    let inString = false;
    let inComment = false;
    
    for (let i = 0; i < sourceCode.length; i++) {
      const char = sourceCode[i];
      
      if (char === '"' && !inComment) {
        if (inString) {
          tokens.push({ text: currentWord + char, type: 'string' });
          currentWord = '';
          inString = false;
        } else {
          if (currentWord) {
            tokens.push({ text: currentWord, type: getTokenType(currentWord) });
            currentWord = '';
          }
          currentWord = char;
          inString = true;
        }
        continue;
      }
      
      if (char === '/' && sourceCode[i+1] === '/' && !inString && !inComment) {
        if (currentWord) {
          tokens.push({ text: currentWord, type: getTokenType(currentWord) });
          currentWord = '';
        }
        inComment = true;
        currentWord = char;
        continue;
      }
      
      if (inString || inComment) {
        currentWord += char;
        if (inComment && char === '\n') {
          tokens.push({ text: currentWord, type: 'comment' });
          currentWord = '';
          inComment = false;
        }
        continue;
      }
      
      if (/\s/.test(char) || /[{}\[\]();.,]/.test(char)) {
        if (currentWord) {
          tokens.push({ text: currentWord, type: getTokenType(currentWord) });
          currentWord = '';
        }
        if (char !== ' ' && char !== '\n' && char !== '\t') {
          tokens.push({ text: char, type: 'symbol' });
        } else {
          tokens.push({ text: char, type: 'whitespace' });
        }
      } else {
        currentWord += char;
      }
    }
    
    if (currentWord) {
      const type = inString ? 'string' : (inComment ? 'comment' : getTokenType(currentWord));
      tokens.push({ text: currentWord, type });
    }
    
    return tokens;
  };

  const getTokenType = (word) => {
    if (keywordDefinitions[word]) {
      return 'keyword';
    } else if (word === 'System' || word === 'out' || word === 'println' || word === 'print') {
      return 'method';
    } else if (/^[A-Z][A-Za-z0-9_]*$/.test(word)) {
      return 'class';
    }
    
    return 'code';
  };
  
  const handleTokenHover = (e, token) => {
    const word = token.text.trim();
    if (keywordDefinitions[word]) {
      setActiveToken(word);
      
      if (codeBlockRef.current) {
        const rect = codeBlockRef.current.getBoundingClientRect();
        const targetRect = e.currentTarget.getBoundingClientRect();
        setTooltipPosition({
          x: targetRect.left - rect.left + targetRect.width / 2 ,
          y: targetRect.top - rect.top + targetRect.height
          
        });
      }
    }
  };

  return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950 text-white overflow-hidden relative pt-16 text-black">
      <div className="container mx-auto px-4 py-8 ">
        <Card className="border-none shadow-lg">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-t-lg">
            <div className="flex items-center space-x-2">
              <Coffee className="h-7 w-7" />
              <div>
                <CardTitle className="text-2xl md:text-3xl font-bold">Java Syntax Explorer</CardTitle>
                <CardDescription className="text-blue-100">Interactive guide to Java programming basics</CardDescription>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-6 bg-white pt-4">
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4 items-start">
                <div className="w-full md:w-3/4 space-y-4">
                  <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                    <Code className="h-5 w-5 text-blue-600" />
                    Code Explorer
                    <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full ml-2">Hover to learn</span>
                  </h2>
                  
                  <div className="bg-slate-800 rounded-lg overflow-hidden shadow-md border border-slate-700 ">
                    <div className="flex items-center gap-1 px-4 py-2 bg-slate-900 border-b border-slate-700 ">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="ml-2 text-xs text-slate-400">JavaCode.java</span>
                    </div>
                    
                    <div ref={codeBlockRef} className={`relative font-mono p-4 overflow-x-auto ${activeExample === 'variables' ? "h-96" : "h-72"}`}>
                      <pre className="text-white">
                        <code>
                          {tokenizeCode(codeExamples[activeExample]).map((token, index) => {
                            if (token.type === 'whitespace') {
                              return token.text;
                            }
                            
                            return (
                              <span 
                                key={index} 
                                className={`
                                  transition-all duration-200
                                  ${token.type === 'keyword' ? "text-blue-400 font-medium hover:text-blue-300 hover:underline" : ""}
                                  ${token.type === 'string' ? "text-green-400 hover:text-green-300" : ""}
                                  ${token.type === 'comment' ? "text-gray-500 italic" : ""}
                                  ${token.type === 'symbol' ? "text-yellow-300" : ""}
                                  ${token.type === 'method' ? "text-purple-400 hover:text-purple-300" : ""}
                                  ${token.type === 'class' ? "text-orange-400 hover:text-orange-300" : ""}
                                  ${keywordDefinitions[token.text.trim()] ? "cursor-help" : ""}
                                `}
                                onMouseEnter={(e) => handleTokenHover(e, token)}
                                onMouseLeave={() => setActiveToken(null)}
                              >
                                {token.text}
                              </span>
                            );
                          })}
                        </code>
                      </pre>
                      
                      {activeToken && (
                        <Tooltip 
                          text={activeToken}
                          definition={keywordDefinitions[activeToken]}
                          position={tooltipPosition}
                        />
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 bg-gray-200 text-black rounded-lg">
                    <Button className={`transition-all duration-200 ${activeExample === 'hello' ? "bg-black text-white" : "bg-gray-200 text-black"} hover:text-white`}
                      variant={activeExample === 'hello' ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveExample('hello')}
                      onMouseEnter={(e) => e.currentTarget.classList.add('scale-105')}
                      onMouseLeave={(e) => e.currentTarget.classList.remove('scale-105')}
                    >
                      Hello World
                    </Button>
                    <Button className={`transition-all duration-200 ${activeExample === 'variables' ? "bg-black text-white" : "bg-gray-200 text-black"} hover:text-white`}
                      variant={activeExample === 'variables' ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveExample('variables')}
                      onMouseEnter={(e) => e.currentTarget.classList.add('scale-105')}
                      onMouseLeave={(e) => e.currentTarget.classList.remove('scale-105')}
                    >
                      Variables
                    </Button>
                    <Button className={`transition-all duration-200 ${activeExample === 'loop' ? "bg-black text-white" : "bg-gray-200 text-black"} hover:text-white`}
                      variant={activeExample === 'loop' ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveExample('loop')}
                      onMouseEnter={(e) => e.currentTarget.classList.add('scale-105')}
                      onMouseLeave={(e) => e.currentTarget.classList.remove('scale-105')}
                    >
                      For Loop
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col gap-4 items-start">
                <div className="text-black w-10rem">
                  <Card className="h-full">
                    <CardHeader className="bg-slate-100">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-blue-600" />
                        Learning Guide
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 font-bold">1.</span>
                          <span>Hover over any blue keyword to see its definition</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 font-bold">2.</span>
                          <span>Try different code examples using the buttons below</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 font-bold">3.</span>
                          <span>Notice the different colors for different code elements</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
                <div className="w-full text-black">
                  <Card className="h-full">
                    <CardHeader className="bg-slate-100">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-blue-600" />
                        More Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-2 hover:bg-slate-200">
                      <a href="https://dev.java/learn/getting-started/" className="hover:text-blue-600  rounded-md p-2">
                        Learn More About Java Basics 
                      </a>
                    </CardContent>
                  </Card>
                </div>
                </div>
              </div>
              
              <Card className="bg-gray-200 text-black">
                <CardHeader className="bg-slate-50 pb-2">
                  <CardTitle className="text-lg">Color Legend</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-blue-400"></div>
                    <span className="text-sm">Keywords</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-green-400"></div>
                    <span className="text-sm">Strings</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-gray-500"></div>
                    <span className="text-sm">Comments</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-purple-400"></div>
                    <span className="text-sm">Methods</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
          
          <CardFooter className="bg-slate-50 border-t p-4 text-center text-slate-600 rounded-b-lg">
            <div className="w-full flex justify-between items-center">
              <span className="text-sm">Interactive Java Syntax Explorer</span>
              <Button variant="outline" size="sm" onClick={() => {
                addPoints(10);
                navigate('/java/variables/variables');
              }}>
                <PlayCircle className="h-4 w-4 mr-1" /> Complete Level
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default JavaLearner;
