import "../styles/NavBar.css";
import React, { useMemo, useState, useEffect } from "react";
import { useTheme } from "./_contexts/ThemeContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useLogs } from "./_contexts/LogContext";

const NavBar: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { darkMode } = useTheme();
  const { log, setLog } = useLogs();

  const navigate = useNavigate();
  const location = useLocation();

  const navBarList = useMemo(() => {
    if (log) {
      return [
        { label: "Profile", path: "/profile" },
        { label: "To Do List", path: "/todos" },
        { label: "Log out", path: "/" },
      ];
    } else {
      return [
        { label: "Login", path: "/" },
        { label: "Register", path: "/register" },
      ];
    }
  }, [log]);

  const handleClick = (index: number, nav: string, path: string) => {
    if (nav === "Log out") {
      setLog(false);
      navigate("/", { replace: true });
    } else {
      navigate(path);
    }
  };

  useEffect(() => {
    const index = navBarList.findIndex((nav) => nav.path === location.pathname);
    if (index !== -1) {
      setActiveIndex(index);
    }
  }, [location.pathname, navBarList]);

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
                onClick={() => handleClick(index, nav.label, nav.path)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {nav.label}
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
              onClick={() => handleClick(index, nav.label, nav.path)}
            >
              {nav.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavBar;
