import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Tab from "./Tab";
const ToDoFilter = ({
  searchText,
  setSearchText,
  statusFilter,
  setStatusFilter,
}) => {
  return (
    <div className="flex items-center gap-6 flex-wrap">
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
      {/* <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="border rounded-md text-2xl h-10 bg-[var(--purple)] text-white focus:outline-none cursor-pointer"
      >
        <option value="all">ALL</option>
        <option value="ready">READY</option>
        <option value="pending">PENDING</option>
        <option value="done">DONE</option>
      </select> */}
      <div className="flex flex-row">
        <Tab
          setStatusFilter={setStatusFilter}
          text={"All"}
          color={"#e0dbed"}
          value="all"
          isActive={statusFilter === "all"}
        />
        <Tab
          setStatusFilter={setStatusFilter}
          text={"Ready"}
          color={"#f0f0f0"}
          value="ready"
          isActive={statusFilter === "ready"}
        />
        <Tab
          setStatusFilter={setStatusFilter}
          text={"Pending"}
          color={"#ffffdd"}
          value="pending"
          isActive={statusFilter === "pending"}
        />
        <Tab
          setStatusFilter={setStatusFilter}
          text={"Done"}
          color={"#edf7ed"}
          value="done"
          isActive={statusFilter === "done"}
        />
      </div>
    </div>
  );
};

export default ToDoFilter;
