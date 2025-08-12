import React, { useState, useRef, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Ai from "./Ai";
import chatbotImage from "../assets/images/chatbot.jpeg";
import Navbar from "./Navbar";

const Layout = () => {
  const [isAiVisible, setAiVisible] = useState(false);
  const aiRef = useRef(null);
  const toggleButtonRef = useRef(null); // Ref for the toggle button

  const toggleAi = () => {
    setAiVisible(!isAiVisible);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Ignore clicks on the toggle button itself
      if (
        toggleButtonRef.current &&
        toggleButtonRef.current.contains(event.target)
      ) {
        return;
      }
      // Close the AI window if the click is outside of it
      if (aiRef.current && !aiRef.current.contains(event.target)) {
        setAiVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); // Empty dependency array ensures this runs only once on mount and cleanup on unmount

  return (
    <div className="min-h-screen m-0 p-0">
      <Navbar />
      <div>
        <Outlet />
      </div>
      {/* Accessible Chatbot Toggle Button */}
      <button
        ref={toggleButtonRef}
        type="button"
        aria-label={isAiVisible ? "Close chat" : "Open chat"}
        onClick={toggleAi}
        className="chatbot-icon"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          backgroundImage: `url(${chatbotImage})`,
          backgroundSize: "cover",
          cursor: "pointer",
          border: "none",
          padding: 0,
          zIndex: 50,
          transition: "transform 0.3s ease",
        }}
      />
      {/* Fixed Position AI Component */}
      {isAiVisible && (
        <div className="fixed bottom-5 right-5 z-[9999] max-w-md max-h-screen">
          <div className="relative">
            <Ai onClose={() => setAiVisible(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
