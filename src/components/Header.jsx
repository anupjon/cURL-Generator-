import React from 'react';
import ThemeToggle from './ThemeToggle';

const Header = ({ isDark, toggleTheme }) => {
  return (
    <header className="sticky top-0 w-full bg-white dark:bg-gray-900 shadow-md z-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-4xl" role="img" aria-label="curl">🔄</span>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            cURL Generator
          </h1>
        </div>
        <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
      </div>
    </header>
  );
};

export default Header;