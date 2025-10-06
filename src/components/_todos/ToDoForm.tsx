import React, { useState, useMemo, useEffect } from "react";
import ToDoFilter from "./ToDoFilter";
import ToDoList from "./ToDoList";
import useMainStore from "../../store/useMainStore";
import { FilterStatusType, ToDoItem } from "../../types";
import ThemeChanger from "../ThemeChanger";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchTodos, uploadTodoList } from "../../api/mockTodoDb";

const ToDoForm: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<FilterStatusType>("all");

  const todos = useMainStore.use.toDoList();
  const addAllList = useMainStore.use.addAllToDos();



  const { isLoading, isError } = useQuery<ToDoItem[], Error>({
    queryKey: ["todosBE"],
    queryFn: async () => {
      const todosBE = await fetchTodos();

      // onSuccess.
      addAllList(todosBE);

      return todosBE;
    },
    refetchOnWindowFocus: false,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: uploadTodoList,
    onSuccess: () => {
      alert("Todos successfully saved!");
      console.log("Success!");
    },
    onError: () => {
      alert("Failed to saved todos.");
    },
  });

  const filteredTodos: ToDoItem[] = useMemo(() => {
    if (!todos) return [];

    return todos.filter((todo: ToDoItem) => {
      const matchesText = todo.description
        .toLowerCase()
        .includes(searchText.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || todo.status === statusFilter;

      return matchesText && matchesStatus;
    });
  }, [todos, searchText, statusFilter]);

  const handleSetSearchText = (search: string) => {
    setSearchText(search);
  };

  const handleStatusFilterChange = (status: FilterStatusType) => {
    setStatusFilter(status);
  };

  if (isLoading)
    return (
      <div className="text-center p-4">
        <h1 className="mx-auto py-2 mb-8 pt-16 font-semibold lg:text-4xl md:text-3xl text-2xl">
          Loading...
        </h1>
      </div>
    );

  if (isError)
    return (
      <div className="text-center p-4 text-red-500">
        <h1 className="mx-auto py-2 mb-8 pt-16 font-semibold lg:text-4xl md:text-3xl text-2xl">
          Failed to load todos.
        </h1>
      </div>
    );

  return (
    <div className="justify-center">
      <h1 className="mx-auto py-2 mb-8 pt-16 font-semibold lg:text-4xl md:text-3xl text-2xl">
        TODO LIST
      </h1>

      <div className="flex flex-row justify-center gap-6 flex-wrap-reverse p-4">
        <ToDoFilter
          searchText={searchText}
          handleSetSearchText={handleSetSearchText}
          statusFilter={statusFilter}
          handleStatusFilterChange={handleStatusFilterChange}
        />
        <ThemeChanger />
      </div>

      <div className="flex flex-col gap-2 m-4 items-center">
        <ToDoList todos={filteredTodos} />
      </div>
      <button
        onClick={() => mutate(todos)}
        disabled={isPending}
        className="mt-4 px-6 py-2 bg-[var(--purple)] text-white rounded-lg hover:brightness-110 disabled:opacity-50"
      >
        {isPending ? "Uploading..." : "Save All Changes."}
      </button>
    </div>
  );
};

export default ToDoForm;
