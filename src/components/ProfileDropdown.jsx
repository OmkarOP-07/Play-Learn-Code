import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProfileDropdown = ({ user }) => {
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = () => {
    logout();
    setIsOpen(false);
  };

  // Get initials from email for the avatar
  const getInitials = (email) => {
    return email.split('@')[0].charAt(0).toUpperCase();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center focus:outline-none group"
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex items-center justify-center text-lg font-semibold shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-500/50 transition-all duration-300 group-hover:-translate-y-0.5">
          {getInitials(user.email)}
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white/10 backdrop-blur-lg border border-white/10 shadow-lg overflow-hidden">
          <div className="px-4 py-3 border-b border-white/10">
            <p className="text-sm text-white">{user.email}</p>
          </div>
          <div className="py-1">
            <Link
              to="/profile"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-sm text-purple-100 hover:text-white hover:bg-white/10 transition-colors duration-200"
            >
              Your Profile
            </Link>
            <Link
              to="/settings"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-sm text-purple-100 hover:text-white hover:bg-white/10 transition-colors duration-200"
            >
              Settings
            </Link>
            <button
              onClick={handleSignOut}
              className="block w-full text-left px-4 py-2 text-sm text-purple-100 hover:text-white hover:bg-white/10 transition-colors duration-200"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown; 