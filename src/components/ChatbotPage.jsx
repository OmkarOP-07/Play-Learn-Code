import React, { useEffect, useRef, useState, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { ArrowLeft, Bot, Sparkles, Code2, Lightbulb, BookOpen, Zap } from "lucide-react";

const AGENT_ID = "89cc1a6f-41c3-414f-b48f-a33bac0952ac";

const SUGGESTIONS = [
  { icon: Code2,     text: "Explain how recursion works with an example" },
  { icon: Lightbulb, text: "Help me debug a Java NullPointerException" },
  { icon: BookOpen,  text: "What is encapsulation and why is it important?" },
  { icon: Zap,       text: "Give me a quick quiz on Java loops" },
];

const s = {
  page: {
    height: "100dvh", display: "flex", flexDirection: "column", overflow: "hidden",
    background: "linear-gradient(135deg, #1e1b4b 0%, #4a1d96 50%, #2e1065 100%)",
    fontFamily: "'Inter','Segoe UI',sans-serif", color: "#fff",
  },
  blob: (top, left, size, color, delay = "0s") => ({
    position: "fixed", borderRadius: "50%", pointerEvents: "none",
    top, left, width: size, height: size,
    background: `radial-gradient(circle,${color} 0%,transparent 70%)`,
    filter: "blur(60px)", animation: `blob-pulse 5s ease-in-out infinite ${delay}`,
  }),
  header: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "0 20px", height: 58, flexShrink: 0, marginTop: 56,
    background: "rgba(30,27,75,0.85)", borderBottom: "1px solid rgba(124,58,237,0.25)",
    backdropFilter: "blur(20px)", position: "relative", zIndex: 10,
  },
  iconBtn: {
    display: "flex", alignItems: "center", justifyContent: "center",
    width: 36, height: 36, borderRadius: 10, cursor: "pointer", border: "none",
    background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)",
    color: "#a78bfa", transition: "background 0.2s",
  },
  avatar: {
    width: 38, height: 38, borderRadius: 11,
    background: "linear-gradient(135deg,#7c3aed,#4f46e5)",
    display: "flex", alignItems: "center", justifyContent: "center",
    boxShadow: "0 4px 18px rgba(109,40,217,0.5)",
  },
  badge: {
    display: "flex", alignItems: "center", gap: 7,
    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 8, padding: "5px 12px",
  },
  sidebar: (open) => ({
    width: open ? 256 : 0, flexShrink: 0, overflow: "hidden",
    transition: "width 0.3s ease",
    background: "rgba(30,27,75,0.6)", borderRight: "1px solid rgba(124,58,237,0.2)",
    backdropFilter: "blur(16px)", display: "flex", flexDirection: "column",
  }),
  suggBtn: {
    display: "flex", alignItems: "center", gap: 11, padding: "11px 12px",
    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(124,58,237,0.18)",
    borderRadius: 13, cursor: "pointer", textAlign: "left", width: "100%",
    transition: "all 0.2s", color: "#e9d5ff",
  },
  suggIcon: {
    width: 30, height: 30, borderRadius: 8, flexShrink: 0,
    background: "rgba(109,40,217,0.3)", display: "flex",
    alignItems: "center", justifyContent: "center",
  },
};

