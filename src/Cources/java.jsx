"use client";

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronDown } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ concepts, isVisible, onToggle, onTopicClick }) => {
  const navigate = useNavigate();

  const [activeTopic, setActiveTopic] = useState(null); // To track which topic is expanded

  const toggleSubtopic = (id) => {
    // Toggle the visibility of subtopics for a given main concept
    setActiveTopic((prev) => (prev === id ? null : id));
  };

  const handleTopicClick = (id) => {
    toggleSubtopic(id);
    onTopicClick(id);
  };

  //sidebar
  return (
    <div className={`bg-black bg-opacity-30 text-white w-64 h-full fixed left-0 top-[4rem] p-4 transition-transform ${isVisible ? 'translate-x-0' : '-translate-x-full'} z-50`}>
      <h2 className="bg-purple-900 bg-opacity-30 p-2 text-xl font-bold mb-4 border border-white/10 rounded-[0.5rem]">Java Concepts</h2>
      <ul>
        {concepts.map((concept) => (
          <li key={concept.id} className="mb-4">
            {/* Main concept title */}
            <div
              onClick={() => handleTopicClick(concept.id)}
              className="cursor-pointer flex items-center justify-between p-2 rounded transition-transform duration-300 hover:bg-black hover:bg-opacity-20 hover:text-white hover:scale-105 hover:shadow-[0_0_10px_#00ff00, 0_0_20px_#00ff00, 0_0_30px_#00ff00]"
            >
              <span className='text-purple-500 hover:text-purple-400'>{concept.title}</span>
              <span className="ml-2 text-xl text-purple-700 ">
                {activeTopic === concept.id ? (
                  <FontAwesomeIcon icon={faCircleChevronDown} style={{ transform: 'rotate(180deg)' }} />
                ) : (
                  <FontAwesomeIcon icon={faCircleChevronDown} />
                )}
              </span> {/* Toggle icon */}
            </div>

            {/* Subtopics dropdown */}
            {activeTopic === concept.id && (
              <ul className="ml-4 mt-2">
                {concept.subtopics.map((subtopic) => (
                  <li key={subtopic.id} className="mb-2">
                    <div
                      onClick={(e) => {
                        e.preventDefault();
                        onToggle(); // Hide sidebar on link click
                        navigate(subtopic.path); // Navigate to the selected subtopic
                      }}
                      className="block p-2 rounded transition-transform duration-300 hover:bg-black hover:bg-opacity-20 hover:text-white hover:scale-105 hover:shadow-[0_0_10px_#00ff00, 0_0_20px_#00ff00, 0_0_30px_#00ff00] cursor-pointer"
                    >
                      <span className='text-purple-500'>{subtopic.title}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      <button
        onClick={onToggle}
        className="mt-4 w-full text-center py-2 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold transition-transform duration-300 hover:scale-105 hover:shadow-lg"
      >
        Hide Sidebar
      </button>
    </div>
  );
};
//main content
const JavaLearning = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState(1); // Set initial topic to the first one

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const handleTopicClick = (id) => {
    setSelectedTopic(id); // Set the selected topic
  };
  //concepts script
  const javaConcepts = [
    {
      id: 1,
      title: "Beginner (Introduction to Coding)",
      mission: "Awaken the Coder",
      script: "Welcome, young coder! The digital realm is in chaos, and only you can restore balance. Your first task is simple—print 'Hello, World!' and step into the world of programming.",
      subtopics: [
        { id: 1.1, title: "Printing Output", path: "/java/beginner/printing-output", mission: "First Words", script: "Every great journey begins with a single word. Print 'Hello, World!' to take your first step.", icon: "https://img.icons8.com/color/96/000000/print.png" },
        { id: 1.2, title: "Basic Syntax", path: "/java/beginner/basic-syntax", mission: "Cracking the Code", script: "A true coder understands the language. Learn the basic syntax to write correct code.", icon: "https://img.icons8.com/color/96/000000/code.png" }
      ],
    },
    {
      id: 2,
      title: "Variables & Data Types",
      mission: "Unlock the Secrets",
      script: "You've discovered an ancient artifact filled with encrypted messages. To unlock its secrets, you must store and manipulate data correctly.",
      subtopics: [
        { id: 2.1, title: "Declaring Variables", path: "/java/Variables/variables", mission: "The Storage Vault", script: "Data must be stored before it can be used. Learn to declare variables.", icon: "https://img.icons8.com/color/96/000000/database.png" },
        { id: 2.2, title: "Data Types", path: "/java/beginner/data-types", mission: "Know Your Elements", script: "Each piece of data has a type. Understand the different data types to use them effectively.", icon: "https://img.icons8.com/color/96/000000/bulleted-list.png" },
        { id: 2.3, title: "Type Casting", path: "/java/beginner/type-casting", mission: "Shape Shifter", script: "Data is flexible. Learn how to transform one type into another.", icon: "https://img.icons8.com/color/96/000000/exchange.png" }
      ],
    },
    {
      id: 3,
      title: "Conditional Statements",
      mission: "Choose Your Path",
      script: "You arrive at the Gates of Decision, where every choice determines your fate. Write a program that decides whether you enter the gates or turn back.",
      subtopics: [
        { id: 3.1, title: "If-Else Statements", path: "/coding/conditions/if-else", mission: "The Forked Road", script: "Every decision matters. Use if-else to guide the program's choices.", icon: "https://img.icons8.com/color/96/000000/split.png" },
        { id: 3.2, title: "Switch Statements", path: "/coding/conditions/switch", mission: "The Control Panel", script: "When multiple choices appear, a switch statement helps navigate them efficiently.", icon: "https://img.icons8.com/color/96/000000/toggle-off.png" }
      ],
    },
    {
      id: 4,
      title: "Loops & Iteration",
      mission: "Master the Loops",
      script: "The Tower of Knowledge awaits, but its steps are infinite. Use loops to climb the staircase without getting lost.",
      subtopics: [
        { id: 4.1, title: "For Loops", path: "/coding/loops/for-loop", mission: "Counting Steps", script: "Repeat a task efficiently by mastering the for loop.", icon: "https://img.icons8.com/color/96/000000/refresh.png" },
        { id: 4.2, title: "While Loops", path: "/coding/loops/while-loop", mission: "Endless Journey", script: "Sometimes the destination is unknown. Use while loops for uncertain conditions.", icon: "https://img.icons8.com/color/96/000000/infinity.png" }
      ],
    },
    {
      id: 5,
      title: "Functions & Modular Code",
      mission: "Weave the Spells",
      script: "To cast the most powerful spell, you must write a function that performs a magical transformation.",
      subtopics: [
        { id: 5.1, title: "Defining Functions", path: "/coding/functions/defining", mission: "The Magic Formula", script: "Functions create reusable magic. Define your own to simplify tasks.", icon: "https://img.icons8.com/color/96/000000/stars.png" },
        { id: 5.2, title: "Function Parameters", path: "/coding/functions/parameters", mission: "Spell Components", script: "A function's power depends on its inputs. Learn how to pass parameters effectively.", icon: "https://img.icons8.com/color/96/000000/test-tube.png" }
      ],
    },
    {
      id: 6,
      title: "Arrays & Lists",
      mission: "Find the Patterns",
      script: "The ancient scrolls are hidden in an unordered list. Sort them correctly to reveal their secrets.",
      subtopics: [
        { id: 6.1, title: "Array Basics", path: "/coding/arrays/basics", mission: "Organized Storage", script: "Store multiple values in a structured way with arrays.", icon: "https://img.icons8.com/color/96/000000/data-sheet.png" },
        { id: 6.2, title: "Sorting Arrays", path: "/coding/arrays/sorting", mission: "Arrange the Chaos", script: "Learn how to sort arrays for better organization.", icon: "https://img.icons8.com/color/96/000000/sorting-arrows.png" }
      ],
    },
    {
      id: 7,
      title: "Object-Oriented Programming (OOP)",
      mission: "Forge Your Identity",
      script: "You must define yourself as a true coder. Create a class to represent a player in the game.",
      subtopics: [
        {
          id: 7.1,
          title: "Classes & Objects",
          path: "/java/oops/oopd",
          mission: "Blueprints of Creation",
          script: "Learn how to create and use classes and objects.",
          icon: "https://img.icons8.com/color/96/000000/class.png"
        },
        {
          id: 7.2,
          title: "Inheritance",
          path: "/Java/OOPS/inheritance",
          mission: "Passing the Legacy",
          script: "The ancient kingdom of OOP has powerful rulers who pass their knowledge through generations. To become a true coder, you must inherit their wisdom and extend their power.",
          icon: "https://img.icons8.com/color/96/000000/genealogy.png"
        },
        {
          id: 7.3,
          title: "Encapsulation",
          path: "/Java/OOPS/encapsulation",
          mission: "The Secret Vault",
          script: "In the world of coding, knowledge is power, but security is key. Protect your data with encapsulation, just as a vault protects treasures.",
          icon: "https://img.icons8.com/color/96/000000/lock.png"
        }
      ],
    },
    {
      id: 9,
      title: "Collections",
      mission: "Organize the Chaos",
      script: "Scattered across the digital world are countless treasures—numbers, names, and objects. Use collections to gather, organize, and retrieve them efficiently.",
      subtopics: [
        {
          id: 9.1,
          title: "Lists & Arrays",
          path: "/Java/Collections/array",
          mission: "The Treasure Chest",
          script: "Store and retrieve multiple values efficiently using lists and arrays.",
          icon: "https://img.icons8.com/color/96/000000/box.png"
        },
        {
          id: 9.2,
          title: "HashMaps",
          path: "/Java/Collections/hashmaps",
          mission: "The Secret Index",
          script: "Quickly find what you need using key-value pairs stored in HashMaps.",
          icon: "https://img.icons8.com/color/96/000000/list.png"
        }
      ],
    }
  ];



  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950 text-white overflow-hidden relative pt-16">
      <Sidebar concepts={javaConcepts} isVisible={isSidebarVisible} onToggle={toggleSidebar} onTopicClick={handleTopicClick} />

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
              Playing Games While Learning Java
            </h1>
            <p className="text-xl text-purple-200">
              Master Java concepts through interactive games and challenges
            </p>
          </div>

          {/* Render subtopics as cards for the selected topic */}
          {selectedTopic && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {javaConcepts.find(concept => concept.id === selectedTopic).subtopics.map(subtopic => (
                <Link
                  key={subtopic.id}
                  to={subtopic.path}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]"
                >
                  <div className="flex items-center justify-center mb-6">
                    <img
                      src={subtopic.icon} // You can modify image per subtopic
                      alt={subtopic.title}
                      className="w-20 h-20 object-contain"
                    />
                  </div>
                  <h3 className="text-3xl font-semibold text-white mb-2">
                    {subtopic.title}
                  </h3>
                  <p className="text-white mb-1 text-xl font-bold">
                    {subtopic.mission}
                  </p>
                  <p className="text-purple-200">
                    {subtopic.script}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JavaLearning;
