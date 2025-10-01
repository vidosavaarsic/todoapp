import "../styles/NavBar.css";
import React, { useMemo, useState, useEffect } from "react";
import { useTheme } from "./_contexts/ThemeContext";
import { NavLink } from "react-router-dom";
import { useLogs } from "./_contexts/LogContext";

const NavBar: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { darkMode } = useTheme();
  const { log } = useLogs();

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
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className={`navbar ${darkMode ? "dark" : ""}`}>
      {isMobile ? (
        <>
          <div
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`burger ${darkMode ? "dark" : ""}`}
          >
            ☰
          </div>
          {isSidebarOpen && (
            <div className={`sidebar ${darkMode ? "dark" : ""}`}>
              <div
                onClick={() => setIsSidebarOpen(false)}
                className={`sidebar-close ${darkMode ? "dark" : ""}`}
              >
                ×
              </div>
              <nav>
                {navBarList.map((nav, index) => (
                  <NavLink
                    key={nav.path}
                    to={nav.path}
                    className={`nav-button ${darkMode ? "dark" : "light"}`}
                  >
                    {nav.label}
                  </NavLink>
                ))}
              </nav>
            </div>
          )}
        </>
      ) : (
        <nav>
          {navBarList.map((nav, index) => (
            <NavLink
              key={nav.path}
              to={nav.path}
              className={`nav-button ${darkMode ? "dark" : "light"}`}
            >
              {nav.label}
            </NavLink>
          ))}{" "}
        </nav>
      )}
    </div>
  );
};

export default NavBar;
