import React, { useState } from "react";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
const ToDoList = ({ todos, setTodos }) => {
  const handleStatus = (id) => {
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
  const handleDelete = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const handleEdit = (id, currentText) => {
    setEditId(id);
    setEditText(currentText);
    setIsEditing(true);
  };
  const handleSaveEdit = () => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === editId ? { ...todo, description: editText } : todo
      )
    );
    setIsEditing(false);
    setEditId(null);
    setEditText("");
  };
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditId(null);
    setEditText("");
  };

  const [addText, setAddText] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const handleAdd = () => {
    setIsAdding(true);
  };
  const handleCancelAdd = () => {
    setAddText("");
    setIsAdding(false);
  };
  const handleSaveAdd = () => {
    setTodos([
      ...todos,
      { id: Date.now(), description: addText, status: "pending" },
    ]);
    setAddText("");
    setIsAdding(false);
  };
  return (
    <div className="dark:text-white]">
      {Array.isArray(todos) && todos.length > 0 ? (
        <ul>
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between py-2"
            >
              <div
                className={`flex flex-row justify-between gap-6 items-center w-80 lg:w-[50rem] ${
                  todo.status === "done"
                    ? "border-b border-t border-[var(--purple)]"
                    : ""
                }`}
              >
                <label className="flex items-center space-x-4 cursor-pointer py-4">
                  <input
                    type="checkbox"
                    className="peer hidden"
                    checked={todo.status === "done"}
                    onChange={() => handleStatus(todo.id)}
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
                    onClick={() => handleEdit(todo.id, todo.description)}
                  />
                  <TrashIcon
                    className="w-6 h-6 text-gray-400 cursor-pointer hover:text-red-500"
                    onClick={() => handleDelete(todo.id)}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col gap-8 mt-8 w-60 h-80">
          <img src="Detective.png" alt="Empty" />
          <p className="text-xl">Empty...</p>
        </div>
      )}
      <PlusIcon
        onClick={handleAdd}
        className="fixed bottom-12 right-12 bg-[var(--purple)] hover:brightness-90 text-white w-14 h-14 flex items-center justify-center text-center rounded-full text-3xl cursor-pointer z-50"
      />
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
      {isAdding && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md dark:bg-[var(--black)] dark:ring-1 dark:ring-[var(--white)]">
            <h2 className="text-xl font-semibold mb-4">NEW NOTE</h2>
            <input
              type="text"
              value={addText}
              onChange={(e) => setAddText(e.target.value)}
              className="w-full border border-[var(--purple)] dark:border-[var(--white)]  rounded-md p-2 mb-4 focus:outline-none dark:bg-[var(--black)] "
              placeholder="Input your note..."
            />
            <div className="flex justify-between mt-20">
              <button
                onClick={handleCancelAdd}
                className="bg-white hover:bg-gray-400 text-[var(--purple)] px-4 py-2 rounded-md ring-1 ring-[var(--purple)] font-semibold dark:bg-[var(--black)] "
              >
                CANCEL
              </button>
              <button
                onClick={handleSaveAdd}
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

export default ToDoList;
