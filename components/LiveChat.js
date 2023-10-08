"use client"
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios'; 

const LiveChat = () => {
    const [chatOpen, setChatOpen] = useState(false);
    const [messages, setMessages] = useState([{ sender: 'ai', content: "Welcome! How can I help you today?" }]);
    const inputRef = useRef(null);

    const handleChatToggle = () => {
        setChatOpen(!chatOpen);
    };

    const handleSendMessage = async () => {
        const message = inputRef.current.textContent.trim();

        if (!message) return;

        setMessages([...messages, { sender: 'user', content: message }]);
        inputRef.current.textContent = '';

        try {
            const response = await axios.post('/api/chat', { message });
            const aiResponse = response.data.message;

            // Add the AI's response to the chat
            setMessages(prev => [...prev, { sender: 'ai', content: aiResponse }]);
        } catch (error) {
            console.error("Error getting AI's response:", error);
        }
    };

    useEffect(() => {
        if (chatOpen) {
            inputRef.current.focus();
        }
    }, [chatOpen]);

    return (
        <div className="fixed bottom-4 right-4">
            {chatOpen ? (
                <div className="border rounded-lg shadow-xl p-4 max-w-sm bg-white">
                    <div className="flex justify-between items-center mb-4">
                        <strong className="text-lg">Chat Support</strong>
                        <button onClick={handleChatToggle} className="text-gray-400">&times;</button>
                    </div>
                    <div className="chat-messages mb-4 overflow-y-auto h-48">
                        {messages.map((msg, index) => (
                            <div key={index} className={`mb-2 ${msg.sender === 'ai' ? 'text-gray-500' : 'text-blue-500'}`}>
                                <strong>{msg.sender === 'ai' ? 'Support' : 'You'}: </strong>{msg.content}
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center">
                        <div
                            ref={inputRef}
                            contentEditable={true}
                            placeholder="Type your message..."
                            onKeyPress={e => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSendMessage();
                                }
                            }}
                            className="border w-full p-2 mr-2 rounded flex-grow overflow-y-auto text-black placeholder-gray-400"
                            style={{ minHeight: '40px' }}
                        ></div>
                        <button
                            onClick={handleSendMessage}
                            className="bg-blue-500 text-white p-2 rounded"
                        >
                            Send
                        </button>
                    </div>
                </div>
            ) : (
                <button onClick={handleChatToggle} className="bg-blue-500 text-white p-4 rounded-full shadow-lg">
                    <span role="img" aria-label="Chat Icon">💬</span>
                </button>
            )}
        </div>
    );
};

export default LiveChat;
