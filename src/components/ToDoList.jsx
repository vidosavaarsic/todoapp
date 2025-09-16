import React from "react";
import { PencilIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/outline";
const ToDoList = ({ todos, setTodos }) => {
  const handleToggle = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              status: todo.status === "done" ? "pending" : "done",
            }
          : todo
      )
    );
  };

  return (
    <div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="flex items-center justify-between py-2">
            <div
              className={`flex row justify-between gap-6 items-center w-80 lg:w-[50rem] ${
                todo.status === "done"
                  ? "border-b border-t border-purple-500"
                  : ""
              }`}
            >
              <label className="flex items-center space-x-4 cursor-pointer py-4">
                <input
                  type="checkbox"
                  className="peer hidden"
                  checked={todo.status === "done"}
                  onChange={() => handleToggle(todo.id)}
                />
                <div className="lg:w-8 lg:h-8 w-6 h-6 border border-purple-500 rounded-sm flex items-center peer-checked:bg-purple-500 text-white">
                  <svg
                    className="w-8 h-8 text-white peer-checked:block"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <strong
                  className={`text-xl md:text-2xl lg:text-3xl font-semibold ${
                    todo.status === "done"
                      ? "line-through text-gray-400"
                      : "text-gray-800"
                  }`}
                >
                  {todo.description}
                </strong>
              </label>
              <div className="flex row gap-1">
                <PencilIcon className="w-4 h-4 text-gray-400 cursor-pointer" />
                <TrashIcon className="w-4 h-4 text-gray-400 cursor-pointer" />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
