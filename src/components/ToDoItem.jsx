import React from "react";
import { useTodos } from "./ToDoContext";
import { useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

const ToDoItem = ({ todo }) => {
  const { editStatus, deleteToDo, editDesc } = useTodos();
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveEdit = () => {
    editDesc(editId, editText);
    setIsEditing(false);
    setEditId(null);
    setEditText("");
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditId(null);
    setEditText("");
  };
  const handEdit = (id, currentText) => {
    setEditId(id);
    setEditText(currentText);
    setIsEditing(true);
  };

  return (
    <div
      className={`flex flex-row justify-between gap-6 items-center w-80 lg:w-[50rem] ${
        todo.status === "done" ? "border-b border-t border-[var(--purple)]" : ""
      }`}
    >
      <label className="flex items-center space-x-4 cursor-pointer py-4">
        <input
          type="checkbox"
          className="peer hidden"
          checked={todo.status === "done"}
          onChange={() => editStatus(todo.id)}
        />
        <div className="lg:w-8 lg:h-8 w-6 h-6 border border-[var(--purple)] rounded-sm flex items-center peer-checked:bg-[var(--purple)] text-white">
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
          className={`text-xl md:text-2xl lg:text-3xl font-semibold text-left ${
            todo.status === "done"
              ? "line-through text-gray-400"
              : "dark:text-[var(--white)]"
          }`}
        >
          {todo.description}
        </strong>
      </label>
      <div className="flex flex-row gap-2">
        <PencilIcon
          className="w-6 h-6 text-gray-400 cursor-pointer hover:text-[var(--purple)]"
          onClick={() => handEdit(todo.id, todo.description)}
        />
        <TrashIcon
          className="w-6 h-6 text-gray-400 cursor-pointer hover:text-red-500"
          onClick={() => deleteToDo(todo.id)}
        />
      </div>
      {isEditing && (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-100">
          <div className="p-6 rounded-xl shadow-lg w-[90%] max-w-md bg-white dark:bg-[var(--black)] dark:ring-1 dark:ring-[var(--white)]">
            <h2 className="text-xl font-semibold mb-4">EDIT NOTE</h2>
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="w-full border border-[var(--purple)] dark:border-[var(--white)] rounded-md p-2 mb-4 focus:outline-none dark:bg-[var(--black)] "
            />
            <div className="flex justify-between mt-20">
              <button
                onClick={handleCancelEdit}
                className="hover:bg-gray-400 text-[var(--purple)] px-4 py-2 rounded-md ring-1 ring-[var(--purple)] font-semibold dark:bg-[var(--black)]"
              >
                CANCEL
              </button>
              <button
                onClick={handleSaveEdit}
                className="bg-[var(--purple)] hover:brightness-90 text-white px-4 py-2 rounded-md font-semibold"
              >
                APPLY
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToDoItem;
