import React from "react";
import ThemeChanger from "./ThemeChanger";
import { useTheme } from "./_contexts/ThemeContext";

const Register = () => {
  const { darkMode } = useTheme();

  const handleRegister = () => {
    console.log("Registration done.");
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Prevent default submit");
  };

  return (
    <div className="formPage">
      <h1 className="title">Registration</h1>
      <br />
      <ThemeChanger />
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="fname"> First Name </label>
        <input
          type="text"
          id="fname"
          name="fname"
          className={`inputInForm ${darkMode ? "dark" : ""}`}
        />

        <label htmlFor="lname"> Last Name </label>
        <input
          type="text"
          id="lname"
          name="lname"
          className={`inputInForm ${darkMode ? "dark" : ""}`}
        />

        <label htmlFor="email"> Your Email </label>
        <input
          type="email"
          id="email"
          name="email"
          className={`inputInForm ${darkMode ? "dark" : ""}`}
        />

        <label htmlFor="password"> Password </label>
        <input
          type="password"
          id="password"
          name="password"
          className={`inputInForm ${darkMode ? "dark" : ""}`}
        />

        <button className="submitInForm" onClick={() => handleRegister()}>
          submit
        </button>
      </form>
    </div>
  );
};

export default Register;
