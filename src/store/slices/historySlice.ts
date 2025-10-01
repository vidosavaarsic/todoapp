import { StateCreator } from "zustand";
import { ToDoItem } from "../../types";
import { Store } from "../useMainStore";
import resetter from "../resetter";

export type HistoryState = {
  history: ToDoItem[];
};

export type HistoryActions = {
  addToHistory: (newItem: ToDoItem) => void;
};

export type HistorySlice = HistoryState & HistoryActions;

const initialHistoryState: HistoryState = {
  history: [],
};

type CreateHistorySlice = StateCreator<Store, [], [], HistorySlice>;

export const createHistorySlice: CreateHistorySlice = (set) => {
  resetter.addResetter(() => set(initialHistoryState));

  return {
    ...initialHistoryState,
    // TODO: implement this function.
    addToHistory: () => set((state) => state),
  };
};
