import React, { useMemo, useState, useEffect } from "react";
import { useTheme } from "./ThemeContext";

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
    <div
      style={{
        borderBottom: "1px solid var(--purple)",
        backgroundColor: darkMode ? "var(--black)" : "var(--white)",
        textAlign: "left",
        position: "relative",
      }}
    >
      {!isMobile &&
        (Array.isArray(navBarList) && navBarList.length > 0 ? (
          <ol
            style={{
              display: "flex",
            }}
          >
            {navBarList.map((nav, index) => (
              <button
                key={index}
                style={{
                  width: "8rem",
                  padding: "1rem",
                  fontSize: "1.2rem",
                  fontWeight: "700",
                  backgroundColor: index === activeIndex ? "var(--purple)" : "",
                  color: darkMode ? "var(--white)" : "var(--black)",
                  transform: hoveredIndex === index ? "scale(1.1)" : "scale(1)",
                }}
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
          style={{
            fontSize: "2.2rem",
            textAlign: "right",
            paddingRight: "1rem",
            cursor: "pointer",
            color: darkMode ? "var(--white)" : "var(--black)",
          }}
        >
          ☰
        </div>
      )}
      {isMobile && isSidebarOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "60%",
            height: "100vh",
            backgroundColor: darkMode ? "var(--black)" : "var(--white)",
            boxShadow: "2px 0 5px rgba(0,0,0,0.2)",
            padding: "0.1rem 1rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            zIndex: 999,
          }}
        >
          <div
            onClick={() => setIsSidebarOpen(false)}
            style={{
              alignSelf: "flex-end",
              fontSize: "2rem",
              cursor: "pointer",
              color: darkMode ? "var(--white)" : "var(--black)",
            }}
          >
            ×
          </div>
          {navBarList.map((nav, index) => (
            <button
              key={index}
              style={{
                padding: "1rem",
                fontSize: "1.2rem",
                backgroundColor:
                  index === activeIndex ? "var(--purple)" : "transparent",
                color: darkMode ? "var(--white)" : "var(--black)",
                border: "none",
                textAlign: "left",
                cursor: "pointer",
              }}
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
