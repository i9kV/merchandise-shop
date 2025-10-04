import React from 'react';
import { FaMoon, FaSun, FaBars } from 'react-icons/fa';

interface TopbarProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  setMobileOpen: (value: boolean) => void;
}

const Topbar: React.FC<TopbarProps> = ({ darkMode, setDarkMode, setMobileOpen }) => {
  return (
    <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-md">
      {/* Left side: Mobile menu + title */}
      <div className="flex items-center gap-2">
        <button className="md:hidden" onClick={() => setMobileOpen(true)}>
          <FaBars />
        </button>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Product Dashboard
        </h1>
      </div>

      {/* Right side: Dark mode toggle */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-1 rounded bg-gray-200 dark:bg-gray-700"
        >
          {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon />}
        </button>
      </div>
    </div>
  );
};

export default Topbar;
