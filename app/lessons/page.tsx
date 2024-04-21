"use client";

import React, { useState } from 'react';
import Link from 'next/link';

// Types for the modal props
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

// Modal component
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
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
              Close
            </button>
          </div>
        </div>
      </div>
  );
};

// Lessons component
const Lessons: React.FC = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const openModal = (modalName: string) => () => {
    setActiveModal(modalName);
  };

  const closeModal = () => {
    setActiveModal(null);
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
            {['Comments', 'Strings', 'Output', 'Variables'].map((lesson) => (
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
        {['Comments', 'Strings', 'Output', 'Variables'].map((lesson) => (
            <Modal
                key={lesson}
                isOpen={activeModal === lesson.toLowerCase()}
                onClose={closeModal}
                title={lesson}
            >
              <p>{`Here's detailed information about ${lesson.toLowerCase()} in Python...`}</p>
            </Modal>
        ))}
      </main>
  );
}

export default Lessons;
