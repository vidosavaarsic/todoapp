import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ToDoSlice, createToDoSlice } from "./slices/toDoSlice";
import { HistorySlice, createHistorySlice } from "./slices/historySlice";
import resetter from "./resetter";
import createSelectors from "./createSelectors";
import { BackendSlice, createBackendSlice } from "./slices/backendSlice";

export type Store = ToDoSlice & HistorySlice & BackendSlice;

const useStoreBase = create<Store>()(
  persist(
    (...args) => ({
      ...createToDoSlice(...args),
      ...createHistorySlice(...args),
      ...createBackendSlice(...args),
    }),
    {
      name: "todo-store",
      partialize: (state) => ({
        toDoList: state.toDoList,
        history: state.history,
        toDoListBE: state.toDoListBE,
      }),
    }
  )
);

const useMainStore = createSelectors(useStoreBase);

export const resetStore = () => {
  resetter.resetAll();
};

export default useMainStore;
