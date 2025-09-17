import React, { useState } from "react";
//import { useState } from 'react';
import ToDoFilter from "./ToDoFilter";
import ToDoList from "./ToDoList";
import { MoonIcon } from "@heroicons/react/24/outline";
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
      status: "pending",
    },
    {
      id: 3,
      description: "NOTE #3",
      status: "done",
    },
  ]);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredTodos = todos.filter((todo) => {
    const matchesText = todo.description
      .toLowerCase()
      .includes(searchText.toLowerCase());
    console.log("matchesText: ",todo.description, matchesText);
    const matchesStatus =
      statusFilter === "all" || todo.status === statusFilter;

    return matchesText && matchesStatus;
  });

  return (
    <div className="justify-center">
      <h1 className="mx-auto py-2 mb-8 mt-16 font-semibold lg:text-4xl md:text-3xl text-2xl">
        TODO LIST
      </h1>
      <div className="flex row justify-center gap-6">
        <ToDoFilter
          searchText={searchText}
          setSearchText={setSearchText}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
        <button className="bg-[var(--purple)] cursor-pointer rounded-md p-2 text-white">
          <MoonIcon className="h-6 w-6" />
        </button>
      </div>
      <div className="flex col gap-2 m-4 justify-center">
        <ToDoList todos={filteredTodos} setTodos={setTodos} />
      </div>
      <button
        onClick={() =>
          setTodos([
            ...todos,
            {
              id: Date.now(),
              description: "New note...",
              status: "ready",
            },
          ])
        }
        className="fixed bottom-8 right-8 bg-[var(--purple)] hover:bg-[var(--purple)] text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg"
      >
        +
      </button>
    </div>
  );
};

export default ToDoForm;
