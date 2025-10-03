import React, { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import useMainStore from "../../../../store/useMainStore";
import ToDoItem from "../ToDoItem/ToDoItem";
import AddToDoForm from "../../_forms/AddToDoForm";
import { ToDoItem as ToDoItemType } from "../../../../types";

type ToDoListProps = {
  todos: ToDoItemType[];
};

const ToDoList: React.FC<ToDoListProps> = ({ todos }) => {
  const [addText, setAddText] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const addToList = useMainStore.use.addToList();

  const handleAdd = () => {
    setIsAdding(true);
  };

  const handleCancelAdd = () => {
    setAddText("");
    setIsAdding(false);
  };

  const handleSaveAdd = () => {
    if (addText.trim() === "") return;
    addToList({ id: Date.now(), description: addText, status: "pending" });
    setAddText("");
    setIsAdding(false);
  };

  return (
    <div className="dark:text-white">
      {Array.isArray(todos) && todos.length > 0 ? (
        <ul>
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between py-2"
            >
              <ToDoItem todo={todo} />
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

      {isAdding && (
        <AddToDoForm
          addText={addText}
          setAddText={setAddText}
          handleCancelAdd={handleCancelAdd}
          handleSaveAdd={handleSaveAdd}
        />
      )}
    </div>
  );
};

export default ToDoList;
