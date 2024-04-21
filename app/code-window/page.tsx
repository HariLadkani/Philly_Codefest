"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Editor } from "@monaco-editor/react";

export function CodeWindow() {
  const [code, setCode] = useState("// Write your code here");
  const [chatMessage, setChatMessage] = useState("");  // State for storing chat message
  const [chatHistory, setChatHistory] = useState<string[]>([]); // State to store chat history

  const handleEditorChange = (value: string | undefined, event: any) => {
    if (value !== undefined) {
      setCode(value);
    }
  };

  const handleRunCode = () => {
    console.log("Running the code:", code);
  };

  // Function to handle sending the chat message
  const handleSendMessage = async () => {
    if (chatMessage.trim() === "") return;  // Avoid sending empty messages

    const userMessage = chatMessage;
    setChatMessage("");  // Clear the message input
    setChatHistory(prevHistory => [...prevHistory, `You: ${userMessage}`]); // Add the user message to the chat history

    try {
      // Send the user message to your backend
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // Assume the backend returns a JSON with a 'response' field containing the AI's response
      const aiResponse = data.response;

      // Update the chat history with the AI's response
      setChatHistory(prevHistory => [...prevHistory, `AI: ${aiResponse}`]);
    } catch (error) {
      console.error("Failed to send message:", error);
      // Here you could update the chat history with a message indicating the error or handle it in another way
    }
  };

  return (
      <div className="flex w-full min-h-screen">
        <main className="flex-1 bg-gray-100 dark:bg-gray-950">
          <div className="container mx-auto grid grid-cols-[1fr_300px] gap-8 p-8 md:p-12">
            <div className="space-y-6">
              <div className="rounded-md border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <h2 className="text-xl font-semibold">Question</h2>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  Write a function that takes an array of numbers and returns the sum of all the even numbers.
                </p>
              </div>
              <div className="rounded-md border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <h2 className="text-xl font-semibold">Code Editor</h2>
                <Editor
                    height="400px"
                    defaultLanguage="javascript"
                    defaultValue={code}
                    onChange={handleEditorChange}
                    theme="vs-dark"
                />
                <div className="mt-4 flex justify-end">
                  <Button onClick={handleRunCode}>Run</Button>
                </div>
              </div>
            </div>
            <div
                className="rounded-md border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <h2 className="text-xl font-semibold">Chat</h2>
              <div
                  className="flex flex-col h-[600px] rounded-md border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-800">
                <div className="flex-1 overflow-auto mb-4">
                  {chatHistory.map((msg, index) => (
                      <div key={index} className="text-black dark:text-white p-2">{msg}</div>
                  ))}
                </div>
                <div className="flex">
                  <input
                      type="text"
                      value={chatMessage}
                      onChange={e => setChatMessage(e.target.value)}
                      className="flex-1 rounded-l-md p-2 dark:bg-gray-700 dark:text-white"
                      placeholder="Type your message..."
                  />
                  <Button onClick={handleSendMessage} className="rounded-r-md">Send</Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
  );
}

export default CodeWindow;
