import React, { useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const AGENT_ID = "89cc1a6f-41c3-414f-b48f-a33bac0952ac";
const DF_SCRIPT = "https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1";

const ChatbotPage = () => {
  const { currentUser } = useAuth();
  const dfRef = useRef(null);

  /* Load Dialogflow script once, then open the chat */
  useEffect(() => {
    if (!currentUser) return;

    const openChat = () => {
      // Give the messenger a moment to mount, then programmatically open it
      setTimeout(() => {
        const dfEl = dfRef.current;
        if (!dfEl) return;
        // Open the chat window via the public API
        if (typeof dfEl.renderCustomText === "function") {
          // trigger an open if possible
        }
        // The messenger auto-opens because of the intent="WELCOME" + no wait-open
      }, 400);
    };

    if (!document.querySelector(`script[src="${DF_SCRIPT}"]`)) {
      const sc = document.createElement("script");
      sc.src = DF_SCRIPT;
      sc.async = true;
      sc.onload = openChat;
      document.head.appendChild(sc);
    } else {
      openChat();
    }
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950 text-white flex items-center justify-center">
        <div className="text-center bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-12 max-w-md mx-4">
          <div className="text-6xl mb-6">🤖</div>
          <h1 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
            Login Required
          </h1>
          <p className="text-purple-100 mb-8">
            Sign in to chat with your AI coding assistant
          </p>
          <Link
            to="/login"
            className="inline-block px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl font-bold text-lg shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all hover:-translate-y-1"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950 text-white overflow-hidden relative">
      {/* Glowing orb effects (same as Home) */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute -bottom-32 -left-20 w-96 h-96 bg-indigo-500 rounded-full filter blur-3xl opacity-20 animate-pulse" />

      {/* Chatbot page-specific styles */}
      <style>{`
        /* On the chatbot page, expand and reposition the floating widget */
        .chatbot-page-wrapper df-messenger {
          --df-messenger-bot-message: rgba(79, 70, 229, 0.35) !important;
          --df-messenger-user-message: rgba(109, 40, 217, 0.75) !important;
          --df-messenger-chat-background-color: transparent !important;
          --df-messenger-font-color: #f3e8ff !important;
          --df-messenger-send-icon: #a78bfa !important;
          --df-messenger-button-titlebar-color: #4f46e5 !important;
          --df-messenger-chat-window-width: 100% !important;
          --df-messenger-chat-window-height: 100% !important;
          position: absolute !important;
          inset: 0 !important;
          width: 100% !important;
          height: 100% !important;
          display: block !important;
          z-index: 1 !important;
        }
      `}</style>

      <div className="container mx-auto px-4 py-8 relative z-10 mt-14 h-full">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link
            to="/"
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 border border-white/10 hover:bg-white/20 transition-all text-white font-bold"
          >
            ←
          </Link>
          <div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
              🤖 CodeQuest AI Assistant
            </h1>
            <p className="text-purple-300 text-sm">
              Ask me anything about Java, OOP, data structures, or debugging!
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2 bg-white/10 border border-white/10 rounded-lg px-3 py-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_6px_#34d399]" />
            <span className="text-green-300 text-sm font-medium">Online</span>
          </div>
        </div>

        {/* Chat Container */}
        <div
          className="chatbot-page-wrapper bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-indigo-950/50"
          style={{ height: "calc(100dvh - 230px)", minHeight: 450, position: "relative" }}
        >
          {/* Top bar inside the card */}
          <div className="flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-indigo-500/20 to-purple-600/20 border-b border-white/10 relative z-10">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-sm">
              🤖
            </div>
            <div>
              <p className="font-semibold text-sm text-white">CodeQuest Assistant</p>
              <p className="text-purple-300 text-xs">
                Hi {currentUser.username || currentUser.email?.split("@")[0]}! How can I help you today?
              </p>
            </div>
          </div>

          {/* df-messenger rendered here — expand auto-opens the window */}
          <div style={{ position: "relative", height: "calc(100% - 56px)" }}>
            <df-messenger
              ref={dfRef}
              intent="WELCOME"
              chat-title="CodeQuestAssistant"
              agent-id={AGENT_ID}
              language-code="en"
              expand
            />
          </div>
        </div>

        {/* Suggestion chips */}
        <div className="mt-4 flex flex-wrap gap-2">
          {[
            "Explain recursion in Java",
            "What is OOP?",
            "Debug a NullPointerException",
            "Java loops quiz",
          ].map((chip) => (
            <button
              key={chip}
              className="px-4 py-2 text-sm bg-white/10 hover:bg-white/20 border border-white/10 hover:border-purple-400/50 rounded-full text-purple-100 transition-all hover:-translate-y-0.5"
              onClick={() => {
                const dfEl = dfRef.current;
                if (dfEl && typeof dfEl.sendQuery === "function") {
                  dfEl.sendQuery(chip);
                }
              }}
            >
              {chip}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;
