import "../styles/Login.css";
import React from "react";
import { Link } from "react-router-dom";
import { useLogs } from "./_contexts/LogContext";
const Login = () => {
  const { setLog } = useLogs();

  const handleLogin = () => {
    setLog(true);
  };
  return (
    <div>
      <Link to="/todos">
        <button onClick={() => handleLogin()}>Login</button>
      </Link>
    </div>
  );
};

export default Login;
