import "./NavBar.css";
import React, { useMemo, useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { NavLink } from "react-router-dom";
import { useLogs } from "../../context/LogContext";
import classNames from "classnames";

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
    <div className={classNames("navbar", { dark: darkMode })}>
      {isMobile ? (
        <>
          <div
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={classNames("burger", { dark: darkMode })}
          >
            ☰
          </div>
          {isSidebarOpen && (
            <div className={classNames("sidebar", { dark: darkMode })}>
              <div
                onClick={() => setIsSidebarOpen(false)}
                className={classNames("sidebar-close", { dark: darkMode })}
              >
                ×
              </div>
              <nav>
                {navBarList.map((nav, index) => (
                  <NavLink
                    key={nav.path}
                    to={nav.path}
                    className={classNames("nav-button", { dark: darkMode })}
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
