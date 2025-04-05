
import chatbotImg from './assets/images/chatbot.png';
import React, { useState } from "react";
import { motion } from "framer-motion";
import Ai from "./Ai";
import { FiSend } from "react-icons/fi";
import "./Ai.css";

const AiLauncher = () => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div className="ai-launcher">
            {!isVisible && (
                <motion.button
                    className="launch-button"
                    onClick={() => setIsVisible(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Open AI chat"
                >
                    <img id='AiLauncherChatImg'
                        src={chatbotImg} // Adjust the path as needed
                        alt="Chatbot"
                        className="launch-image"
                    />
                </motion.button>
            )}

            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                >
                    <Ai onClose={() => setIsVisible(false)} />
                </motion.div>
            )}
        </div>
    );
};

export default AiLauncher;
