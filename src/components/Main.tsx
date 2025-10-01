import { ToDoProvider } from "./_contexts/ToDoContext";
import Register from "./Register";
import ToDoForm from "./_todos/ToDoForm";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import { useLogs } from "./_contexts/LogContext";
import Profile from "./Profile";

const Main = () => {
  const { log } = useLogs();

  const loggedRoutes = (
    <>
      <Route
        path="/todos"
        element={
          <ToDoProvider>
            <ToDoForm />
          </ToDoProvider>
        }
      />
      <Route path="/" element={<Navigate to="/profile" replace />} />
      <Route path="/register" element={<Navigate to="/profile" replace />} />
      <Route path="/profile" element={<Profile />} />
    </>
  );

  const loggedOutRoutes = (
    <>
      <Route path="/todos" element={<Navigate to="/" />} />
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Navigate to="/" replace />} />
    </>
  );

  return (
    <div className="App min-h-screen bg-[var(--white)] dark:bg-[var(--black)] dark:text-[var(--white)]">
      <Routes>{log ? loggedRoutes : loggedOutRoutes}</Routes>
    </div>
  );
};

export default Main;
