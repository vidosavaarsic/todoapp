import { StateCreator } from "zustand";
import { ToDoItem } from "../../types";
import { Store } from "../useMainStore";
import resetter from "../resetter";

export type HistoryState = {
  history: ToDoItem[];
};

export type HistoryActions = {
  addToHistory: (newItem: ToDoItem) => void;
  getAllToDoHistory: () => ToDoItem[];
  deleteAllToDoHistory: () => void;
  deleteOneFromHistory: (id: number) => void;
};

export type HistorySlice = HistoryState & HistoryActions;

const initialHistoryState: HistoryState = {
  history: [],
};

type CreateHistorySlice = StateCreator<Store, [], [], HistorySlice>;

export const createHistorySlice: CreateHistorySlice = (set, get) => {
  resetter.addResetter(() => set(initialHistoryState));

  return {
    ...initialHistoryState,
    addToHistory: (newItem: ToDoItem) =>
      set((state) => ({ history: [...state.history, newItem] })),
    getAllToDoHistory: () => {
      return get().history;
    },
    deleteAllToDoHistory: () => set({ history: [] }),
    deleteOneFromHistory: (id: number) =>
      set((state) => ({
        history: state.history.filter((todo) => todo.id !== id),
      })),
  };
};
