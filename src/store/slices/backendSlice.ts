import { StateCreator } from "zustand";
import { ToDoItem } from "../../types";
import { Store } from "../useMainStore";
import resetter from "../resetter";

export type BaskendState = {
  toDoListBE: ToDoItem[];
};

export type BaskendActions = {
  setToDoListBE: (newList: ToDoItem[]) => void;
};

export type BackendSlice = BaskendState & BaskendActions;

const initialBackendState: BaskendState = {
  toDoListBE: [
    { id: 4, description: "NOTE #4", status: "ready" },
    { id: 5, description: "NOTE #5", status: "done" },
    { id: 6, description: "NOTE #6", status: "pending" },
  ],
};

type CreateToDoSlice = StateCreator<Store, [], [], BackendSlice>;

export const createBackendSlice: CreateToDoSlice = (set, get) => {
  resetter.addResetter(() => set(initialBackendState));

  return {
    ...initialBackendState,
    setToDoListBE: (newList: ToDoItem[]) => set({ toDoListBE: newList }),
  };
};
