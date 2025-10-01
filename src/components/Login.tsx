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
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="email"> Your Email </label>
        <input
          type="email"
          id="email"
          name="email"
          className={`inputInForm ${darkMode ? "dark" : ""}`}
          required
        />

        <label htmlFor="password"> Password </label>
        <input
          type="password"
          id="password"
          name="password"
          className={`inputInForm ${darkMode ? "dark" : ""}`}
          required
          pattern="^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).+$"
          minLength={6}
          maxLength={20}
        />

        <button className="submitInForm">Submit</button>
      </form>
    </div>
  );
};

export default Login;
