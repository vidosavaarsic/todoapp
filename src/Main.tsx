import { Routes, Route, Navigate } from "react-router-dom";
import { ToDoProvider } from "./context/ToDoContext";
import Register from "./pages/Register/Register";
import ToDoForm from "./pages/ToDo/ToDoForm";
import Login from "./pages/Login/Login";
import Profile from "./components/Profile";
import ToDoItemPage from "./pages/ToDoItem/ToDoItemPage";
import ProtectedRoute from "./components/ProtectedRoute";
import History from "./pages/History/History";

const Main = () => {
  return (
    <div className="App min-h-screen bg-[var(--white)] dark:bg-[var(--black)] dark:text-[var(--white)]">
      <Routes>
        <Route index element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route
            path="/todos"
            element={
              <ToDoProvider>
                <ToDoForm />
              </ToDoProvider>
            }
          />
          <Route path="/todos/:id" element={<ToDoItemPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/history" element={<History />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default Main;
