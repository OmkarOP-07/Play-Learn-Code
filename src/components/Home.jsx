import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import ProgressBar from './ProgressBar';

const Home = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950 text-white overflow-hidden relative">
      {/* Animated code particles */}
      <div className="absolute inset-0 opacity-20">
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
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-20 animate-pulse-slow"></div>
      <div className="absolute -bottom-32 -left-20 w-96 h-96 bg-indigo-500 rounded-full filter blur-3xl opacity-20 animate-pulse-slow"></div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Hero Section */}
        {location.pathname === '/' && (
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 min-h-[80vh] mt-2">
            <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
              {user ? (
                <>
                  <div className="inline-block mb-4 bg-gradient-to-r from-indigo-400 to-purple-500 p-1 rounded-lg">
                    <div className="bg-indigo-950/50 backdrop-blur-sm px-4 py-2 rounded">
                      <span className="text-sm font-medium">LOGGED IN AS</span>
                    </div>
                  </div>
                  <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
                    Welcome back, {user.displayName || 'Coder'}!
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 text-purple-100">
                    Continue your programming journey with interactive challenges
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <Link to="/learn" className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl font-bold text-lg shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all hover:-translate-y-1">
                      Resume Learning
                    </Link>
                    <Link to="/profile" className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl font-bold text-lg hover:bg-white/20 transition-all">
                      View Progress
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <div className="inline-block mb-4 bg-gradient-to-r from-indigo-400 to-purple-500 p-1 rounded-lg">
                    <div className="bg-indigo-950/50 backdrop-blur-sm px-4 py-2 rounded">
                      <span className="text-sm font-medium">INTERACTIVE LEARNING</span>
                    </div>
                  </div>
                  <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
                    Learn Programming in a Fun Way
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 text-purple-100">
                    Master programming through interactive challenges and gamified learning
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <Link to="/signup" className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl font-bold text-lg shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all hover:-translate-y-1">
                      Get Started
                    </Link>
                    <Link to="/learn" className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl font-bold text-lg hover:bg-white/20 transition-all">
                      Explore Courses
                    </Link>
                  </div>
                </>
              )}
            </div>

            {/* 3D Code Editor Illustration */}
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-lg aspect-square">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl transform rotate-6 scale-95 opacity-20 blur-xl animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl transform -rotate-3 scale-90 opacity-20 blur-xl animate-pulse-slow"></div>
                <div className="relative h-full w-full bg-gradient-to-br from-gray-900 to-indigo-950 rounded-2xl p-6 border border-indigo-500/30 shadow-xl overflow-hidden">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    <div className="ml-4 text-xs text-gray-400 font-mono">CodePlayground.js</div>
                  </div>
                  <div className="space-y-2 font-mono text-sm">
                    <div className="flex">
                      <span className="text-gray-500 w-8">1</span>
                      <span className="text-purple-400">function</span>
                      <span className="text-white"> learnCoding</span>
                      <span className="text-indigo-300">()</span>
                      <span className="text-white"> {`{`}</span>
                    </div>
                    <div className="flex">
                      <span className="text-gray-500 w-8">2</span>
                      <span className="text-white pl-6">const </span>
                      <span className="text-green-400">skills</span>
                      <span className="text-white"> = </span>
                      <span className="text-yellow-300">[</span>
                      <span className="text-orange-300">'JavaScript'</span>
                      <span className="text-yellow-300">,</span>
                      <span className="text-orange-300"> 'Python'</span>
                      <span className="text-yellow-300">,</span>
                      <span className="text-orange-300"> 'Java'</span>
                      <span className="text-yellow-300">]</span>
                      <span className="text-white">;</span>
                    </div>
                    <div className="flex">
                      <span className="text-gray-500 w-8">3</span>
                      <span className="text-white pl-6"></span>
                    </div>
                    <div className="flex">
                      <span className="text-gray-500 w-8">4</span>
                      <span className="text-white pl-6">const </span>
                      <span className="text-green-400">fun</span>
                      <span className="text-white"> = </span>
                      <span className="text-indigo-300">true</span>
                      <span className="text-white">;</span>
                    </div>
                    <div className="flex">
                      <span className="text-gray-500 w-8">5</span>
                      <span className="text-white pl-6">const </span>
                      <span className="text-green-400">learning</span>
                      <span className="text-white"> = </span>
                      <span className="text-indigo-300">interactive</span>
                      <span className="text-white">;</span>
                    </div>
                    <div className="flex">
                      <span className="text-gray-500 w-8">6</span>
                      <span className="text-white pl-6"></span>
                    </div>
                    <div className="flex">
                      <span className="text-gray-500 w-8">7</span>
                      <span className="text-purple-400 pl-6">return</span>
                      <span className="text-white"> {`{`}</span>
                      <span className="text-green-400"> skills</span>
                      <span className="text-white">,</span>
                      <span className="text-green-400"> fun</span>
                      <span className="text-white">,</span>
                      <span className="text-green-400"> learning </span>
                      <span className="text-white">{`}`};</span>
                    </div>
                    <div className="flex">
                      <span className="text-gray-500 w-8">8</span>
                      <span className="text-white">{`}`}</span>
                    </div>
                    <div className="flex">
                      <span className="text-gray-500 w-8">9</span>
                    </div>
                    <div className="flex">
                      <span className="text-gray-500 w-8">10</span>
                      <span className="text-purple-400">const</span>
                      <span className="text-white"> result = learnCoding();</span>
                    </div>
                    <div className="flex">
                      <span className="text-gray-500 w-8">11</span>
                      <span className="text-indigo-300">console</span>
                      <span className="text-white">.</span>
                      <span className="text-indigo-300">log</span>
                      <span className="text-white">(result);</span>
                    </div>
                    <div className="flex mt-4 items-center">
                      <span className="text-gray-500 w-8">{'>'}</span>
                      <span className="text-white bg-green-500/20 px-2 py-1 rounded animate-pulse">
                        Ready to code...
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Features Section */}
        <div className="mt-16 bg-white/5 backdrop-blur-lg rounded-2xl p-8">
          <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
            Why Choose CodeQuest?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 transition-all duration-300 hover:-translate-y-1">
              <div className="text-4xl mb-4 transform transition-transform duration-300 hover:scale-110">🎮</div>
              <h3 className="text-xl font-semibold mb-2 text-white">Gamified Learning</h3>
              <p className="text-purple-100">
                Learn through interactive challenges and earn points as you progress
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 transition-all duration-300 hover:-translate-y-1">
              <div className="text-4xl mb-4 transform transition-transform duration-300 hover:scale-110">🏆</div>
              <h3 className="text-xl font-semibold mb-2 text-white">Achievement System</h3>
              <p className="text-purple-100">
                Unlock badges and climb the leaderboard as you master Java concepts
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 transition-all duration-300 hover:-translate-y-1">
              <div className="text-4xl mb-4 transform transition-transform duration-300 hover:scale-110">📚</div>
              <h3 className="text-xl font-semibold mb-2 text-white">Structured Learning</h3>
              <p className="text-purple-100">
                Follow a carefully designed curriculum from basics to advanced topics
              </p>
            </div>
          </div>
        </div>

        {/* Programming Languages Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
            Choose Your Programming Language
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Java Card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 transition-all duration-300 hover:-translate-y-1">
              <div className="relative h-32 bg-gradient-to-r from-blue-500 to-blue-600">
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                  <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110">
                    <img 
                      src="https://cdn-icons-png.flaticon.com/512/226/226777.png" 
                      alt="Java Logo" 
                      className="w-24 h-24"
                    />
                  </div>
                </div>
              </div>
              <div className="pt-16 pb-6 px-6 text-center">
                <h3 className="text-2xl font-bold mb-4 text-white">Java</h3>
                <p className="text-purple-100 mb-6">
                  Master object-oriented programming with Java. Perfect for enterprise applications and Android development.
                </p>
                <Link to="/learn" className="inline-block px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl font-bold text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all hover:-translate-y-1">
                  Start Learning
                </Link>
              </div>
            </div>

            {/* C++ Card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 transition-all duration-300 hover:-translate-y-1">
              <div className="relative h-32 bg-gradient-to-r from-blue-700 to-blue-800">
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                  <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110">
                    <img 
                      src="https://cdn-icons-png.flaticon.com/512/6132/6132222.png" 
                      alt="C++ Logo" 
                      className="w-24 h-24"
                    />
                  </div>
                </div>
              </div>
              <div className="pt-16 pb-6 px-6 text-center">
                <h3 className="text-2xl font-bold mb-4 text-white">C++</h3>
                <p className="text-purple-100 mb-6">
                  Learn system programming and game development with C++. Ideal for performance-critical applications.
                </p>
                <Link to="/learn/cpp" className="inline-block px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl font-bold text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all hover:-translate-y-1">
                  Start Learning
                </Link>
              </div>
            </div>

            {/* Python Card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 transition-all duration-300 hover:-translate-y-1">
              <div className="relative h-32 bg-gradient-to-r from-yellow-400 to-yellow-500">
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                  <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110">
                    <img 
                      src="https://cdn-icons-png.flaticon.com/512/5968/5968350.png" 
                      alt="Python Logo" 
                      className="w-24 h-24"
                    />
                  </div>
                </div>
              </div>
              <div className="pt-16 pb-6 px-6 text-center">
                <h3 className="text-2xl font-bold mb-4 text-white">Python</h3>
                <p className="text-purple-100 mb-6">
                  Dive into data science and AI with Python. Perfect for beginners and versatile for various applications.
                </p>
                <Link to="/learn/python" className="inline-block px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl font-bold text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all hover:-translate-y-1">
                  Start Learning
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        {user && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
              Your Progress
            </h2>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10">
              <div className="flex flex-col md:flex-row">
                {/* Left side - Image */}
                <div className="md:w-1/4 bg-gradient-to-r from-indigo-500 to-purple-600 p-8 flex flex-col items-center justify-center">
                  <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110">
                    <img 
                      src="https://cdn-icons-png.flaticon.com/512/226/226777.png" 
                      alt="Java Logo" 
                      className="w-24 h-24"
                    />
                  </div>
                </div>

                {/* Middle - Content */}
                <div className="md:w-2/4 p-8">
                  <h3 className="text-2xl font-bold mb-4 text-white">Overall Progress</h3>
                  <p className="text-purple-100 mb-6">
                    Track your learning journey across all programming languages. Complete challenges, earn badges, and climb the leaderboard.
                  </p>
                  <div className="flex gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">12</div>
                      <div className="text-sm text-purple-200">Challenges Completed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">5</div>
                      <div className="text-sm text-purple-200">Badges Earned</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">#24</div>
                      <div className="text-sm text-purple-200">Leaderboard Rank</div>
                    </div>
                  </div>
                </div>

                {/* Right side - Progress */}
                <div className="md:w-1/4 bg-white/5 p-8 flex flex-col items-center justify-center">
                  <div className="flex flex-col items-center">
                    <ProgressBar progress={65} color="text-indigo-500" />
                    <p className="mt-2 text-sm text-purple-200">Overall Progress</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CTA Section */}
        {!user && (
          <div className="mt-16 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-12 border border-white/10">
              <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
                Ready to Start Your Coding Journey?
              </h2>
              <p className="text-xl text-purple-100 mb-8">
                Join thousands of learners who are mastering programming with CodeQuest
              </p>
              <Link to="/signup" className="inline-block px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl font-bold text-lg shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all hover:-translate-y-1">
                Create Your Account
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home; 