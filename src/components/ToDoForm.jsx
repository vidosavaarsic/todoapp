import React, { useState, useMemo } from "react";
import ToDoFilter from "./ToDoFilter";
import ToDoList from "./ToDoList";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useTheme } from "./ThemeContext";

const ToDoForm = () => {
  const [todos, setTodos] = useState([
    {
      id: 1,
      description: "NOTE #1",
      status: "ready",
    },
    {
      id: 2,
      description: "NOTE #2",
      status: "done",
    },
    {
      id: 3,
      description: "NOTE #3",
      status: "pending",
    },
  ]);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { darkMode, setDarkMode } = useTheme();

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      const matchesText = todo.description
        .toLowerCase()
        .includes(searchText.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || todo.status === statusFilter;
      console.log("Tu sam...");
      return matchesText && matchesStatus;
    });
  }, [todos, searchText, statusFilter]);

  return (
    <div className="justify-center">
      <h1 className="mx-auto py-2 mb-8 pt-16 font-semibold lg:text-4xl md:text-3xl text-2xl">
        TODO LIST
      </h1>
      <div className="flex flex-row justify-center gap-6 flex-wrap-reverse p-4">
        <ToDoFilter
          searchText={searchText}
          setSearchText={setSearchText}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
        <button
          className="bg-[var(--purple)] cursor-pointer rounded-md p-2 text-white hover:brightness-90"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? (
            <SunIcon className="h-6 w-8" />
          ) : (
            <MoonIcon className="h-6 w-8" />
          )}
        </button>
      </div>
      <div className="flex col gap-2 m-4 justify-center h-[60vh]">
        <ToDoList todos={filteredTodos} setTodos={setTodos} />
      </div>
    </div>
  );
};

export default ToDoForm;
