import React from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useTheme } from "./_contexts/ThemeContext";

const ThemeChanger = () => {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
        />
        <div
          className={`w-16 h-10  rounded-full transition-colors duration-500 bg-transparent ring-1 ${
            darkMode ? "ring-[var(--grey)]" : "ring-[var(--lgrey)]"
          }`}
        ></div>
        <span
          className={`absolute left-1 top-1 lg:top-1 md:top-2 w-8 h-8 rounded-full transition-transform duration-500 peer-checked:translate-x-6 flex items-center justify-center text-[var(--purple)] ring-1 bg-transparent ${
            darkMode ? "ring-[var(--grey)]" : "ring-[var(--lgrey)]"
          }`}
        >
          {darkMode ? (
            <SunIcon className="w-4 h-4" />
          ) : (
            <MoonIcon className="w-4 h-4" />
          )}
        </span>
      </label>
    </div>
  );
};

export default ThemeChanger;
