// src/components/Navbar.jsx
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProfileDropdown from './ProfileDropdown';

const Navbar = () => {
  const { currentUser } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-transparent ${scrolled ? 'border-b border-white/10 backdrop-blur-lg shadow-lg neon-glow' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200 group-hover:from-purple-200 group-hover:to-white transition-all duration-300">
                CodeQuest
              </span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link 
              to="/" 
              className="px-3 py-2 rounded-md text-sm font-medium text-white hover:text-purple-200 transition-colors duration-200"
            >
              Home
            </Link>
            <Link 
              to="/learn" 
              className="px-3 py-2 rounded-md text-sm font-medium text-white hover:text-purple-200 transition-colors duration-200"
            >
              Learn
            </Link>
            <Link 
              to="/leaderboard" 
              className="px-3 py-2 rounded-md text-sm font-medium text-white hover:text-purple-200 transition-colors duration-200"
            >
              Certification
            </Link>
            {currentUser ? (
              <ProfileDropdown user={currentUser} />
            ) : (
              <div className="flex items-center space-x-3">
                <Link 
                  to="/login" 
                  className="px-4 py-2 rounded-xl text-sm font-medium bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white transition-all duration-300 hover:-translate-y-0.5"
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="px-4 py-2 rounded-xl text-sm font-medium bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300 hover:-translate-y-0.5"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;