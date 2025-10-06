import { StateCreator } from "zustand";
import { ToDoItem } from "../../types";
import { Store } from "../useMainStore";
import resetter from "../resetter";

export type ToDoState = {
  toDoList: ToDoItem[];
};

export type ToDoActions = {
  addAllToDos: (list: ToDoItem[]) => void;
  addToList: (newItem: ToDoItem) => void;
  completeToDo: (id: number) => void;
  editToDoDesc: (id: number, desc: string) => void;
  deleteToDo: (id: number) => void;
  getToDoById: (id: number) => ToDoItem | undefined;
};

export type ToDoSlice = ToDoState & ToDoActions;

const initialToDoState: ToDoState = {
  toDoList: [],
};

type CreateToDoSlice = StateCreator<Store, [], [], ToDoSlice>;

export const createToDoSlice: CreateToDoSlice = (set, get) => {
  resetter.addResetter(() => set(initialToDoState));

  return {
    ...initialToDoState,
    addAllToDos: (list: ToDoItem[]) => {
      set((state) => ({ toDoList: list }));
    },
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
    getToDoById: (id: number) => {
      return get().toDoList.find((todo) => todo.id === id);
    },
  };
};
