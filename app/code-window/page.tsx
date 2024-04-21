"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"; // Ensure you have this button component or replace it with a standard HTML button if not available.
import { Editor } from "@monaco-editor/react"; // Import the Editor from @monaco-editor/react package
import Link from "next/link";

interface Message {
  role: string;
  content: string;
}
interface QuestionMapping {
  [key: string]: any; // replace 'any' with the type of the values in your object
}

const question_mapping: QuestionMapping = {
  "1": {
    tag: "INTRO",
    question_type: "Basic",
    text: "Change 'blue' to your favorite color in the script to the right. Run the code to see what it does!",
    code: "favorite_color = 'blue'\nprint('Your favorite color is ' + favorite_color + '!')",
    test_cases: {
      input: [["green"], ["red"]],
      output: ["Your favorite color is green!", "Your favorite color is red!"],
    },
  },
  "2": {
    tag: "INTRO",
    question_type: "Basic",
    text: "Replace 'New York' with the city you are from in the script to the right. Run the code to see what message it prints!",
    code: "home_city = 'New York'\nprint('I am from ' + home_city + '. Where are you from?')",
    test_cases: {
      input: [["San Francisco"], ["London"]],
      output: [
        "I am from San Francisco. Where are you from?",
        "I am from London. Where are you from?",
      ],
    },
  },
  "3": {
    tag: "INTRO",
    question_type: "Basic",
    text: "Substitute 'Buddy' with the name of your pet in the script to the right. Run the code to see the output!",
    code: "pet_name = 'Buddy'\nprint('My pet\\'s name is ' + pet_name + '. What\\'s your pet\\'s name?')",
    test_cases: {
      input: [["Max"], ["Bella"]],
      output: [
        "My pet's name is Max. What's your pet's name?",
        "My pet's name is Bella. What's your pet's name?",
      ],
    },
  },
  "4": {
    tag: "PRINT",
    question_type: "Basic",
    text: "Modify the greeting in the script to say 'Good evening, everyone!' instead. Run the code to see the updated message.",
    code: "print('Good evening, everyone!')",
    test_cases: {
      input: [[], []],
      output: ["Good evening, everyone!", "Good evening, everyone!"],
    },
  },
  "5": {
    tag: "PRINT",
    question_type: "Intermediate",
    text: "Change the `user_name` to 'Alex' and the `greeting` to 'Good to see you' in the script. Run the code to see the personalized welcome message.",
    code: "user_name = 'Alex'\ngreeting = 'Good to see you'\nprint(greeting + ', ' + user_name + '!')",
    test_cases: {
      input: [
        ["Alex", "Good to see you"],
        ["Emma", "Hello there"],
      ],
      output: ["Good to see you, Alex!", "Hello there, Emma!"],
    },
  },
  "6": {
    tag: "PRINT",
    question_type: "Advanced",
    text: "Replace `first_name`, `last_name`, and `job_title` with your own details or a fictional character's details in the script. Run the code to generate a formal introduction.",
    code: "first_name = 'John'\nlast_name = 'Doe'\njob_title = 'Developer'\nprint('Introducing ' + first_name + ' ' + last_name + ', the ' + job_title + '!')",
    test_cases: {
      input: [
        ["Jane", "Smith", "Data Scientist"],
        ["John", "Doe", "Software Engineer"],
      ],
      output: [
        "Introducing Jane Smith, the Data Scientist!",
        "Introducing John Doe, the Software Engineer!",
      ],
    },
  },
  "7": {
    tag: "STRINGS",
    question_type: "Basic",
    text: "Replace 'Alice' with your favorite celebrity's name in the script. Run the code to see how it prints the new name!",
    code: "print('Brad Pitt')",
    test_cases: {
      input: [["Johnny Depp"], ["Angelina Jolie"]],
      output: ["Johnny Depp", "Angelina Jolie"],
    },
  },
  "8": {
    tag: "STRINGS",
    question_type: "Intermediate",
    text: "Change the `first_name` to 'John' and the `last_name` to 'Doe' in the script. Run the code to see the full name printed out.",
    code: "first_name = 'John'\nlast_name = 'Doe'\nprint(first_name + ' ' + last_name)",
    test_cases: {
      input: [
        ["John", "Doe"],
        ["Emma", "Watson"],
      ],
      output: ["John Doe", "Emma Watson"],
    },
  },
  "9": {
    tag: "STRINGS",
    question_type: "Advanced",
    text: "Add your name to the `names` list in the script. Run the code to see a personalized welcome message for each name, including yours.",
    code: "names = ['Anna', 'Ben', 'Cara', 'YourName']\nfor name in names:\n    print('Welcome, ' + name + '!')",
    test_cases: {
      input: [
        [["Anna", "Ben", "Cara", "YourName", "Jack"]],
        [["John", "Eva", "Michael", "YourName", "Sophia"]],
      ],
      output: [
        [
          "Welcome, Anna!",
          "Welcome, Ben!",
          "Welcome, Cara!",
          "Welcome, YourName!",
          "Welcome, Jack!",
        ],
        [
          "Welcome, John!",
          "Welcome, Eva!",
          "Welcome, Michael!",
          "Welcome, YourName!",
          "Welcome, Sophia!",
        ],
      ],
    },
  },
};

