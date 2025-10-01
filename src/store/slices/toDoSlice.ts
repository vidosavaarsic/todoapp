import { StateCreator } from "zustand";
import { ToDoItem } from "../../types";
import { Store } from "../useMainStore";
import resetter from "../resetter";

export type ToDoState = {
  toDoList: ToDoItem[];
};

export type ToDoActions = {
  addToList: (newItem: ToDoItem) => void;
  completeToDo: (id: number) => void;
  editToDoDesc: (id: number, desc: string) => void;
  deleteToDo: (id: number) => void;
};

export type ToDoSlice = ToDoState & ToDoActions;

const initialToDoState: ToDoState = {
  toDoList: [
    { id: 1, description: "NOTE #1", status: "ready" },
    { id: 2, description: "NOTE #2", status: "done" },
    { id: 3, description: "NOTE #3", status: "pending" },
  ],
};

type CreateToDoSlice = StateCreator<Store, [], [], ToDoSlice>;

export const createToDoSlice: CreateToDoSlice = (set) => {
  resetter.addResetter(() => set(initialToDoState));

  return {
    ...initialToDoState,
    addToList: (newItem: ToDoItem) => {
      set((state) => ({
        toDoList: [...state.toDoList, newItem],
      }));
    },
    completeToDo: (id: number) =>
      set((state) => ({
        toDoList: state.toDoList.map((todo) =>
          todo.id === id
            ? { ...todo, status: todo.status === "done" ? "pending" : "done" }
            : todo
        ),
      })),
    editToDoDesc: (id: number, desc: string) =>
      set((state) => ({
        toDoList: state.toDoList.map((todo) =>
          todo.id === id ? { ...todo, description: desc } : todo
        ),
      })),
    deleteToDo: (id: number) =>
      set((state) => ({
        toDoList: state.toDoList.filter((todo) => todo.id !== id),
      })),
  };
};
