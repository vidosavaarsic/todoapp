import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import ToDoTab from "./ToDoTab";
import { FilterStatusType } from "../../types";

type ToDoFilterProps = {
  searchText: string;
  handleSetSearchText: (value: string) => void;
  statusFilter: FilterStatusType;
  handleStatusFilterChange: (status: FilterStatusType) => void;
};

const ToDoFilter: React.FC<ToDoFilterProps> = ({
  searchText,
  handleSetSearchText,
  statusFilter,
  handleStatusFilterChange,
}) => {
  return (
    <div className="flex items-center gap-6 flex-wrap justify-center">
      <div className="relative">
        <MagnifyingGlassIcon className="h-6 w-6 absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--purple)] dark:text-[var(--white)]" />
        <input
          type="text"
          placeholder="Search note..."
          value={searchText}
          onChange={(e) => handleSetSearchText(e.target.value)}
          className="px-3 py-2 border rounded-md text-sm focus:outline-none ring-1 ring-[var(--purple)] dark:ring-[var(--white)] bg-[var(--white)] dark:bg-[var(--black)] cursor-pointer text-[var(--purple)] dark:text-[var(--white)] w-80 lg:w-[40rem]"
        />
      </div>

      <div className="flex flex-row">
        <ToDoTab
          handleStatusFilterChange={handleStatusFilterChange}
          text="All"
          color="#e0dbed"
          value="all"
          isActive={statusFilter === "all"}
        />
        <ToDoTab
          handleStatusFilterChange={handleStatusFilterChange}
          text="Ready"
          color="#f0f0f0"
          value="ready"
          isActive={statusFilter === "ready"}
        />
        <ToDoTab
          handleStatusFilterChange={handleStatusFilterChange}
          text="Pending"
          color="#ffffdd"
          value="pending"
          isActive={statusFilter === "pending"}
        />
        <ToDoTab
          handleStatusFilterChange={handleStatusFilterChange}
          text="Done"
          color="#edf7ed"
          value="done"
          isActive={statusFilter === "done"}
        />
      </div>
    </div>
  );
};

export default ToDoFilter;