export function CodeWindow() {
  // get contents from completion_list.txt and set it to completion_list
  const [completionList, setCompletionList] = useState([]);
  const [cur_q, setcur_q] = useState(0);

  const [code, setCode] = useState("// Write your code here");
  const [question, setQuestion] = useState(
    "Write a function that takes an array of numbers and returns the sum of all the even numbers."
  ); // Set the question here
  const [startTime, setStartTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  // const [output, setOutput] = useState("");  // State for storing the output of the code
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<Message[]>([
    { role: "system", content: "You are a helpful assistant." },
  ]);
  const [status, setStatus] = useState("No Output");
  const [output, setOutput] = useState(
    "Press the run button to generate output"
  );

  const populate_completion_list = async () => {
    const res = await fetch("http://127.0.0.1:3002/get_completion_list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: 'Bearer your-token-here' // if your API requires an authorization header
      },
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    setCompletionList(data["completion_list"]);
    setcur_q(data["cur_q"]);
    const res1 = await fetch("http://127.0.0.1:3002/recommend_question", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: 'Bearer your-token-here' // if your API requires an authorization header
      },
      body: JSON.stringify({
        completion_list: data["completion_list"],
      }),
    });
    if (!res1.ok) {
      throw new Error(`HTTP error! status: ${res1.status}`);
    }
    const data1 = await res1.json();
    if (data1[0].toString() in question_mapping) {
      setQuestion(question_mapping[data1[0].toString()].text);
    }
  };

  useEffect(() => {
    setStartTime(Date.now());
    setTimerActive(true);
    populate_completion_list();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerActive) {
      interval = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 1000); // Update every second
    } else if (!timerActive) {
      clearInterval(interval!);
    }

    return () => clearInterval(interval!);
  }, [timerActive, startTime]);

  const handleEditorChange = (value: string | undefined, event: any) => {
    if (value !== undefined) {
      setCode(value);
    }
  };

  // Function to handle the execution of the code when the "Run" button is clicked.
  async function handleRunCode() {
    console.log("Running the code:", code);
    const res = await fetch("http://127.0.0.1:3002/run", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: 'Bearer your-token-here' // if your API requires an authorization header
      },
      body: JSON.stringify({
        code: code,
      }),
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    console.log(data);

    if (data["Status"] === "Success") {
      setStatus("Success");
      setOutput("Code compiled. Output is : " + data["Message"]);
    } else {
      setStatus("Error");
      setOutput(
        "Error compiling code!\n" + data["Message"] + "\nPlease try again!"
      );
    }
    console.log(status);
    console.log(output);
  }

  async function handleSubmitCode() {
    // set the completion list to completion_list.txt
    setTimerActive(false); // Stop the timer
    setElapsedTime(Date.now() - startTime);
    setStartTime(Date.now());
    // Call the API
    const time_taken = Number((elapsedTime / 1000).toFixed(2)); // Convert time_taken to a number
    if (cur_q >= 28) {
      setQuestion(
        "You have completed all the questions. Please go back to the dashboard."
      );
    }
    if (time_taken > 1800) {
      completionList[cur_q] = 0 as never;
    } else if (time_taken <= 600) {
      completionList[cur_q] = 3 as never;
    } else if (time_taken <= 1200) {
      completionList[cur_q] = 2 as never;
    } else if (time_taken <= 1800) {
      completionList[cur_q] = 1 as never;
    }
    // make a new array with the completion list + 0 for all the rest of the 28 questions
    const res = await fetch("http://127.0.0.1:3002/recommend_question", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: 'Bearer your-token-here' // if your API requires an authorization header
      },
      body: JSON.stringify({
        completion_list: completionList,
        cur_q: cur_q + 1,
      }),
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    if (data[0].toString() in question_mapping) {
      setQuestion(question_mapping[data[0].toString()].text);
    }
    const res_2 = await fetch("http://127.0.0.1:3002/write_completion_list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: 'Bearer your-token-here' // if your API requires an authorization header
      },
      body: JSON.stringify({
        completion_list: completionList,
        cur_q: cur_q + 1,
      }),
    });

    setcur_q(cur_q + 1);
  }
  // Here you could add logic to execute the code or send it to a server for safe execution.
  // Function to handle sending the chat message
  const handleSendMessage = async () => {
    if (chatMessage.trim() === "") return; // Avoid sending empty messages

    const userMessage = chatMessage;
    console.log(userMessage);
    setChatMessage(""); // Clear the message input

    const newmsg: Message = { role: "user", content: userMessage };
    setChatHistory((prevHistory) => [...prevHistory, newmsg]);

    console.log(chatHistory);

    try {
      // Send the user message to your backend
      const response = await fetch("http://127.0.0.1:3002/llm_chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(chatHistory.concat(newmsg)),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // Assume the backend returns a JSON with a 'response' field containing the AI's response

      const aiResponse = data["feedback"];
      console.log(aiResponse);

      const messageresponse: Message = {
        role: "assistant",
        content: aiResponse,
      };
      setChatHistory((prevHistory) => [...prevHistory, messageresponse]);

      // Update the chat history with the AI's response
      //setChatHistory(prevHistory => [...prevHistory, `AI: ${aiResponse}`]);
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
                {question}
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
                <Button
                  onClick={handleSubmitCode}
                  style={{ marginLeft: "10px" }}
                >
                  Submit
                </Button>
              </div>
              {/* Output window for displaying the results of the code execution */}
              <div className="mt-4 bg-gray-50 border border-gray-200 rounded p-2 text-black dark:bg-gray-900 dark:text-white">
                <strong>{status}</strong> {output}
              </div>
            </div>
          </div>
          <div className="rounded-md border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <h2 className="text-xl font-semibold">Chat</h2>
            <div className="flex flex-col h-[600px] rounded-md border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-800">
              <div className="flex-1 overflow-auto mb-4">
                {chatHistory.slice(1).map((msg, index) => (
                  <div
                    key={index}
                    className={`text-black dark:text-white p-2 ${
                      index % 2 === 0 ? "odd-item" : "even-item"
                    }`}
                  >
                    {msg["content"]}
                  </div>
                ))}
              </div>
              <div className="flex">
                <ul id="unord">
                  <li>
                    <input
                      id="inputtab"
                      type="text"
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      className="flex-1 rounded-l-md p-2 dark:bg-gray-700 dark:text-white"
                      placeholder="Type your message..."
                    />
                  </li>
                  <li>
                    <Button
                      id="sendbutton"
                      onClick={handleSendMessage}
                      className="rounded-r-md"
                    >
                      Send
                    </Button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CodeWindow;
