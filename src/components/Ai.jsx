import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import "./Ai.css";
import { FiCopy, FiTrash2, FiSend, FiRefreshCw, FiX } from "react-icons/fi";

const API_KEY = "AIzaSyA1XG2nj0HNcXR1Y4ORjC970eac7TOFkh0";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`;

const Ai = ({ onClose }) => {
    const [messages, setMessages] = useState(() => {
        const saved = localStorage.getItem("chatMessages");
        return saved ? JSON.parse(saved) : [];
    });
    const [input, setInput] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const chatBoxRef = useRef(null);

    useEffect(() => {
        localStorage.setItem("chatMessages", JSON.stringify(messages));
    }, [messages]);

    const copyToClipboard = (text, e) => {
        navigator.clipboard.writeText(text);
        const button = e.currentTarget;
        button.classList.add("copied");
        setTimeout(() => button.classList.remove("copied"), 2000);
    };

    const renderContent = (text) => {
        const parts = text.split(/(\$\$[\s\S]*?\$\$|\$[\s\S]*?\$|```[\s\S]*?```)/g);
        return parts.map((part, index) => {
            if (part.startsWith("$$") && part.endsWith("$$")) {
                const content = part.slice(2, -2).trim();
                return (
                    <div className="math-container" key={index}>
                        <BlockMath math={content} />
                        <button 
                            className="copy-button"
                            onClick={(e) => copyToClipboard(content, e)}
                            aria-label="Copy equation"
                        >
                            <FiCopy />
                        </button>
                    </div>
                );
            }
            if (part.startsWith("$") && part.endsWith("$")) {
                const content = part.slice(1, -1).trim();
                return <InlineMath key={index} math={content} />;
            }
            if (part.startsWith("```") && part.endsWith("```")) {
                const content = part.slice(3, -3).trim();
                return (
                    <div className="code-container" key={index}>
                        <pre className="code-block">{content}</pre>
                        <button
                            className="copy-button"
                            onClick={(e) => copyToClipboard(content, e)}
                            aria-label="Copy code"
                        >
                            <FiCopy />
                        </button>
                    </div>
                );
            }
            return <span key={index} className="plain-text">{part}</span>;
        });
    };

    const sendMessage = async () => {
        if (!input.trim() || isProcessing) return;

        const userMessage = { 
            text: input, 
            type: "user",
            timestamp: new Date().toISOString()
        };
        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setIsProcessing(true);

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: input }] }],
                }),
            });

            if (!response.ok) throw new Error("API request failed");

            const data = await response.json();
            const botText = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response received.";
            setMessages(prev => [...prev, { 
                text: botText, 
                type: "bot",
                timestamp: new Date().toISOString()
            }]);
        } catch (error) {
            setMessages(prev => [...prev, { 
                text: `Error: ${error.message}`, 
                type: "bot",
                timestamp: new Date().toISOString()
            }]);
        } finally {
            setIsProcessing(false);
        }
    };

    const clearChat = () => {
        localStorage.removeItem("chatMessages");
        setMessages([]);
    };

    useEffect(() => {
        chatBoxRef.current?.scrollTo(0, chatBoxRef.current.scrollHeight);
    }, [messages]);

    return (
        <div className="chat-container">
            <div className="chat-header">
                <h1>CodeQuest Helper</h1>
                <div className="header-controls">
                    <button className="clear-button" onClick={clearChat} aria-label="Clear chat">
                        <FiTrash2 />
                    </button>
                    <button className="close-button" onClick={onClose} aria-label="Close chat">
                        <FiX />
                    </button>
                </div>
            </div>

            <div className="chat-box" ref={chatBoxRef}>
                {messages.length === 0 && !isProcessing && (
                    <div className="empty-state">
                        <div className="empty-icon">✦</div>
                        <div className="empty-text">Ask your doubts...</div>
                    </div>
                )}

                {messages.map((msg, index) => (
                    <motion.div
                        key={index}
                        className={`message ${msg.type}-message`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="message-content">
                            {msg.type === "bot" ? (
                                <>
                                    <div className="bot-header">
                                        <span className="ai-icon">✦ AI</span>
                                        <button 
                                            className="copy-message-button"
                                            onClick={(e) => copyToClipboard(msg.text, e)}
                                            aria-label="Copy message"
                                        >
                                            <FiCopy />
                                        </button>
                                    </div>
                                    <div className="response-content">
                                        {renderContent(msg.text)}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="user-header">
                                        <span className="user-icon">✦ You</span>
                                        <span className="timestamp">
                                            {new Date(msg.timestamp).toLocaleTimeString()}
                                        </span>
                                    </div>
                                    <div className="response-content">
                                        {msg.text}
                                    </div>
                                </>
                            )}
                        </div>
                    </motion.div>
                ))}
                {isProcessing && (
                    <div className="loading">
                        <div className="typing-indicator">
                            <FiRefreshCw className="spin" />
                        </div>
                    </div>
                )}
            </div>
            
            <div className="input-container">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message (use $$ for LaTeX)..."
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                />
                <motion.button 
                    onClick={sendMessage} 
                    disabled={isProcessing}
                    className="send-button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Send message"
                >
                    <FiSend />
                </motion.button>
            </div>
        </div>
    );
};

export default Ai;