import React, { useState } from "react";
import {
  PencilIcon,
  TrashIcon,
  ArrowsPointingOutIcon,
} from "@heroicons/react/24/outline";
import EditToDoForm from "../../_forms/EditToDoForm";
import { ToDoItem as ToDoItemType } from "../../../../types";
import useMainStore from "../../../../store/useMainStore";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";

type ToDoItemProps = {
  todo: ToDoItemType;
  history?: boolean;
};

const ToDoItem: React.FC<ToDoItemProps> = ({ todo, history }) => {
  const [editId, setEditId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const editToDoDesc = useMainStore.use.editToDoDesc();
  const completeToDo = useMainStore.use.completeToDo();
  const deleteToDo = useMainStore.use.deleteToDo();
  const addToHistory = useMainStore.use.addToHistory();
  const getToDoById = useMainStore.use.getToDoById();
  const deleteOneFromHistory = useMainStore.use.deleteOneFromHistory();

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
    navigate(`/todos/${id}`);
  };

  const handleCompleteToDo = (id: number) => {
    completeToDo(id);

    if (!id) return <p></p>;
    const todo = getToDoById(+id);
    if (!todo) return <div>ToDo with {id} was not found</div>;

    if (todo.status === "done") {
      addToHistory(todo);
    } else {
      deleteOneFromHistory(todo.id);
    }
  };

  return (
    <div
      className={classNames(
        "flex flex-row justify-between gap-6 items-center w-80 lg:w-[50rem] ",
        { "border-b border-t border-[var(--purple)]": todo.status === "done" }
      )}
    >
      <label className="flex items-center space-x-4 cursor-pointer py-4">
        <input
          type="checkbox"
          className="hidden peer"
          checked={todo.status === "done"}
          onChange={() => handleCompleteToDo(todo.id)}
          disabled={history}
        />
        <div className="lg:w-8 lg:h-8 w-6 h-6 border border-[var(--purple)] rounded-sm flex items-center peer-checked:bg-[var(--purple)] text-white">
          <svg
            className={classNames("w-8 h-8 text-white peer-checked:inline ", {
              hidden: todo.status !== "done",
            })}
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            viewBox="0 0 24 24"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <strong
          className={classNames(
            "text-xl md:text-2xl lg:text-3xl font-semibold text-left",
            {
              "line-through text-gray-400": todo.status === "done",
            },
            { "dark:text-[var(--white)]": todo.status !== "done" }
          )}
        >
          {todo.description}
        </strong>
      </label>

      <div className="flex flex-row gap-2">
        <ArrowsPointingOutIcon
          className="w-6 h-6 cursor-pointer hover:scale-90"
          onClick={() => handleOpenToDoItem(todo.id)}
        />
        {!history && (
          <div className="flex flex-row">
            <PencilIcon
              className="w-6 h-6 text-gray-400 cursor-pointer hover:text-[var(--purple)]"
              onClick={() => handleEdit(todo.id, todo.description)}
            />
            <TrashIcon
              className="w-6 h-6 text-gray-400 cursor-pointer hover:text-red-500"
              onClick={() => deleteToDo(todo.id)}
            />
          </div>
        )}
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
