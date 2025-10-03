import React, { useState, useMemo } from "react";
import ToDoFilter from "./ToDoFilter";
import ToDoList from "./ToDoList";
import useMainStore from "../../store/useMainStore";
import { FilterStatusType, ToDoItem } from "../../types";
import ThemeChanger from "../ThemeChanger";
// import { useQuery } from "@tanstack/react-query";
// import { fetchTodos } from "../../api/mockTodoDb";

const ToDoForm: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<FilterStatusType>("all");

  const todos = useMainStore.use.toDoList();

  // TODO: Implementirati prvobitno pribavljanje liste preko api poziva.
  // const {
  //   data: todosBE,
  //   isLoading,
  //   isError,
  // } = useQuery<ToDoItem[], Error>({
  //   queryKey: ["todosBE"],
  //   // queryFn predstavlja mock api poziva.
  //   queryFn: fetchTodos,
  // });

  const filteredTodos: ToDoItem[] = useMemo(() => {
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
    </div>
  );
};

export default ToDoForm;
