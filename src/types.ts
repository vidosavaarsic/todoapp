export type FilterStatusType = "all" | "ready" | "pending" | "done";

export type ToDoStatusType = "ready" | "pending" | "done";

export type ToDoItem = {
  id: number;
  description: string;
  status: ToDoStatusType;
};