const ChatbotPage = () => {
  const { currentUser } = useAuth();
  const [sidebar, setSidebar] = useState(true);
  const dfRef = useRef(null);

  /* Drill into nested shadow DOMs and inject custom styles */
  const injectStyles = () => {
    const dfEl = dfRef.current;
    if (!dfEl || !dfEl.shadowRoot) return;

    const chatEl = dfEl.shadowRoot.querySelector("df-messenger-chat");
    if (!chatEl || !chatEl.shadowRoot) return;

    /* ── Chat window styles ── */
    if (!chatEl.shadowRoot.getElementById("df-chat-custom")) {
      const s = document.createElement("style");
      s.id = "df-chat-custom";
      s.textContent = `
        .chat-wrapper, .chat-window {
          width: 100% !important;
          max-width: 100% !important;
          height: 100% !important;
          max-height: 100% !important;
          border-radius: 0px !important;
          background: rgba(17, 12, 40, 0.25) !important;
          backdrop-filter: blur(12px) !important;
          border: none !important;
          box-shadow: none !important;
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
          padding: 16px !important;
        }
      `;
      msgList.shadowRoot.appendChild(s);
    }

    /* ── User input ── */
    const inputEl = chatEl.shadowRoot.querySelector("df-messenger-user-input");
    if (inputEl && inputEl.shadowRoot) {
      const old = inputEl.shadowRoot.getElementById("df-input-custom");
      if (old) old.remove();

      const s = document.createElement("style");
      s.id = "df-input-custom";
      s.textContent = `
        * {
          box-sizing: border-box;
        }
        :host {
          background: rgba(20, 16, 50, 0.4) !important;
          border-top: 1px solid rgba(124, 58, 237, 0.2) !important;
        }
        .input-box-wrapper {
          background: rgba(20, 16, 50, 0.85) !important;
          border: 1.5px solid rgba(124, 58, 237, 0.5) !important;
          border-radius: 12px !important;
          margin: 10px 16px 16px !important;
          padding: 6px 12px !important;
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
          width: 100% !important;
        }
        input::placeholder, textarea::placeholder {
          color: #7c5cbf !important;
          opacity: 1 !important;
        }
        button[type="submit"], .send-icon-button, button {
          background: linear-gradient(135deg, #7c3aed, #4f46e5) !important;
          border-radius: 8px !important;
          border: none !important;
          width: 32px !important;
          height: 32px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          cursor: pointer !important;
          transition: opacity 0.2s ease !important;
        }
        button[type="submit"] svg, .send-icon-button svg, button svg {
          width: 22px !important;
          height: 22px !important;
          transform: scale(0.8) !important;
        }
        button:hover {
          opacity: 0.8 !important;
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
          background: linear-gradient(135deg, rgba(79, 70, 229, 0.8), rgba(109, 40, 217, 0.8)) !important;
          backdrop-filter: blur(8px) !important;
          border-bottom: 1px solid rgba(124, 58, 237, 0.25) !important;
        }
        .titlebar-title {
          font-family: 'Inter', sans-serif !important;
          font-weight: 600 !important;
        }
      `;
      titleBar.shadowRoot.appendChild(s);
    }
  };

  /* Load Dialogflow Messenger script + setup style injection and observer */
  useEffect(() => {
    if (!currentUser) return;

    const setupObserver = () => {
      const dfEl = dfRef.current;
      if (!dfEl) return;

      /* Retry style injection at intervals to catch async shadow DOM render */
      [200, 500, 1000, 2000, 4000].forEach((ms) =>
        setTimeout(injectStyles, ms)
      );

      /* Watch for shadow DOM mutations to re-style */
      const obs = new MutationObserver(() => {
        injectStyles();
      });
      obs.observe(dfEl, { childList: true, subtree: true, attributes: true });

      return () => obs.disconnect();
    };

    const existing = document.querySelector('script[src*="dialogflow-console/fast/messenger"]');
    if (!existing) {
      const sc = document.createElement("script");
      sc.src = "https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1";
      sc.async = true;
      sc.onload = setupObserver;
      document.head.appendChild(sc);
    } else {
      setupObserver();
    }
  }, [currentUser]);

  /* Send message */
  const send = useCallback((text) => {
    const msg = text.trim();
    if (!msg || !dfRef.current) return;
    if (typeof dfRef.current.sendQuery === "function") {
      dfRef.current.sendQuery(msg);
    } else {
      console.warn("Dialogflow Messenger is not fully loaded yet.");
    }
  }, []);

  /* ── Gate ── */
  if (!currentUser) return (
    <div style={{ minHeight: "100vh", background: "#080616", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ ...s.avatar, width: 72, height: 72, margin: "0 auto 20px", borderRadius: 18 }}>
          <Bot size={34} color="#fff" />
        </div>
        <h1 style={{ color: "#fff", fontSize: 26, marginBottom: 12 }}>Login Required</h1>
        <p style={{ color: "#c4b5fd", marginBottom: 24 }}>Sign in to chat with your AI assistant</p>
        <Link to="/login" style={{ padding: "12px 32px", background: "linear-gradient(135deg,#7c3aed,#4f46e5)", borderRadius: 12, color: "#fff", textDecoration: "none", fontWeight: 700 }}>Login</Link>
      </div>
    </div>
  );

  return (
    <div style={s.page}>
      {/* CSS keyframes */}
      <style>{`
        @keyframes blob-pulse { 0%,100%{opacity:0.8} 50%{opacity:0.4} }
        .sugg-btn:hover{background:rgba(109,40,217,0.22)!important;border-color:rgba(167,139,250,0.4)!important;transform:translateX(2px)}
      `}</style>

      {/* Ambient blobs */}
      <div style={s.blob("-5%","60%","450px","rgba(109,40,217,0.15)")} />
      <div style={s.blob("60%","-5%","380px","rgba(79,70,229,0.13)","2s")} />

      {/* ── Header ── */}
      <header style={s.header}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link to="/" style={{ ...s.iconBtn, textDecoration: "none" }}>
            <ArrowLeft size={17} />
          </Link>
          <div style={s.avatar}><Bot size={18} color="#fff" /></div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontWeight: 700, fontSize: 15 }}>CodeQuest Assistant</span>
              <Sparkles size={13} color="#facc15" />
            </div>
            <span style={{ color: "#a78bfa", fontSize: 11 }}>AI coding companion · Dialogflow</span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={s.badge}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#34d399", boxShadow: "0 0 6px #34d399", animation: "blob-pulse 2s infinite" }} />
            <span style={{ color: "#a7f3d0", fontSize: 12 }}>Online</span>
          </div>
          <button style={s.iconBtn} onClick={() => setSidebar(o => !o)} title="Toggle suggestions">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <rect x="3" y="3" width="7" height="18" rx="1"/><rect x="14" y="3" width="7" height="18" rx="1"/>
            </svg>
          </button>
        </div>
      </header>

      {/* ── Body ── */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden", position: "relative", zIndex: 5 }}>

        {/* Sidebar */}
        <aside style={s.sidebar(sidebar)}>
          <div style={{ width: 256, padding: "18px 14px", display: "flex", flexDirection: "column", gap: 10, height: "100%", overflowY: "auto" }}>
            <p style={{ color: "#6b5ca5", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", margin: 0 }}>
              Try asking…
            </p>
            {SUGGESTIONS.map(({ icon: Icon, text }) => (
              <button key={text} className="sugg-btn" style={s.suggBtn} onClick={() => send(text)}>
                <span style={s.suggIcon}><Icon size={14} color="#a78bfa" /></span>
                <span style={{ fontSize: 11.5, lineHeight: 1.45 }}>{text}</span>
              </button>
            ))}
            <div style={{ marginTop: "auto", padding: 12, background: "rgba(109,40,217,0.1)", border: "1px solid rgba(124,58,237,0.2)", borderRadius: 12 }}>
              <p style={{ color: "#7c5cbf", fontSize: 11, lineHeight: 1.7, margin: 0 }}>
                💡 Click any prompt above to automatically send it to the assistant!
              </p>
            </div>
          </div>
        </aside>

        {/* Chat Area Container */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: "rgba(17, 12, 40, 0.4)", borderRadius: "16px", margin: "12px", border: "1px solid rgba(124, 58, 237, 0.15)" }}>

          {/* Welcome strip */}
          <div style={{ padding: "12px 20px", background: "rgba(109,40,217,0.12)", borderBottom: "1px solid rgba(124,58,237,0.2)", flexShrink: 0 }}>
            <span style={{ color: "#c4b5fd", fontSize: 13, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#a78bfa" }} />
              👋 Hi <strong style={{ color: "#e9d5ff" }}>{currentUser.displayName || currentUser.email?.split("@")[0]}</strong>! Welcome to your interactive workspace.
            </span>
          </div>

          {/* Inline Embedded df-messenger */}
          <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
            <df-messenger
              ref={dfRef}
              intent="WELCOME"
              chat-title="CodeQuestAssistant"
              agent-id={AGENT_ID}
              language-code="en"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 1,
                display: "block",
                "--df-messenger-bot-message": "rgba(49, 46, 129, 0.6)",
                "--df-messenger-button-titlebar-color": "linear-gradient(135deg, #4f46e5, #6d28d9)",
                "--df-messenger-chat-background-color": "transparent",
                "--df-messenger-font-color": "#f3e8ff",
                "--df-messenger-send-icon": "#a78bfa",
                "--df-messenger-user-message": "rgba(109, 40, 217, 0.8)",
                "--df-messenger-chat-window-width": "100%",
                "--df-messenger-chat-window-height": "100%",
              }}
            >
              <df-messenger-chat
                chat-width="100%"
                chat-height="100%"
              />
            </df-messenger>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ChatbotPage;
