"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Editor } from "@monaco-editor/react";
import Link from 'next/link';

export function CodeWindow() {
  const [code, setCode] = useState("// Write your code here");
  const [output, setOutput] = useState("");  // State for storing the output of the code
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<string[]>([]);

  const handleEditorChange = (value: string | undefined, event: any) => {
    if (value !== undefined) {
      setCode(value);
    }
  };

  // Simulate running the code and capturing the output
  const handleRunCode = () => {
    console.log("Running the code:", code);
    // For simulation purposes, let's pretend it always returns "Execution result"
    const simulatedOutput = "Execution result: " + Math.random(); // Random output to simulate different results
    setOutput(simulatedOutput);
  };

  const handleSendMessage = async () => {
    if (chatMessage.trim() === "") return;
    setChatHistory(prevHistory => [...prevHistory, `You: ${chatMessage}`]);
    setChatMessage("");

    setTimeout(() => {
      const aiResponse = "This is a hardcoded response from the AI.";
      setChatHistory(prevHistory => [...prevHistory, `AI: ${aiResponse}`]);
    }, 500);
  };

  return (
      <div className="flex w-full min-h-screen">
        <main className="flex-1 bg-gray-100 dark:bg-gray-950">
          <div className="container mx-auto grid grid-cols-[1fr_300px] gap-8 p-8 md:p-12">
            {/* Back to Dashboard button */}
            <div className="col-span-full mb-4">
              <Link legacyBehavior href="/dashboard">
                <a className="inline-block p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200">
                  Back to Dashboard
                </a>
              </Link>
            </div>
            <div className="space-y-6 flex-1">
              <div className="rounded-md border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <h2 className="text-xl font-semibold">Question</h2>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  Write a function that takes an array of numbers and returns the sum of all the even numbers.
                </p>
              </div>
              <div className="rounded-md border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <h2 className="text-xl font-semibold">Code Editor</h2>
                <Editor
                    height="200px"
                    defaultLanguage="javascript"
                    defaultValue={code}
                    onChange={handleEditorChange}
                    theme="vs-dark"
                />
                <div className="mt-4 flex justify-end">
                  <Button onClick={handleRunCode}>Run</Button>
                </div>
                {/* Output window for displaying the results of the code execution */}
                <div className="mt-4 bg-gray-50 border border-gray-200 rounded p-2 text-black dark:bg-gray-900 dark:text-white">
                  <strong>Output:</strong> {output}
                </div>
              </div>
            </div>
            <div className="rounded-md border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <h2 className="text-xl font-semibold">Chat</h2>
              <div className="flex flex-col h-[600px] rounded-md border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-800">
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
