import React, { useState } from "react";
import ThemeChanger from "./ThemeChanger";
import { useTheme } from "./_contexts/ThemeContext";

const Register = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { darkMode } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
    } else {
      setErrorMessage("");
      console.log("Form submitted successfully!");
      // Submit logic here
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (errorMessage && e.target.value === confirmPassword) {
      setErrorMessage("");
    }
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
    if (errorMessage && password === e.target.value) {
      setErrorMessage("");
    }
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
          required
        />

        <label htmlFor="lname"> Last Name </label>
        <input
          type="text"
          id="lname"
          name="lname"
          className={`inputInForm ${darkMode ? "dark" : ""}`}
          required
        />

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
          value={password}
          onChange={handlePasswordChange}
          className={`inputInForm ${darkMode ? "dark" : ""}`}
          required
        />

        <label htmlFor="confirmPass"> Confirm Password </label>
        <input
          type="password"
          id="confirmPass"
          name="confirmPass"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          className={`inputInForm ${darkMode ? "dark" : ""}`}
          required
        />
        {errorMessage && (
          <p className="text-red-500">Passwords do not match!</p>
        )}
        <button className="submitInForm">Submit</button>
      </form>
    </div>
  );
};

export default Register;
