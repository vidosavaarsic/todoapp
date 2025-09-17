import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
const ToDoFilter = ({
  searchText,
  setSearchText,
  statusFilter,
  setStatusFilter,
}) => {
  return (
    <div className="flex items-center gap-6">
      <div className="relative">
        <MagnifyingGlassIcon className="h-6 w-6 absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--purple)]" />
        <input
          type="text"
          placeholder="Search note..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="px-3 py-2 border rounded-md text-sm focus:outline-none ring-1 ring-[var(--purple)] cursor-pointer text-[var(--purple)] w-80 lg:w-[40rem]"
        />
      </div>
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="px-8 py-4 border rounded-md text-sm bg-[var(--purple)] text-white focus:outline-none cursor-pointer"
      >
        <option value="all">ALL</option>
        <option value="ready">READY</option>
        <option value="pending">PENDING</option>
        <option value="done">DONE</option>
      </select>
    </div>
  );
};

export default ToDoFilter;
