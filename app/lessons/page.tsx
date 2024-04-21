"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import result from 'postcss/lib/result';
import { title } from 'process';

const data = [
    "Ironically, the first thing we’re going to do is show how to tell a computer to ignore a part of a program. Text written in a program but not run by the computer is called a comment. Python interprets anything after a # as a comment. Comments can: Provide context for why something is written the way it is: # This variable will be used to count the number of times anyone tweets the word persnickety persnickety_count = 0",
    "Now what we’re going to do is teach our computer to communicate. The gift of speech is valuable: a computer can answer many questions we have about 'how' or 'why' or 'what' it is doing. In Python, the print() function is used to tell a computer to talk. The message to be printed should be surrounded by quotes: # from Mary Shelley's Frankenstein print('There is something at work in my soul, which I do not understand.')",
    "Computer programmers refer to blocks of text as strings. In our last exercise, we created the string 'Hello world!'. In Python a string is either surrounded by double quotes ('Hello world') or single quotes ('Hello world'). It doesn’t matter which kind you use, just be consistent.",
    "Programming languages offer a method of storing data for reuse. If there is a greeting we want to present, a date we need to reuse, or a user ID we need to remember we can create a variable which can store a value. In Python, we assign variables by using the equals sign (=). message_string = 'Hello there' # Prints 'Hello there' print(message_string)",
    "Humans are prone to making mistakes. Humans are also typically in charge of creating computer programs. To compensate, programming languages attempt to understand and explain mistakes made in their programs. Python refers to these mistakes as errors and will point to the location where an error occurred with a ^ character. When programs throw errors that we didn’t expect to encounter we call those errors bugs. Programmers call the process of updating the program so that it no longer produces unexpected errors debugging. Two common errors that we encounter while writing Python are SyntaxError and NameError.",
    "Computers can understand much more than just strings of text. Python has a few numeric data types. It has multiple ways of storing numbers. Which one you use depends on your intended purpose for the number you are saving. An integer, or int, is a whole number. It has no decimal point and contains all counting numbers (1, 2, 3, ...) as well as their negative counterparts and the number 0. A floating-point number, or a float, is a decimal number. It can be used to represent fractional quantities as well as precise measurements. Numbers can be assigned to variables or used literally in a program: an_int = 2 a_float = 2.1 print(an_int + 3) # Output: 5",
    "Computers absolutely excel at performing calculations. The 'compute' in their name comes from their historical association with providing answers to mathematical questions. Python performs the arithmetic operations of addition, subtraction, multiplication, and division with +, -, *, and /. # Prints '500' print(573 - 74 + 1) # Prints '50' print(25 * 2) # Prints '2.0' print(10 / 5) Notice that when we perform division, the result has a decimal place. This is because Python converts all ints to floats before performing division. In older versions of Python (2.7 and earlier) this conversion did not happen, and integer division would always round down to the nearest integer. Division can throw its own special error: ZeroDivisionError. Python will raise this error when attempting to divide by 0.",
    "The + operator doesn’t just add two numbers, it can also 'add' two strings! The process of combining two strings is called string concatenation. Performing string concatenation creates a brand new string comprised of the first string’s contents followed by the second string’s contents (without any added space in-between). greeting_text = 'Hey there!' question_text = 'How are you doing?' full_text = greeting_text + question_text # Prints 'Hey there!How are you doing?' print(full_text)",
    "Python offers a shorthand for updating variables. When you have a number saved in a variable and want to add to the current value of the variable, you can use the += (plus-equals) operator. # First we have a variable with a number saved number_of_miles_hiked = 12 # Then we need to update that variable # Let's say we hike another two miles today number_of_miles_hiked += 2",
    "In this lesson, we accomplished a lot of things! We instructed our computers to print messages, we stored these messages as variables, and we learned to update those messages depending on the part of the program we were in. We performed mathematical calculations and explored some of the mathematical expressions that Python offers us. We learned about errors and other valuable skills that will continue to serve us as we develop our programming skills.\n" + "Good job!"
    ];

// Modal component
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          {children}
          <div className="mt-4 flex justify-end">
            <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-700 focus:outline-none"
            >
              Done
            </button>
          </div>
        </div>
      </div>
  );
};

// Lessons component
const Lessons = () => {
  const [activeModal, setActiveModal] = useState(null);

  const openModal = (modalName) => () => {
    setActiveModal(modalName);
  };

  const closeModal = (lesson) => {
    localStorage.setItem('lastRead', lesson.toLowerCase());
    const lastReadModule = localStorage.getItem('lastRead');
    setActiveModal(null);
    var val = -1;
    if (lastReadModule === "print") {
        val = 0
    }
    else if (lastReadModule === "strings") {
        val = 1
    }
    else if (lastReadModule === "variables") {
        val = 2
    }
    else if (lastReadModule === "numbers") {
        val = 3
    }
    else if (lastReadModule === "calculations") {
        val = 4
    }
    else if (lastReadModule === "concatenations") {
        val = 5
    }
    else if (lastReadModule === "plus equals") {
        val = 6
    }
    console.log(val)
  };

  return (
      <main className="w-full max-w-6xl mx-auto py-12 px-4 md:px-6">
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-sans">Python Fundamentals</h1>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 font-sans">
              Dive into the core concepts of Python programming with our curated lessons.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* Individual lesson card with modal trigger */}
            {['Comments', 'Print', 'Strings', 'Variables', 'Errors', 'Numbers', 'Calculations', 'Concatenations', 'Plus Equals', 'Review'].map((lesson) => (
                <div key={lesson} className="bg-white rounded-lg shadow-md dark:bg-gray-800 dark:text-gray-200">
                  <div className="p-6 space-y-4">
                    <h2 className="text-2xl font-bold font-sans">{lesson}</h2>
                    <p className="text-gray-500 dark:text-gray-400 font-sans">
                      {`Explore the essential concepts and techniques of ${lesson.toLowerCase()}.`}
                    </p>
                    <button
                        onClick={openModal(lesson.toLowerCase())}
                        className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200 dark:focus:ring-gray-300 font-sans"
                    >
                      Learn More
                    </button>
                  </div>
                </div>
            ))}
          </div>
        </div>
        {/* Modal instances for each lesson */}
        {['Comments', 'Print', 'Strings', 'Variables', 'Errors', 'Numbers', 'Calculations', 'Concatenations', 'Plus Equals', 'Review'].map((lesson, idx) => (
            <Modal
                key={lesson}
                isOpen={activeModal === lesson.toLowerCase()}
                onClose={() => {closeModal(lesson)}}
                title={lesson}
            >
              {/* <p>{`${lesson.toLowerCase()}`}</p> */}
              <p>{data[idx]}</p>
            </Modal>
        ))}
      </main>
  );
}

export default Lessons;