import { createContext, use, useState, ReactNode } from "react";
import { ToDoItem } from "../types";

type ToDoContextType = {
  todos: ToDoItem[];
  addToDo: (desc: string) => void;
  editStatus: (id: number) => void;
  editDesc: (id: number, desc: string) => void;
  deleteToDo: (id: number) => void;
};

const ToDoContext = createContext<ToDoContextType | undefined>(undefined);

type ToDoProviderProps = {
  children: ReactNode;
};

export const ToDoProvider = ({ children }: ToDoProviderProps) => {
  const [todos, setTodos] = useState<ToDoItem[]>([
    { id: 1, description: "NOTE #1", status: "ready" },
    { id: 2, description: "NOTE #2", status: "done" },
    { id: 3, description: "NOTE #3", status: "pending" },
  ]);

  const addToDo = (desc: string) => {
    setTodos([
      ...todos,
      { id: Date.now(), description: desc, status: "pending" },
    ]);
  };

  const editStatus = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, status: todo.status === "done" ? "pending" : "done" }
          : todo
      )
    );
  };

  const editDesc = (id: number, desc: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, description: desc } : todo
      )
    );
  };

  const deleteToDo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <ToDoContext.Provider
      value={{ todos, addToDo, editStatus, editDesc, deleteToDo }}
    >
      {children}
    </ToDoContext.Provider>
  );
};

export const useTodos = (): ToDoContextType => {
  const context = use(ToDoContext);
  if (!context) {
    throw new Error("");
  }
  return context;
};
