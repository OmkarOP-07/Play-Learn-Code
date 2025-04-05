"use client";

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Ai from '../components/Ai';

const Sidebar = ({ concepts, isVisible, onToggle }) => {
  const navigate = useNavigate();

  return (
    <div className={`bg-black bg-opacity-30 text-white w-64 h-full absolute left-0  p-4 transition-transform ${isVisible ? 'translate-x-0' : '-translate-x-full'} z-50`}>
      <h2 className="bg-purple-900 bg-opacity-30 p-2 text-xl font-bold mb-4 border border-white/10 rounded-[0.5rem]">Python  Concepts</h2>
      <ul>
        {concepts.map((concept) => (
          <li key={concept.id} className="mb-2">
            <div
              onClick={(e) => {
                e.preventDefault();
                onToggle(); // Hide sidebar on link click
                navigate(concept.path); // Navigate to the selected concept
              }}
              className="block p-2 rounded hover:bg-gray-700 transition cursor-pointer"
            >
              {concept.topic}
            </div>
          </li>
        ))}
      </ul>
      <button
        onClick={onToggle}
        className="mt-4 text-red-500 w-full text-center py-2 bg-gray-700 rounded"
      >
        Hide Sidebar
      </button>
    </div>
  );
};

const PyhtonLearning = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };
  const pythonConcepts = [
    {
      id: 1,
      title: "Python's Fancy Closet: The Outfit Challenge",
      description: "Learn Python syntax by categorizing clothing items into different data types (variables).",
      topic: "Python Syntax",
      image: "https://img.icons8.com/color/96/000000/code.png",
      path: "/python/syntax"
    },
    {
      id: 2,
      title: "Loops: The Never-Ending Loop Party",
      description: "Master loops (`for` and `while`) by managing a never-ending dance party.",
      topic: "Loops",
      image: "https://img.icons8.com/color/96/000000/variable.png",
      path: "/python/variables"
    },
    {
      id: 3,
      title: "If/Else Statements: Python's Decision-Making Robot",
      description: "Help a robot make decisions using if-else statements based on different conditions.",
      topic: "Conditionals",
      image: "https://img.icons8.com/color/96/000000/control-panel.png",
      path: "/python/control-structures"
    },
    {
      id: 4,
      title: "Arrays & Collections: Python's Grocery Shopping",
      description: "Learn to work with arrays, lists, and collections while shopping for groceries.",
      topic: "Data Structures",
      image: "https://img.icons8.com/fluency/96/array.png",
      path: "/python/array"
    },
    {
      id: 5,
      title: "Object-Oriented Programming: Python's Superhero Squad",
      description: "Build superhero characters with classes, inheritance, and polymorphism.",
      topic: "OOP (Object-Oriented Programming)",
      image: "https://img.icons8.com/color/96/000000/class.png",
      path: "/python/oop"
    },
    {
      id: 6,
      title: "Exception Handling: Python's Klutzy Clown",
      description: "Catch and handle errors with `try`, `except`, and `finally` like a clown juggling mistakes.",
      topic: "Error Handling",
      image: "https://img.icons8.com/color/96/000000/error.png",
      path: "/python/exceptions"
    },
    {
      id: 7,
      title: "Inheritance and Polymorphism: Python’s Villain Conqueror",
      description: "Use inheritance and polymorphism to create characters that fight villains.",
      topic: "OOP - Inheritance & Polymorphism",
      image: "https://img.icons8.com/color/96/000000/file.png",
      path: "/python/inheritance"
    },
    {
      id: 8,
      title: "Encapsulation: Python’s Spy Mission",
      description: "Protect secret data with encapsulation while completing spy missions.",
      topic: "OOP - Encapsulation",
      image: "https://img.icons8.com/fluency/96/thread.png",
      path: "/python/encapsulation"
    },
    {
      id: 9,
      title: "File Handling: Python's Secret Agent Mission",
      description: "Learn to read, write, and manipulate files during your secret agent mission.",
      topic: "File Handling",
      image: "https://img.icons8.com/color/96/000000/lambda.png",
      path: "/python/filehandling"
    },
    {
      id: 10,
      title: "Collection Framework: Python’s Puzzle Solver",
      description: "Solve puzzles using collections like sets and dictionaries to organize data.",
      topic: "Collections",
      image: "https://img.icons8.com/fluency/96/pattern.png",
      path: "/python/collection"
    },
    {
      id: 11,
      title: "Decorators: Python’s Fashion Show",
      description: "Enhance functions dynamically using decorators to add new abilities.",
      topic: "Decorators",
      image: "https://img.icons8.com/fluency/96/fashion.png",
      path: "/python/decorators"
    },
    {
      id: 12,
      title: "Recursion: Python’s Infinite Tower",
      description: "Climb an infinite tower using recursion to solve problems step by step.",
      topic: "Recursion",
      image: "https://img.icons8.com/fluency/96/recursive.png",
      path: "/python/recursion"
    },
    {
      id: 13,
      title: "Regular Expressions: Python’s Detective Adventure",
      description: "Use regular expressions to find hidden clues and patterns in messy text.",
      topic: "Regular Expressions",
      image: "https://img.icons8.com/fluency/96/detective.png",
      path: "/python/regex"
    },
    {
      id: 14,
      title: "Sorting Algorithms: Python’s Cooking Showdown",
      description: "Compete to sort ingredients with different sorting algorithms (e.g., Bubble Sort).",
      topic: "Sorting Algorithms",
      image: "https://img.icons8.com/fluency/96/cook.png",
      path: "/python/sorting"
    }
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950 text-white overflow-hidden relative">
      <Sidebar concepts={pythonConcepts} isVisible={isSidebarVisible} onToggle={toggleSidebar} />
      
      {/* Hamburger Icon */}
      {!isSidebarVisible && (
        <div className="fixed top-20 left-4 z-50 cursor-pointer bg-purple-900 p-3 rounded-[20%] bg-opacity-40 hover:bg-opacity-100 transition-all duration-300" onClick={toggleSidebar}>
          <img src="https://img.icons8.com/material-outlined/24/ffffff/menu-2.png" alt="Menu" />
        </div>
      )}

      {/* Animated code particles */}
      <div className="absolute inset-0 opacity-20 z-10">
        <div className="absolute top-1/4 left-1/4 animate-float-slow">
          <div className="text-3xl font-mono opacity-50">{"<div>"}</div>
        </div>
        <div className="absolute top-1/3 right-1/4 animate-float">
          <div className="text-2xl font-mono opacity-50">{"function() {"}</div>
        </div>
        <div className="absolute bottom-1/4 left-1/3 animate-float-slow">
          <div className="text-xl font-mono opacity-50">{"const code = 'fun';"}</div>
        </div>
        <div className="absolute top-2/3 right-1/3 animate-float">
          <div className="text-2xl font-mono opacity-50">{"}"}</div>
        </div>
        <div className="absolute bottom-1/3 left-1/5 animate-float">
          <div className="text-xl font-mono opacity-50">{"return <Magic />;"}</div>
        </div>
      </div>

      {/* Glowing orb effects */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-20 animate-pulse-slow z-0"></div>
      <div className="absolute -bottom-32 -left-20 w-96 h-96 bg-indigo-500 rounded-full filter blur-3xl opacity-20 animate-pulse-slow z-0"></div>

      <div className={`ml-64 transition-all ${isSidebarVisible ? 'ml-64' : 'ml-0'}`}>
        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200 mb-4">
                Playing Games While Learning Python
            </h1>
            <p className="text-xl text-purple-200">
              Master Python concepts through interactive games and challenges
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pythonConcepts.map((concept) => (
              <Link
                key={concept.id}
                to={concept.path}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]"
              >
                <div className="flex items-center justify-center mb-6">
                  <img
                    src={concept.image}
                    alt={concept.title}
                    className="w-20 h-20 object-contain"
                  />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3">
                  {concept.title}
                </h3>
                <p className="text-purple-200">
                  {concept.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PyhtonLearning;
