import React, { useState, useRef, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Ai from './Ai';
import chatbotImage from '../assets/images/chatbot.jpeg'; // Import the chatbot image
import Navbar from './Navbar';
const Layout = () => {
  const [isAiVisible, setAiVisible] = useState(false);
  const aiRef = useRef(null);

  const toggleAi = () => {
    setAiVisible(!isAiVisible);
  };

  const handleClickOutside = (event) => {
    if (aiRef.current && !aiRef.current.contains(event.target)) {
      setAiVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen m-0 p-0 ">
      <Navbar />
      <div>
        <Outlet />
      </div>

      <div 
        className="chatbot-icon z-50" 
        onClick={toggleAi} 
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundImage: `url(${chatbotImage})`,
          backgroundSize: 'cover',
          cursor: 'pointer',
          transition: 'transform 0.3s ease',
        }}
      />

      {/* Sticky AI component */}
      {isAiVisible && (
        <div className="sticky-ai relative bottom-0" ref={aiRef} >
          <Ai onClose={() => setAiVisible(false)} />
        </div>
      )}
    </div>
  );
};

export default Layout; 