import React from "react";
import "./App.css";
import ToDoForm from "./components/ToDoForm";
import { ThemeProvider } from "./components/ThemeContext";
import { ToDoProvider } from "./components/ToDoContext";
import NavBar from "./components/NavBar";
const App = () => {
  return (
    <ThemeProvider>
      <header>
        <NavBar />
      </header>
      <div className="App min-h-screen bg-[var(--white)] dark:bg-[var(--black)] dark:text-[var(--white)]">
        <ToDoProvider>
          <ToDoForm />
        </ToDoProvider>
      </div>
    </ThemeProvider>
  );
};

export default App;
