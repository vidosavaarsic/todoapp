import { ToDoProvider } from "./_contexts/ToDoContext";
import Register from "./Register";
import ToDoForm from "./_todos/ToDoForm";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import { useLogs } from "./_contexts/LogContext";
import Profile from "./Profile";

const Main = () => {
  const { log } = useLogs();

  return (
    <div className="App min-h-screen bg-[var(--white)] dark:bg-[var(--black)] dark:text-[var(--white)]">
      <Routes>
        <Route
          path="/todos"
          element={
            log ? (
              <ToDoProvider>
                <ToDoForm />
              </ToDoProvider>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/"
          element={!log ? <Login /> : <Navigate to="/profile" replace />}
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={log ? <Profile /> : <Navigate to="/" replace />}
        />
      </Routes>
    </div>
  );
};

export default Main;
