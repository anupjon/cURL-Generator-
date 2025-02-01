import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from './components/Header';
import ErrorBoundary from './components/ErrorBoundary';
import HuggingFaceGenerator from './components/HuggingFaceGenerator';
import CivitaiGenerator from './components/CivitaiGenerator';

const App = () => {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-800 transition-colors">
      <Header isDark={isDark} toggleTheme={toggleTheme} />
      <ErrorBoundary>
        <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800">
          <div className="w-full max-w-2xl space-y-8">
            <div className="p-6 shadow-lg rounded-lg bg-white dark:bg-gray-900 dark:text-white">
              <HuggingFaceGenerator />
            </div>
            <div className="p-6 shadow-lg rounded-lg bg-white dark:bg-gray-900 dark:text-white">
              <CivitaiGenerator />
            </div>
          </div>
          <ToastContainer theme={isDark ? 'dark' : 'light'} />
        </div>
      </ErrorBoundary>
    </div>
  );
};

export default App;