import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FiCopy, FiTrash2, FiSend, FiRefreshCw, FiX } from "react-icons/fi";

const API_KEY = "AIzaSyCmdyOUdf38TZC6bbE-IMj0IkbGEYzKOvc";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

const Ai = ({ onClose }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const chatBoxRef = useRef(null);

    const copyToClipboard = async (text, e) => {
        try {
            await navigator.clipboard.writeText(text);
            const button = e.currentTarget;
            const originalText = button.innerHTML;
            button.innerHTML = "✓";
            button.className = button.className + " text-green-400";
            setTimeout(() => {
                button.innerHTML = originalText;
                button.className = button.className.replace(" text-green-400", "");
            }, 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    const renderContent = (text) => {
        const parts = text.split(/(\$\$[\s\S]*?\$\$|\$[\s\S]*?\$|```[\s\S]*?```)/g);
        return parts.map((part, index) => {
            if (part.startsWith("$$") && part.endsWith("$$")) {
                const content = part.slice(2, -2).trim();
                return (
                    <div className="relative bg-zinc-800 p-4 rounded-lg my-2 border border-zinc-700" key={index}>
                        <pre className="text-blue-300 font-mono text-sm overflow-x-auto whitespace-pre-wrap">
                            {content}
                        </pre>
                        <button 
                            className="absolute top-2 right-2 p-1 hover:bg-zinc-700 rounded text-zinc-400 hover:text-white transition-colors"
                            onClick={(e) => copyToClipboard(content, e)}
                            aria-label="Copy equation"
                        >
                            <FiCopy size={14} />
                        </button>
                    </div>
                );
            }
            if (part.startsWith("$") && part.endsWith("$")) {
                const content = part.slice(1, -1).trim();
                return (
                    <span key={index} className="inline-block bg-zinc-800 px-2 py-1 rounded text-blue-300 font-mono text-sm mx-1">
                        {content}
                    </span>
                );
            }
            if (part.startsWith("```") && part.endsWith("```")) {
                const content = part.slice(3, -3).trim();
                return (
                    <div className="relative bg-zinc-900 border border-zinc-700 rounded-lg my-2" key={index}>
                        <pre className="p-4 text-green-300 font-mono text-sm overflow-x-auto whitespace-pre-wrap">
                            {content}
                        </pre>
                        <button
                            className="absolute top-2 right-2 p-1 hover:bg-zinc-700 rounded text-zinc-400 hover:text-white transition-colors"
                            onClick={(e) => copyToClipboard(content, e)}
                            aria-label="Copy code"
                        >
                            <FiCopy size={14} />
                        </button>
                    </div>
                );
            }
            return (
                <span key={index} className="text-zinc-200 leading-relaxed whitespace-pre-wrap">
                    {part}
                </span>
            );
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
        setMessages([]);
    };

    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="w-96 h-[600px] bg-zinc-950 border border-zinc-800 rounded-lg shadow-2xl flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-900 rounded-t-lg">
                <h1 className="text-white font-semibold flex items-center gap-2">
                    <span className="text-blue-400">✦</span>
                    CodeQuest Helper
                </h1>
                <div className="flex items-center gap-2">
                    <button 
                        className="p-2 hover:bg-zinc-800 rounded text-zinc-400 hover:text-white transition-colors" 
                        onClick={clearChat} 
                        aria-label="Clear chat"
                    >
                        <FiTrash2 size={16} />
                    </button>
                    <button 
                        className="p-2 hover:bg-zinc-800 rounded text-zinc-400 hover:text-white transition-colors" 
                        onClick={onClose} 
                        aria-label="Close chat"
                    >
                        <FiX size={16} />
                    </button>
                </div>
            </div>

            {/* Chat Messages */}
            <div 
                className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-track-zinc-900 scrollbar-thumb-zinc-700"
                ref={chatBoxRef}
            >
                {messages.length === 0 && !isProcessing && (
                    <div className="flex flex-col items-center justify-center h-full text-zinc-500">
                        <div className="text-4xl mb-4 text-blue-400">✦</div>
                        <div className="text-sm">Ask your doubts...</div>
                    </div>
                )}

                {messages.map((msg, index) => (
                    <motion.div
                        key={index}
                        className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className={`max-w-[85%] ${
                            msg.type === 'user' 
                                ? 'bg-blue-600 text-white rounded-lg rounded-br-sm' 
                                : 'bg-zinc-800 text-zinc-200 rounded-lg rounded-bl-sm'
                        } p-3 shadow-lg`}>
                            {msg.type === "bot" ? (
                                <>
                                    <div className="flex items-center justify-between mb-2 pb-2 border-b border-zinc-700">
                                        <span className="text-xs text-blue-400 font-medium flex items-center gap-1">
                                            ✦ AI
                                        </span>
                                        <button 
                                            className="p-1 hover:bg-zinc-700 rounded text-zinc-400 hover:text-white transition-colors"
                                            onClick={(e) => copyToClipboard(msg.text, e)}
                                            aria-label="Copy message"
                                        >
                                            <FiCopy size={12} />
                                        </button>
                                    </div>
                                    <div className="text-sm">
                                        {renderContent(msg.text)}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs text-blue-200 font-medium">You</span>
                                        <span className="text-xs text-blue-200 opacity-70">
                                            {new Date(msg.timestamp).toLocaleTimeString([], {
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </span>
                                    </div>
                                    <div className="text-sm">
                                        {msg.text}
                                    </div>
                                </>
                            )}
                        </div>
                    </motion.div>
                ))}
                
                {isProcessing && (
                    <div className="flex justify-start">
                        <div className="bg-zinc-800 rounded-lg rounded-bl-sm p-3 max-w-[85%]">
                            <div className="flex items-center gap-2 text-zinc-400">
                                <FiRefreshCw className="animate-spin" size={14} />
                                <span className="text-sm">AI is thinking...</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            
            {/* Input Area */}
            <div className="p-4 border-t border-zinc-800 bg-zinc-900 rounded-b-lg">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message (use $$ for LaTeX)..."
                        onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                        className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white placeholder-zinc-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
                        disabled={isProcessing}
                    />
                    <motion.button 
                        onClick={sendMessage} 
                        disabled={isProcessing || !input.trim()}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-700 disabled:cursor-not-allowed text-white rounded-lg px-3 py-2 transition-colors flex items-center justify-center"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Send message"
                    >
                        <FiSend size={16} />
                    </motion.button>
                </div>
            </div>
        </div>
    );
};

export default Ai;