import React, { useState } from "react";
import {
  PencilIcon,
  TrashIcon,
  ArrowsPointingOutIcon,
} from "@heroicons/react/24/outline";
import EditToDoForm from "../_forms/EditToDoForm";
import { ToDoItem as ToDoItemType } from "../../types";
import useMainStore from "../../store/useMainStore";
import { useNavigate } from "react-router-dom";

type ToDoItemProps = {
  todo: ToDoItemType;
};

const ToDoItem: React.FC<ToDoItemProps> = ({ todo }) => {
  const editToDoDesc = useMainStore.use.editToDoDesc();
  const completeToDo = useMainStore.use.completeToDo();
  const deleteToDo = useMainStore.use.deleteToDo();

  const [editId, setEditId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();

  const handleSaveEdit = () => {
    if (editId !== null) {
      editToDoDesc(editId, editText);
      setIsEditing(false);
      setEditId(null);
      setEditText("");
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditId(null);
    setEditText("");
  };

  const handleEdit = (id: number, currentText: string) => {
    setEditId(id);
    setEditText(currentText);
    setIsEditing(true);
  };

  const handleOpenToDoItem = (id: number) => {
    navigate(`${id}`);
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
          className="hidden peer"
          checked={todo.status === "done"}
          onChange={() => completeToDo(todo.id)}
        />
        <div className="lg:w-8 lg:h-8 w-6 h-6 border border-[var(--purple)] rounded-sm flex items-center peer-checked:bg-[var(--purple)] text-white">
          <svg
            className={`w-8 h-8 text-white peer-checked:inline ${
              todo.status === "done" ? "" : "hidden"
            }`}
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
        <ArrowsPointingOutIcon
          className="w-6 h-6 cursor-pointer hover:scale-90"
          onClick={() => handleOpenToDoItem(todo.id)}
        />
        <PencilIcon
          className="w-6 h-6 text-gray-400 cursor-pointer hover:text-[var(--purple)]"
          onClick={() => handleEdit(todo.id, todo.description)}
        />
        <TrashIcon
          className="w-6 h-6 text-gray-400 cursor-pointer hover:text-red-500"
          onClick={() => deleteToDo(todo.id)}
        />
      </div>

      {isEditing && (
        <EditToDoForm
          editText={editText}
          setEditText={setEditText}
          handleCancelEdit={handleCancelEdit}
          handleSaveEdit={handleSaveEdit}
        />
      )}
    </div>
  );
};

export default ToDoItem;
