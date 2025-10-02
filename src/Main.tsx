import { ToDoProvider } from "./context/ToDoContext";
import Register from "./pages/Register/Register";
import ToDoForm from "./pages/ToDo/ToDoForm";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import { useLogs } from "./context/LogContext";
import Profile from "./components/Profile";
import ToDoItemPage from "./pages/ToDoItem/ToDoItemPage";

const Main = () => {
  const { log } = useLogs();

  const loggedRoutes = (
    <>
      <Route path="/todos">
        <Route
          index
          element={
            <ToDoProvider>
              <ToDoForm />
            </ToDoProvider>
          }
        />
        <Route path=":id" element={<ToDoItemPage />} />
      </Route>
      <Route index element={<Navigate to="/profile" replace />} />
      <Route path="/register" element={<Navigate to="/profile" replace />} />
      <Route path="/profile" element={<Profile />} />
    </>
  );

  const loggedOutRoutes = (
    <>
      <Route path="/todos" element={<Navigate to="/" />} />
      <Route index element={<Login />} />
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
