import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ToDoSlice, createToDoSlice } from "./slices/toDoSlice";
import { HistorySlice, createHistorySlice } from "./slices/historySlice";
import resetter from "./resetter";
import createSelectors from "./createSelectors";

export type Store = ToDoSlice & HistorySlice;

const useStoreBase = create<Store>()(
  persist(
    (...args) => ({
      ...createToDoSlice(...args),
      ...createHistorySlice(...args),
    }),
    {
      name: "todo-store",
      partialize: (state) => ({
        toDoList: state.toDoList,
        history: state.history,
      }),
    }
  )
);

const useMainStore = createSelectors(useStoreBase);

export const resetStore = () => {
  resetter.resetAll();
};

export default useMainStore;
