import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Variables() {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [draggedItem, setDraggedItem] = useState(null);
  const [completedItems, setCompletedItems] = useState([]);
  const [correctlyMatchedItems, setCorrectlyMatchedItems] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [wrongAttempt, setWrongAttempt] = useState(null);
  const [recentlyCompleted, setRecentlyCompleted] = useState(null);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);

  const questions = [
    {
      id: 1,
      type: "Primitive",
      category: "Integer Types",
      title: "byte",
      description: "8-bit integer (-128 to 127)",
      memorySize: "1 byte",
      defaultValue: "0",
      correctAnswer: "byte temperature = 23;",
      useCase: "Memory-sensitive number storage",
      hint: "Good for small whole numbers",
    },
    {
      id: 2,
      type: "Primitive",
      category: "Integer Types",
      title: "short",
      description: "16-bit integer (-32,768 to 32,767)",
      memorySize: "2 bytes",
      defaultValue: "0",
      correctAnswer: "short population = 12000;",
      useCase: "Small to medium range numbers",
      hint: "Used when int is too large",
    },
    {
      id: 3,
      type: "Primitive",
      category: "Integer Types",
      title: "int",
      description: "32-bit integer",
      memorySize: "4 bytes",
      defaultValue: "0",
      correctAnswer: "int count = 1000000;",
      useCase: "Most common integer type",
      hint: "Standard choice for whole numbers",
    },
    {
      id: 4,
      type: "Primitive",
      category: "Integer Types",
      title: "long",
      description: "64-bit integer",
      memorySize: "8 bytes",
      defaultValue: "0L",
      correctAnswer: "long population = 8000000000L;",
      useCase: "Very large numbers",
      hint: "For numbers beyond int range",
    },
    {
      id: 5,
      type: "Primitive",
      category: "Floating Point",
      title: "float",
      description: "32-bit floating point",
      memorySize: "4 bytes",
      defaultValue: "0.0f",
      correctAnswer: "float price = 19.99f;",
      useCase: "Decimal numbers (lower precision)",
      hint: "Use when memory is a concern",
    },
    {
      id: 6,
      type: "Primitive",
      category: "Floating Point",
      title: "double",
      description: "64-bit floating point",
      memorySize: "8 bytes",
      defaultValue: "0.0d",
      correctAnswer: "double pi = 3.14159265359;",
      useCase: "Precise decimal calculations",
      hint: "Standard choice for decimals",
    },
    {
      id: 7,
      type: "Primitive",
      category: "Other Primitives",
      title: "boolean",
      description: "True/false value",
      memorySize: "1 bit",
      defaultValue: "false",
      correctAnswer: "boolean isActive = true;",
      useCase: "Logical conditions",
      hint: "For yes/no decisions",
    },
    {
      id: 8,
      type: "Primitive",
      category: "Other Primitives",
      title: "char",
      description: "16-bit Unicode character",
      memorySize: "2 bytes",
      defaultValue: "\\u0000",
      correctAnswer: "char grade = 'A';",
      useCase: "Single character storage",
      hint: "For individual characters",
    },
    {
      id: 9,
      type: "Reference",
      category: "Object Types",
      title: "String",
      description: "Text sequence",
      memorySize: "Varies",
      defaultValue: "null",
      correctAnswer: 'String name = "John";',
      useCase: "Text handling",
      hint: "For text of any length",
    },
    {
      id: 10,
      type: "Reference",
      category: "Object Types",
      title: "Array",
      description: "Fixed-size collection",
      memorySize: "Varies",
      defaultValue: "null",
      correctAnswer: "int[] numbers = new int[5];",
      useCase: "Storing multiple values",
      hint: "For collections of same type",
    },
    {
      id: 11,
      type: "Reference",
      category: "Object Types",
      title: "Class",
      description: "Custom object type",
      memorySize: "Varies",
      defaultValue: "null",
      correctAnswer: "Student student = new Student();",
      useCase: "Complex data structures",
      hint: "For custom objects",
    },
    {
      id: 12,
      type: "Reference",
      category: "Object Types",
      title: "Interface",
      description: "Abstract type definition",
      memorySize: "N/A",
      defaultValue: "N/A",
      correctAnswer: "List<String> items;",
      useCase: "Defining contracts",
      hint: "For implementing contracts",
    },
  ];

  const shuffleAnswers = () => {
    const answers = questions.map((q) => q.correctAnswer);
    const shuffled = [...answers].sort(() => Math.random() - 0.5);
    setShuffledAnswers(shuffled);
  };

  useEffect(() => {
    shuffleAnswers();
  }, []);

  const handleDragStart = (item) => {
    setDraggedItem(item);
  };

  const handleDrop = (questionId) => {
    const question = questions.find((q) => q.id === questionId);
    if (
      question.correctAnswer === draggedItem &&
      !completedItems.includes(questionId)
    ) {
      setScore((prev) => prev + 1);
      setRecentlyCompleted(questionId);
      setShowSuccess(true);
      setCorrectlyMatchedItems((prev) => [...prev, draggedItem]);
      setCompletedItems((prev) => [...prev, questionId]);
      setTimeout(() => {
        setRecentlyCompleted(null);
        setShowSuccess(false);
      }, 1500);
    } else if (!completedItems.includes(questionId)) {
      setWrongAttempt(questionId);
      setShowError(true);
      setTimeout(() => {
        setWrongAttempt(null);
        setShowError(false);
      }, 2000);
    }
    setDraggedItem(null);
  };

  const resetGame = () => {
    setScore(0);
    setCompletedItems([]);
    setDraggedItem(null);
    setShowError(false);
    setWrongAttempt(null);
    shuffleAnswers();
  };

  const handleNext = () => {
    navigate('/java/control-structures');
  };

  const isGameComplete = completedItems.length === questions.length;

  return (
    <div className="min-h-screen bg-white p-4 md:p-8 mt-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-black mb-3 font-inter">
            Java Variables Game
          </h1>
          <p className="text-gray-600 text-base font-inter">
            Drag the correct variable declaration to its matching description
          </p>
          <div className="mt-3 bg-gray-100 rounded-lg p-3 shadow-md border border-gray-200">
            <div className="flex justify-center items-center gap-3">
              <p className="text-black text-base font-inter">
                Progress: {score} / {questions.length}
              </p>
              <div className="w-48 h-2 bg-gray-200 rounded-full">
                <div
                  className="h-full bg-black rounded-full transition-all duration-300"
                  style={{ width: `${(score / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>
            <button
              onClick={resetGame}
              className="mt-3 bg-black text-white px-4 py-2 text-base rounded-md hover:bg-gray-800 transition-colors font-inter border border-gray-300"
            >
              Reset Game
            </button>
          </div>
        </div>

        {isGameComplete ? (
          <div className="text-center py-8">
            <div className="bg-green-50 border border-green-200 rounded-lg p-8 shadow-md">
              <h2 className="text-3xl font-bold text-green-600 mb-4 font-inter">
                🎉 Congratulations! 🎉
              </h2>
              <p className="text-gray-700 text-lg mb-6 font-inter">
                You've completed all the variable type challenges!
              </p>
              <button
                onClick={handleNext}
                className="bg-green-500 text-white px-8 py-3 text-lg rounded-md hover:bg-green-600 transition-colors font-inter"
              >
                Next Level →
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6">
            {/* Questions Section - Left Side */}
            <div>
              <h2 className="text-xl font-bold text-black mb-3 font-inter">Variable Types</h2>
              <div className="grid grid-cols-2 gap-3">
                {questions.map((question) => (
                  !correctlyMatchedItems.includes(question.correctAnswer) && (
                    <div
                      key={question.id}
                      className={`bg-white rounded-lg p-3 shadow-md border ${
                        recentlyCompleted === question.id
                          ? "border-2 border-green-500 bg-green-50"
                          : wrongAttempt === question.id
                          ? "border-2 border-red-500 shake"
                          : "border-gray-200 hover:border-gray-400 hover:shadow-lg transition-all duration-300"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-black text-base font-inter">
                          {question.title}
                        </h3>
                        <span className="text-sm text-gray-600 font-inter">
                          {question.category}
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm mb-2 font-inter">
                        {question.description}
                      </p>
                      <div className="text-xs text-gray-600 mb-2 font-inter">
                        <p>Memory: {question.memorySize}</p>
                        <p>Default: {question.defaultValue}</p>
                        <p>Use: {question.useCase}</p>
                      </div>
                      <div
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                          e.preventDefault();
                          handleDrop(question.id);
                        }}
                        className={`h-12 border-2 border-dashed rounded-md flex items-center justify-center relative group ${
                          recentlyCompleted === question.id
                            ? "border-green-500 bg-green-50"
                            : wrongAttempt === question.id
                            ? "border-red-500 bg-red-50"
                            : "border-gray-300 hover:border-gray-500 hover:bg-gray-50"
                        }`}
                      >
                        {recentlyCompleted === question.id ? (
                          <span className="text-green-600 text-sm font-inter">✓ Correct!</span>
                        ) : wrongAttempt === question.id ? (
                          <span className="text-red-600 text-sm font-inter">✗ Try Again</span>
                        ) : (
                          <>
                            <span className="text-gray-600 text-sm font-inter">Drop here</span>
                            <div className="opacity-0 group-hover:opacity-100 absolute -top-8 bg-white text-black text-xs rounded p-2 transition-opacity border border-gray-200 shadow-md">
                              {question.hint}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>

            {/* Answers Section - Right Side */}
            <div>
              <h2 className="text-xl font-bold text-black mb-3 font-inter">Variable Declarations</h2>
              <div className="grid grid-cols-2 gap-3">
                {shuffledAnswers.map((answer, index) => (
                  !correctlyMatchedItems.includes(answer) && (
                    <div
                      key={index}
                      draggable={true}
                      onDragStart={() => handleDragStart(answer)}
                      className="bg-white rounded-lg p-3 shadow-md cursor-move border border-gray-200 hover:border-gray-400 hover:shadow-lg transition-all duration-300"
                    >
                      <code className="font-mono text-sm text-black">{answer}</code>
                    </div>
                  )
                ))}
              </div>
            </div>
          </div>
        )}

        {showSuccess && (
          <div className="fixed bottom-6 right-6 bg-green-500 text-white p-3 rounded-lg shadow-lg font-inter text-base animate-bounce">
            🎉 Correct match! Keep going!
          </div>
        )}

        {showError && (
          <div className="fixed bottom-6 right-6 bg-red-500 text-white p-3 rounded-lg shadow-lg font-inter text-base">
            ❌ Try again!
          </div>
        )}

        <style jsx global>{`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
          }
          .shake {
            animation: shake 0.5s ease-in-out;
          }
        `}</style>
      </div>
    </div>
  );
}

export default Variables; 