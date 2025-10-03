import React from "react";
import useMainStore from "../../store/useMainStore";
import classNames from "classnames";

const History = () => {
  const deleteAllToDoHistory = useMainStore.use.deleteAllToDoHistory();
  const todoHistory = useMainStore.use.history();

  const handleDeleteAllToDoHistory = () => {
    deleteAllToDoHistory();
  };

  return (
    <div>
      <div className="title">History</div>
      <button
        onClick={handleDeleteAllToDoHistory}
        className="bg-[var(--white)] hover:bg-[var(--lgrey)] dark:bg-[var(--black)] text-[var(--red)] font-semibold px-4 py-2 rounded-md ring-1 ring-[var(--red)]"
      >
        Delete History
      </button>
      <div className="flex mt-20">
        <ul
          className={classNames(
            "flex flex-col gap-8 items-center w-full text-4xl text-left"
          )}
        >
          {todoHistory.map((todo, index) => (
            <li
              key={index}
              className={classNames({
                "border-b border-t border-[var(--purple)] lg:w-1/2 w-80 p-4":
                  todo.status === "done",
              })}
            >
              <div>{todo.description}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default History;
