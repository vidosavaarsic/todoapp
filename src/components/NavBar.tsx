import "../styles/NavBar.css";
import React, { useMemo, useState, useEffect } from "react";
import { useTheme } from "./_contexts/ThemeContext";
import { Link, useLocation } from "react-router-dom";
import { useLogs } from "./_contexts/LogContext";

const NavBar: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { darkMode } = useTheme();
  const { log } = useLogs();

  const location = useLocation();

  const navBarList = useMemo(() => {
    if (log) {
      return [
        { label: "Profile", path: "/profile" },
        { label: "To Do List", path: "/todos" },
      ];
    }
    
    return [
      { label: "Login", path: "/" },
      { label: "Register", path: "/register" },
    ];
  }, [log]);

  useEffect(() => {
    const index = navBarList.findIndex((nav) => nav.path === location.pathname);
    if (index !== -1) {
      setActiveIndex(index);
    }
  }, [location.pathname, navBarList, log]);

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
      {!isMobile && (
        <ol>
          {navBarList.map((nav, index) => (
            <li key={index}>
              <Link
                to={nav.path}
                preventScrollReset={true}
                className={`nav-button ${hoveredIndex ? "hover" : ""}  ${
                  activeIndex === index ? "active" : ""
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {nav.label}
              </Link>
            </li>
          ))}
        </ol>
      )}
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
          <ol className="flex flex-col">
            {navBarList.map((nav, index) => (
              <li key={index}>
                <Link
                  to={nav.path}
                  className={`nav-button ${darkMode ? "dark" : "light"} ${
                    index === activeIndex ? "active" : ""
                  }`}
                >
                  {nav.label}
                </Link>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default NavBar;
