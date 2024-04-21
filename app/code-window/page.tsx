"use client";

import { Button } from "@/components/ui/button";
import { Editor } from "@monaco-editor/react";

export function CodeWindow() {
  const handleEditorChange = (value, event) => {
    // handle changes in the editor
    console.log(value);
  };

  const handleRunCode = () => {
    // logic to run the code written in the editor
    console.log("Run the code here");
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
                    defaultValue="// Write your code here"
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
