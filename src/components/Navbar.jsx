// src/components/Navbar.jsx
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useJavaPoints } from '../Java/JavaPointsContext';
import ProfileDropdown from './ProfileDropdown';
import { Trophy } from 'lucide-react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Navbar = () => {
  const { currentUser } = useAuth();
  const { points } = useJavaPoints();
  const [scrolled, setScrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    // Simulate loading time for a smoother transition
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  // Calculate percentage of course completed
  const totalPoints = 170; // Total points in the course
  const percentageCompleted = Math.round((points / totalPoints) * 100);
  const isCertificationEligible = percentageCompleted >= 80;

  if (loading) {
    return (  
      <div>
      <Skeleton className='p-0 m-0 animate-shimmer-diagonal' height={60} width="100%" baseColor="#3b0764" highlightColor="#9333ea" />
      </div>
    )
    }
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
              to="/CertGen" 
              className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1 ${
                isCertificationEligible 
                  ? 'text-white hover:text-purple-200' 
                  : 'text-gray-400 cursor-not-allowed'
              } transition-colors duration-200`}
              title={isCertificationEligible ? 'Get your certificate' : 'Complete 80% of the course to get a certificate'}
            >
              Certification
              {isCertificationEligible && <Trophy className="h-4 w-4 text-yellow-500" />}
            </Link>
            {loading ? (
              <div className="flex items-center gap-3">
                <Skeleton height={30} width={100} baseColor="#4f46e5" highlightColor="#7c3aed" />
                <Skeleton height={30} width={30} circle baseColor="#4f46e5" highlightColor="#7c3aed" />
              </div>
            ) : currentUser ? (
              <div className="flex items-center gap-3">
                <div className="bg-black/30 px-3 py-1 rounded-lg border border-white/10">
                  <span className="text-sm text-white">
                    <span className="font-bold">{points}</span> / {totalPoints} points
                  </span>
                </div>
                <ProfileDropdown user={currentUser} />
              </div>
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