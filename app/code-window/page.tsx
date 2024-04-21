"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";  // Ensure you have this button component or replace it with a standard HTML button if not available.
import { Editor } from "@monaco-editor/react";  // Import the Editor from @monaco-editor/react package.
import { stat } from 'fs';
import Link from 'next/link';

export function CodeWindow() {
  const [code, setCode] = useState("// Write your code here");
  // const [output, setOutput] = useState("");  // State for storing the output of the code
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<string[]>([]);
  const [status, setStatus] = useState("No Output");
  const [output, setOutput] = useState("Press the run button to generate output");

  const handleEditorChange = (value: string | undefined, event: any) => {
    if (value !== undefined) {
      setCode(value);
    }
  };



  // Function to handle the execution of the code when the "Run" button is clicked.
  async function handleRunCode(){
    console.log("Running the code:", code);
    const res = await fetch('http://127.0.0.1:3002/run',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: 'Bearer your-token-here' // if your API requires an authorization header
      },
      body: JSON.stringify({
        "code": code,
      }),
    });
    if (!res.ok){
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();

    if (data.response == "Success"){
      setStatus("Success");
      setOutput("Code compiled");
    }
    else{
      setStatus("error");
      setOutput("Error compiling code!" + data.response + " Please try again!");
    }
    console.log(status);
    console.log(output);
  }
    // Here you could add logic to execute the code or send it to a server for safe execution.
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
                    height="400px"
                    defaultLanguage="python"
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
