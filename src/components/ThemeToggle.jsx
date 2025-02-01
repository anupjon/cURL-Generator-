import React from 'react';

const ThemeToggle = ({ isDark, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
    >
      {isDark ? (
        <span className="text-2xl" role="img" aria-label="light mode">☀️</span>
      ) : (
        <span className="text-2xl" role="img" aria-label="dark mode">🌙</span>
      )}
    </button>
  );
};

export default ThemeToggle;
