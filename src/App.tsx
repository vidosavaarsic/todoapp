import React from "react";
import "./App.css";
import ToDoForm from "./components/ToDoForm";
import { ThemeProvider } from "./components/ThemeContext";
import { ToDoProvider } from "./components/ToDoContext";

const App = () => {
  return (
    <ThemeProvider>
      <div className="App min-h-screen bg-[var(--white)] dark:bg-[var(--black)] dark:text-[var(--white)]">
        <ToDoProvider>
          <ToDoForm />
        </ToDoProvider>
      </div>
    </ThemeProvider>
  );
};

export default App;
