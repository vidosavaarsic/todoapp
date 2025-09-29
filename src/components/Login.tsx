import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLogs } from "./_contexts/LogContext";
import ThemeChanger from "./ThemeChanger";
import { useTheme } from "./_contexts/ThemeContext";

const Login = () => {
  const { log, setLog } = useLogs();
  const { darkMode } = useTheme();

  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Prevent default submit");
    if (true) {
      //validation true
      setLog(true);
    }
  };

  useEffect(() => {
    if (log) {
      navigate("/profile", { replace: true });
    }
  }, [log, navigate]);

  return (
    <div className="formPage">
      <h1 className="title">Login</h1>
      <br />
      <ThemeChanger />
      <form className={`form`} onSubmit={handleSubmit}>
        <label htmlFor="email"> Your Email </label>
        <input
          type="email"
          id="email"
          className={`inputInForm ${darkMode ? "dark" : ""}`}
        />

        <label htmlFor="password"> Password </label>
        <input
          type="password"
          id="password"
          className={`inputInForm ${darkMode ? "dark" : ""}`}
        />

        <button className="submitInForm">submit</button>
      </form>
    </div>
  );
};

export default Login;
