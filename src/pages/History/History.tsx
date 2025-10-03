import React from "react";
import useMainStore from "../../store/useMainStore";
import classNames from "classnames";
import ToDoItem from "../ToDo/components/ToDoItem/ToDoItem";

const History = () => {
  const todoHistory = useMainStore.use.history();

  return (
    <div>
      <div className="title">Archive of Completed Tasks</div>
      <div className="flex mt-20">
        <ul
          className={classNames(
            "flex flex-col gap-8 items-center w-full text-2xl text-left"
          )}
        >
          {todoHistory.map((todo, index) => (
            <li key={index}>
              <ToDoItem todo={todo} history={true} readonly={true} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default History;
