import useMainStore from "../store/useMainStore";
import { ToDoItem } from "../types";

const MOCK_DELAY = 1000;

export async function fetchTodos(): Promise<ToDoItem[]> {
  console.log("Mock DB: Fetching current ToDoList from Zustand...");

  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));

  const toDoList = useMainStore.getState().toDoListBE;

  return toDoList;
}

export async function uploadTodoList(newList: ToDoItem[]) {
  console.log("Mock DB: Uploading and replacing ToDoList in Zustand...");

  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));

  const setToDoList = useMainStore.getState().setToDoListBE;

  setToDoList(newList);
}
