import React, { useState, useMemo } from "react";
import ToDoFilter from "./ToDoFilter";
import ToDoList from "./ToDoList";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useTheme } from "./ThemeContext";
import { useTodos } from "./ToDoContext";
import { FilterStatusType, ToDo } from "../types";

const ToDoForm: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<FilterStatusType>("all");

  const { darkMode, setDarkMode } = useTheme();
  const { todos } = useTodos();

  const filteredTodos: ToDo[] = useMemo(() => {
    return todos.filter((todo: ToDo) => {
      const matchesText = todo.description
        .toLowerCase()
        .includes(searchText.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || todo.status === statusFilter;

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

        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          <div className="w-16 h-10 bg-gray-300 peer-focus:outline-none peer-focus:none rounded-full transition-colors duration-300"></div>
          <span className="absolute left-1 top-1 lg:top-2 w-8 h-8 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-6 flex items-center justify-center text-[var(--purple)]">
            {darkMode ? (
              <SunIcon className="w-4 h-4" />
            ) : (
              <MoonIcon className="w-4 h-4" />
            )}
          </span>
        </label>
      </div>

      <div className="flex col gap-2 m-4 justify-center h-[60vh]">
        <ToDoList todos={filteredTodos} />
      </div>
    </div>
  );
};

export default ToDoForm;
