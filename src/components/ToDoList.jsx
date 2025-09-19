import React, { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useTodos } from "./ToDoContext";
import ToDoItem from "./ToDoItem";
import AddToDoForm from "./AddToDoForm";
const ToDoList = ({ todos }) => {
  const { addToDo } = useTodos();

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
    addToDo(addText);
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
          setAddText={setAddText}
          handleCancelAdd={handleCancelAdd}
          handleSaveAdd={handleSaveAdd}
        />
      )}
    </div>
  );
};

export default ToDoList;
