import React, { useEffect, useRef, useState, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { ArrowLeft, Bot, Sparkles, Send, Code2, Lightbulb, BookOpen, Zap } from "lucide-react";

const AGENT_ID = "89cc1a6f-41c3-414f-b48f-a33bac0952ac";

const SUGGESTIONS = [
  { icon: Code2,     text: "Explain how recursion works with an example" },
  { icon: Lightbulb, text: "Help me debug a Java NullPointerException" },
  { icon: BookOpen,  text: "What is encapsulation and why is it important?" },
  { icon: Zap,       text: "Give me a quick quiz on Java loops" },
];

/* ── styles object to keep JSX clean ── */
const s = {
  page: {
    height: "100dvh", display: "flex", flexDirection: "column", overflow: "hidden",
    /* matches app-wide: from-indigo-950 via-purple-900 to-violet-950 */
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
  messages: {
    flex: 1, overflowY: "auto", padding: "24px 20px",
    display: "flex", flexDirection: "column", gap: 16,
  },
  botBubble: {
    maxWidth: "72%", alignSelf: "flex-start",
    background: "rgba(49,46,129,0.5)", border: "1px solid rgba(99,81,212,0.3)",
    borderRadius: "18px 18px 18px 4px", padding: "12px 16px",
    fontSize: 14, lineHeight: 1.65, color: "#f3e8ff",
  },
  userBubble: {
    maxWidth: "72%", alignSelf: "flex-end",
    background: "linear-gradient(135deg,rgba(109,40,217,0.85),rgba(79,70,229,0.85))",
    borderRadius: "18px 18px 4px 18px", padding: "12px 16px",
    fontSize: 14, lineHeight: 1.65, color: "#fff",
  },
  inputRow: {
    display: "flex", alignItems: "center", gap: 10,
    padding: "12px 20px", flexShrink: 0,
    background: "rgba(30,27,75,0.8)", borderTop: "1px solid rgba(124,58,237,0.25)",
    backdropFilter: "blur(16px)",
  },
  input: {
    flex: 1, background: "rgba(30,27,75,0.7)", border: "1.5px solid rgba(124,58,237,0.4)",
    borderRadius: 13, padding: "11px 16px", color: "#f3e8ff", fontSize: 14,
    outline: "none", fontFamily: "inherit",
    transition: "border-color 0.2s, box-shadow 0.2s",
  },
  sendBtn: (disabled) => ({
    width: 42, height: 42, borderRadius: 12, flexShrink: 0, border: "none",
    background: disabled
      ? "rgba(124,58,237,0.3)"
      : "linear-gradient(135deg,#7c3aed,#4f46e5)",
    color: "#fff", cursor: disabled ? "not-allowed" : "pointer",
    display: "flex", alignItems: "center", justifyContent: "center",
    transition: "opacity 0.2s, transform 0.15s",
    boxShadow: disabled ? "none" : "0 4px 16px rgba(109,40,217,0.5)",
  }),
};

/* ── Typing indicator ── */
const Typing = () => (
  <div style={{ ...s.botBubble, display: "flex", gap: 5, padding: "14px 18px" }}>
    {[0, 1, 2].map(i => (
      <span key={i} style={{
        width: 7, height: 7, borderRadius: "50%", background: "#a78bfa",
        animation: `typing-dot 1.2s ease-in-out ${i * 0.2}s infinite`,
        display: "inline-block",
      }} />
    ))}
  </div>
);

/* ── Main component ── */
const ChatbotPage = () => {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hey! 👋 I'm your CodeQuest AI Assistant. Ask me anything about Java, Python, OOP, data structures, or debugging!" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [sidebar, setSidebar] = useState(true);
  const [dfReady, setDfReady] = useState(false);
  const dfRef = useRef(null);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  /* Auto-scroll */
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, typing]);

  /* Load Dialogflow Messenger script + wire events */
  useEffect(() => {
    if (!currentUser) return;

    const load = () => {
      const df = dfRef.current;
      if (!df) return;

      /* Listen for bot responses via public event API */
      df.addEventListener("df-response-received", (e) => {
        const resp = e.detail?.response;
        const texts = resp?.queryResult?.fulfillmentMessages
          ?.filter(m => m.text?.text?.length)
          .flatMap(m => m.text.text) || [];
        const botText = texts.join("\n") || resp?.queryResult?.fulfillmentText || "Sorry, I didn't get that.";
        setTyping(false);
        setMessages(prev => [...prev, { from: "bot", text: botText }]);
      });

      df.addEventListener("df-messenger-loaded", () => setDfReady(true));
      setDfReady(true); // fallback
    };

    const existing = document.querySelector('script[src*="dialogflow-console/fast/messenger"]');
    if (!existing) {
      const sc = document.createElement("script");
      sc.src = "https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1";
      sc.async = true;
      sc.onload = load;
      document.head.appendChild(sc);
    } else {
      load();
    }
  }, [currentUser]);

  /* Send message */
  const send = useCallback((text) => {
    const msg = text.trim();
    if (!msg || !dfRef.current) return;
    setInput("");
    setMessages(prev => [...prev, { from: "user", text: msg }]);
    setTyping(true);
    /* Trigger df-messenger via its public event API */
    dfRef.current.dispatchEvent(
      new CustomEvent("df-user-input-entered", { detail: { input: msg }, bubbles: true })
    );
  }, []);

  const onKey = (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } };

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
        @keyframes typing-dot { 0%,80%,100%{transform:scale(0.6);opacity:0.4} 40%{transform:scale(1);opacity:1} }
        #chatbot-input:focus { border-color:rgba(167,139,250,0.7)!important; box-shadow:0 0 0 3px rgba(124,58,237,0.15)!important; }
        .msg-scroll::-webkit-scrollbar{width:5px} .msg-scroll::-webkit-scrollbar-thumb{background:rgba(124,58,237,0.3);border-radius:4px}
        .sugg-btn:hover{background:rgba(109,40,217,0.22)!important;border-color:rgba(167,139,250,0.4)!important;transform:translateX(2px)}
      `}</style>

      {/* Ambient blobs */}
      <div style={s.blob("-5%","60%","450px","rgba(109,40,217,0.15)")} />
      <div style={s.blob("60%","-5%","380px","rgba(79,70,229,0.13)","2s")} />

      {/* Hidden df-messenger — event bridge only */}
      <df-messenger
        ref={dfRef}
        intent="WELCOME"
        chat-title="CodeQuestAssistant"
        agent-id={AGENT_ID}
        language-code="en"
        style={{
          position: "fixed",
          left: "-9999px",
          top: "-9999px",
          width: "1px",
          height: "1px",
          overflow: "hidden",
          pointerEvents: "none",
          opacity: 0,
        }}
      />

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
                💡 Click any prompt above or type your own question below!
              </p>
            </div>
          </div>
        </aside>

        {/* Chat */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

          {/* Welcome strip */}
          <div style={{ padding: "8px 20px", background: "rgba(109,40,217,0.08)", borderBottom: "1px solid rgba(124,58,237,0.12)", flexShrink: 0 }}>
            <span style={{ color: "#c4b5fd", fontSize: 12 }}>
              👋 Hi <strong style={{ color: "#e9d5ff" }}>{currentUser.displayName || currentUser.email?.split("@")[0]}</strong>! Ask me anything about coding.
            </span>
          </div>

          {/* Messages */}
          <div className="msg-scroll" style={s.messages}>
            {messages.map((m, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column" }}>
                {m.from === "bot" && (
                  <div style={{ display: "flex", alignItems: "flex-end", gap: 8, marginBottom: 2 }}>
                    <div style={{ ...s.avatar, width: 26, height: 26, borderRadius: 7, flexShrink: 0 }}>
                      <Bot size={13} color="#fff" />
                    </div>
                    <div style={s.botBubble}>{m.text}</div>
                  </div>
                )}
                {m.from === "user" && (
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <div style={s.userBubble}>{m.text}</div>
                  </div>
                )}
              </div>
            ))}
            {typing && (
              <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
                <div style={{ ...s.avatar, width: 26, height: 26, borderRadius: 7, flexShrink: 0 }}>
                  <Bot size={13} color="#fff" />
                </div>
                <Typing />
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={s.inputRow}>
            <input
              id="chatbot-input"
              ref={inputRef}
              style={s.input}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={onKey}
              placeholder="Ask me anything about coding…"
              autoComplete="off"
            />
            <button
              id="chatbot-send"
              style={s.sendBtn(!input.trim() || typing)}
              disabled={!input.trim() || typing}
              onClick={() => send(input)}
            >
              <Send size={17} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;
