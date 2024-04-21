"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";

interface Message {
    role: string;
    content: string;
}

export function Simulator() {
    const [chatMessage, setChatMessage] = useState("");
    const [chatHistory, setChatHistory] = useState<Message[]>([{role: "system", content: "Hi"}]);

    const handleSendMessage = async () => {
        if (chatMessage.trim() === "") return;  // Avoid sending empty messages

        const userMessage = chatMessage;
        console.log(userMessage);
        setChatMessage("");  // Clear the message input

        const newMsg: Message = {role: "user", content: userMessage};
        setChatHistory(prevHistory => [...prevHistory, newMsg]);

        try {
            const response = await fetch('http://127.0.0.1:3002/llm_chatbot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(chatHistory.concat(newMsg)),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const aiResponse = data["feedback"];

            const messageResponse: Message = {role: "assistant", content: aiResponse};
            setChatHistory(prevHistory => [...prevHistory, messageResponse]);
        } catch (error) {
            console.error("Failed to send message:", error);
        }
    };

    return (
        <div className="flex flex-row items-start justify-center h-screen bg-gray-100 dark:bg-gray-900 gap-8 p-8">
            <div className="flex flex-col items-center justify-start w-1/2 space-y-4">
                <h1 className="text-3xl font-bold text-white">Hi, would you like me to review your code?</h1>
                <img
                    alt="Person"
                    className="rounded-full shadow-lg"
                    src="/woman.png"
                    style={{ width: '500px', height: '600px', objectFit: 'cover' }}
                />
            </div>
            <div className="flex flex-col w-1/2 h-3/4 bg-white dark:bg-gray-700 rounded-md shadow-md p-6">
                <h2 className="text-xl font-semibold text-black dark:text-white">Chat</h2>
                <div className="flex-1 overflow-auto my-4">
                    {chatHistory.map((msg, index) => (
                        <div key={index} className={`p-2 ${index % 2 === 0 ? 'text-left' : 'text-right'}`}>
                            {msg.content}
                        </div>
                    ))}
                </div>
                <div className="flex">
                    <input
                        type="text"
                        value={chatMessage}
                        onChange={e => setChatMessage(e.target.value)}
                        className="flex-grow rounded-l-md p-2 border border-gray-300 dark:border-gray-600 text-black"
                        placeholder="Type your message..."
                    />
                    <Button onClick={handleSendMessage} className="rounded-r-md bg-blue-500 text-white px-4 ml-2">
                        Send
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Simulator;
