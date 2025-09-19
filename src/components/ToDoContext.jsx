import { createContext, useContext, useState } from "react";

const ToDoContext = createContext();

export const ToDoProvider = ({ children }) => {
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

  const addToDo = (desc) => {
    setTodos([
      ...todos,
      { id: Date.now(), description: desc, status: "pending" },
    ]);
  };

  const editStatus = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              status: todo.status === "done" ? "pending" : "done",
            }
          : todo
      )
    );
  };

  const editDesc = (id, desc) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, description: desc } : todo
      )
    );
  };

  const deleteToDo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <ToDoContext.Provider
      value={{ todos, addToDo, editDesc, editStatus, deleteToDo }}
    >
      {children}
    </ToDoContext.Provider>
  );
};

export const useTodos = () => useContext(ToDoContext);
