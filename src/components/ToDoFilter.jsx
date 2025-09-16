import React from "react";

const ToDoFilter = ({ todos, setTodos }) => {
  return (
    <div className="flex row gap-2">
      <div>Search</div>
      <div>All</div>
    </div>
  );
};

export default ToDoFilter;
