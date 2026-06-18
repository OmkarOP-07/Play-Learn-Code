import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const AGENT_ID = "89cc1a6f-41c3-414f-b48f-a33bac0952ac";
const DF_SCRIPT = "https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1";

const ChatbotPage = () => {
  const { currentUser } = useAuth();

  /* Load Dialogflow script once */
  useEffect(() => {
    if (!document.querySelector(`script[src="${DF_SCRIPT}"]`)) {
      const sc = document.createElement("script");
      sc.src = DF_SCRIPT;
      sc.async = true;
      document.head.appendChild(sc);
    }
  }, []);

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

      {/* Inline Dialogflow Messenger CSS overrides */}
      <style>{`
        df-messenger {
          --df-messenger-bot-message: rgba(79, 70, 229, 0.3);
          --df-messenger-user-message: rgba(109, 40, 217, 0.75);
          --df-messenger-chat-background-color: rgba(17, 12, 40, 0.0);
          --df-messenger-font-color: #f3e8ff;
          --df-messenger-send-icon: #a78bfa;
          --df-messenger-button-titlebar-color: #4f46e5;
          --df-messenger-chat-window-width: 100%;
          --df-messenger-chat-window-height: 100%;
          width: 100%;
          height: 100%;
          display: block;
          position: absolute;
          inset: 0;
        }
      `}</style>

      <div className="container mx-auto px-4 py-8 relative z-10 mt-14">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            to="/"
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 border border-white/10 hover:bg-white/20 transition-all"
          >
            ←
          </Link>
          <div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
              🤖 CodeQuest AI Assistant
            </h1>
            <p className="text-purple-300 text-sm">
              Powered by Dialogflow · Ask me anything about coding!
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2 bg-white/10 border border-white/10 rounded-lg px-3 py-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_6px_#34d399]" />
            <span className="text-green-300 text-sm font-medium">Online</span>
          </div>
        </div>

        {/* Chat Container */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-indigo-950/50"
          style={{ height: "calc(100dvh - 220px)", minHeight: 450, position: "relative" }}
        >
          {/* Top bar */}
          <div className="flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-indigo-500/20 to-purple-600/20 border-b border-white/10">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-sm">
              🤖
            </div>
            <div>
              <p className="font-semibold text-sm text-white">CodeQuest Assistant</p>
              <p className="text-purple-300 text-xs">
                Hi {currentUser.username || currentUser.email?.split("@")[0]}! I'm ready to help.
              </p>
            </div>
          </div>

          {/* Dialogflow Messenger — always-open via df-messenger-chat */}
          <div style={{ position: "relative", height: "calc(100% - 56px)" }}>
            <df-messenger
              intent="WELCOME"
              chat-title="CodeQuestAssistant"
              agent-id={AGENT_ID}
              language-code="en"
            >
              <df-messenger-chat chat-width="100%" chat-height="100%" />
            </df-messenger>
          </div>
        </div>

        {/* Suggestion chips below */}
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
                const dfEl = document.querySelector("df-messenger");
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
