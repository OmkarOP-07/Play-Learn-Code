import React, { useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { useLocation } from "react-router-dom";

const DialogflowChat = () => {
  const { currentUser } = useAuth();
  const location = useLocation();
  const injected = useRef(false);

  /* Don't load anything on the dedicated chatbot page */
  const isChatbotPage = location.pathname === "/chatbot";

  /* Drill into nested shadow DOMs and inject custom styles */
  const injectStyles = () => {
    const dfEl = document.querySelector("df-messenger");
    if (!dfEl || !dfEl.shadowRoot) return;

    const chatEl = dfEl.shadowRoot.querySelector("df-messenger-chat");
    if (!chatEl || !chatEl.shadowRoot) return;

    /* ── Chat window styles ── */
    if (!chatEl.shadowRoot.getElementById("df-chat-custom")) {
      const s = document.createElement("style");
      s.id = "df-chat-custom";
      s.textContent = `
        .chat-wrapper, .chat-window {
          width: 380px !important;
          max-width: 95vw !important;
          max-height: 480px !important;
          height: 480px !important;
          border-radius: 20px !important;
          background: rgba(17, 12, 40, 0.72) !important;
          backdrop-filter: blur(18px) !important;
          -webkit-backdrop-filter: blur(18px) !important;
          border: 1px solid rgba(124, 58, 237, 0.35) !important;
          box-shadow: 0 8px 40px rgba(109, 40, 217, 0.35) !important;
          overflow: hidden !important;
        }
        .chat-container {
          background: transparent !important;
        }
      `;
      chatEl.shadowRoot.appendChild(s);
    }

    /* ── Message list ── */
    const msgList = chatEl.shadowRoot.querySelector("df-messenger-message-list");
    if (msgList && msgList.shadowRoot && !msgList.shadowRoot.getElementById("df-msg-custom")) {
      const s = document.createElement("style");
      s.id = "df-msg-custom";
      s.textContent = `
        .message-list-wrapper, .messages-container {
          background: transparent !important;
        }
        .message-list {
          padding: 12px !important;
        }
      `;
      msgList.shadowRoot.appendChild(s);
    }

    /* ── User input — always re-inject (shadow re-renders on chat open) ── */
    const inputEl = chatEl.shadowRoot.querySelector("df-messenger-user-input");
    if (inputEl && inputEl.shadowRoot) {
      // Remove old style first so it's always fresh
      const old = inputEl.shadowRoot.getElementById("df-input-custom");
      if (old) old.remove();

      const s = document.createElement("style");
      s.id = "df-input-custom";
      s.textContent = `
        * {
          box-sizing: border-box;
        }
        :host {
          background: transparent !important;
        }
        .input-box-wrapper {
          background: rgba(20, 16, 50, 0.85) !important;
          border: 1.5px solid rgba(124, 58, 237, 0.55) !important;
          border-radius: 12px !important;
          margin: 8px !important;
          padding: 6px 10px !important;
          backdrop-filter: blur(8px) !important;
          display: flex !important;
          align-items: center !important;
        }
        .input-box-wrapper:focus-within {
          border-color: rgba(167, 139, 250, 0.8) !important;
          box-shadow: 0 0 0 2px rgba(124, 58, 237, 0.2) !important;
        }
        input, textarea, input[type="text"] {
          background: transparent !important;
          color: #f3e8ff !important;
          caret-color: #a78bfa !important;
          font-family: 'Inter', sans-serif !important;
          font-size: 14px !important;
          border: none !important;
          outline: none !important;
          box-shadow: none !important;
          -webkit-appearance: none !important;
          appearance: none !important;
          width: 100% !important;
        }
        input::placeholder, textarea::placeholder {
          color: #7c5cbf !important;
          opacity: 1 !important;
        }
        input:focus, textarea:focus,
        input:focus-visible, textarea:focus-visible,
        input:active, textarea:active {
          outline: none !important;
          border: none !important;
          box-shadow: none !important;
        }
        button[type="submit"], .send-icon-button, button {
          background: linear-gradient(135deg, #7c3aed, #4f46e5) !important;
          border-radius: 8px !important;
          border: none !important;
          outline: none !important;
          flex-shrink: 0 !important;
          width: 32px !important;
          height: 32px !important;
          min-width: 32px !important;
          min-height: 32px !important;
          max-width: 32px !important;
          max-height: 32px !important;
          padding: 0 !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          cursor: pointer !important;
          transition: opacity 0.2s ease !important;
        }
        button[type="submit"] svg, .send-icon-button svg, button svg,
        button[type="submit"] img, .send-icon-button img, button img {
          width: 24px !important;
          height: 24px !important;
          transform: scale(0.80) !important;
        }
        button:hover {
          opacity: 0.50 !important;
        }
        button:focus, button:focus-visible {
          outline: none !important;
          box-shadow: none !important;
        }
      `;
      inputEl.shadowRoot.appendChild(s);
    }

    /* ── Title bar ── */
    const titleBar = chatEl.shadowRoot.querySelector("df-messenger-titlebar");
    if (titleBar && titleBar.shadowRoot && !titleBar.shadowRoot.getElementById("df-title-custom")) {
      const s = document.createElement("style");
      s.id = "df-title-custom";
      s.textContent = `
        .titlebar {
          background: linear-gradient(135deg, rgba(79, 70, 229, 0.9), rgba(109, 40, 217, 0.9)) !important;
          backdrop-filter: blur(8px) !important;
          border-radius: 20px 20px 0 0 !important;
          border-bottom: 1px solid rgba(124, 58, 237, 0.3) !important;
        }
        .titlebar-title {
          font-family: 'Inter', sans-serif !important;
          font-weight: 600 !important;
          letter-spacing: 0.5px !important;
        }
      `;
      titleBar.shadowRoot.appendChild(s);
    }

    injected.current = true;
  };

  useEffect(() => {
    /* Only load/setup if user is logged in and not on the chatbot page */
    if (!currentUser || isChatbotPage) return;

    injected.current = false; // reset on user change

    /* Load Dialogflow Messenger script dynamically if not already loaded */
    const existingScript = document.querySelector(
      'script[src*="dialogflow-console/fast/messenger"]'
    );

    const setupObserver = () => {
      const dfEl = document.querySelector("df-messenger");
      if (!dfEl) return;

      /* Retry at intervals to catch async shadow DOM render */
      [200, 500, 900, 1500, 2500, 4000].forEach((ms) =>
        setTimeout(injectStyles, ms)
      );

      /* Watch for DOM mutations — always re-inject (not gated by injected.current)
         so the input box is re-styled every time the chat opens */
      const obs = new MutationObserver(() => {
        injectStyles();
      });
      obs.observe(dfEl, { childList: true, subtree: true, attributes: true });

      return () => obs.disconnect();
    };

    if (!existingScript) {
      const script = document.createElement("script");
      script.src =
        "https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1";
      script.async = true;
      script.onload = setupObserver;
      document.head.appendChild(script);
    } else {
      setupObserver();
    }
  }, [currentUser]);

  /* Only render chatbot for logged-in users and not on /chatbot page */
  if (!currentUser || isChatbotPage) return null;

  return (
    <df-messenger
      intent="WELCOME"
      chat-title="CodePlayLearnAssistant"
      agent-id="89cc1a6f-41c3-414f-b48f-a33bac0952ac"
      language-code="en"
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 9999,
        "--df-messenger-bot-message": "rgba(49, 46, 129, 0.7)",
        "--df-messenger-button-titlebar-color": "#6d28d9",
        "--df-messenger-chat-background-color": "rgba(17, 12, 40, 0.01)",
        "--df-messenger-font-color": "#f3e8ff",
        "--df-messenger-send-icon": "#a78bfa",
        "--df-messenger-user-message": "rgba(109, 40, 217, 0.8)",
      }}
    />
  );
};

export default DialogflowChat;
