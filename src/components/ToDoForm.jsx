import React, { useState } from "react";
//import { useState } from 'react';
import ToDoFilter from "./ToDoFilter";
import ToDoList from "./ToDoList";
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
  return (
    <div className="items-center justify-center">
      <h1 className="mx-auto py-2 mb-4 mt-16 font-semibold lg:text-4xl md:text-3xl text-2xl">
        TODO LIST
      </h1>
      <div className="flex row justify-center gap-2">
        <ToDoFilter todos={todos} setTodos={setTodos} />
        <div>Mod</div>
      </div>
      <div className="flex col gap-2 m-4 justify-center">
        <ToDoList todos={todos} setTodos={setTodos} />
      </div>
    </div>
  );
};

export default ToDoForm;
