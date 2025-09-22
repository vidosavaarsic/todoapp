import React, { useMemo, useState, useEffect } from "react";
import { useTheme } from "./ThemeContext";
import "../styles/NavBar.css";

const NavBar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { darkMode } = useTheme();

  const navBarList = useMemo(() => {
    return ["Nav 1", "Nav 2", "Nav 3"];
  }, []);

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className={`navbar ${darkMode ? "dark" : ""}`}>
      {!isMobile &&
        (Array.isArray(navBarList) && navBarList.length > 0 ? (
          <ol>
            {navBarList.map((nav, index) => (
              <button
                key={index}
                className={`nav-button ${hoveredIndex ? "hover" : ""}  ${
                  activeIndex === index ? "active" : ""
                }`}
                onClick={() => handleClick(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {nav}
              </button>
            ))}
          </ol>
        ) : (
          <div></div>
        ))}
      {isMobile && (
        <div
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={`burger ${darkMode ? "dark" : ""}`}
        >
          ☰
        </div>
      )}
      {isMobile && isSidebarOpen && (
        <div className={`sidebar ${darkMode ? "dark" : ""}`}>
          <div
            onClick={() => setIsSidebarOpen(false)}
            className={`sidebar-close ${darkMode ? "dark" : ""}`}
          >
            ×
          </div>
          {navBarList.map((nav, index) => (
            <button
              key={index}
              className={`nav-button ${darkMode ? "dark" : "light"} ${
                index === activeIndex ? "active" : ""
              }`}
              onClick={() => handleClick(index)}
            >
              {nav}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavBar;
