// This must be a client component due to the use of browser-specific features such as the Monaco Editor.
"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";  // Ensure you have this button component or replace it with a standard HTML button if not available.
import { Editor } from "@monaco-editor/react";  // Import the Editor from @monaco-editor/react package.

export function CodeWindow() {
  // State to hold the user's code. Initialized with a default code snippet.
  const [code, setCode] = useState("// Write your code here");

  // Function to update the state with the latest code from the editor.
  const handleEditorChange = (value: string | undefined, event: any) => {
    if (value !== undefined) {
      setCode(value);
    }
  };

  // Function to handle the execution of the code when the "Run" button is clicked.
  const handleRunCode = () => {
    console.log("Running the code:", code);
    // Here you could add logic to execute the code or send it to a server for safe execution.
  };

  return (
      <div className="flex w-full min-h-screen">
        <main className="flex-1 bg-gray-100 dark:bg-gray-950">
          <div className="container mx-auto grid grid-cols-[1fr_300px] gap-8 p-8 md:p-12">
            <div className="space-y-6">
              <div className="rounded-md border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 dark:border-gray-800">
                <h2 className="text-xl font-semibold">Question</h2>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  Write a function that takes an array of numbers and returns the sum of all the even numbers.
                </p>
              </div>
              <div className="rounded-md border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 dark:border-gray-800">
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
            <div className="rounded-md border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 dark:border-gray-800">
              <h2 className="text-xl font-semibold">Chat</h2>
              <div className="mt-4 h-[600px] rounded-md border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-800 dark:border-gray-800" />
            </div>
          </div>
        </main>
      </div>
  );
}

export default CodeWindow;
