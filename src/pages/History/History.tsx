import React from "react";
import useMainStore from "../../store/useMainStore";
import classNames from "classnames";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";

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
            <li
              key={index}
              className={classNames({
                "flex flex-row items-center gap-4 border-b border-t border-[var(--purple)] lg:w-1/2 w-80 p-4":
                  todo.status === "done",
              })}
            >
              <CheckBadgeIcon className="w-12 h-12 text-green-500" />
              <div>{todo.description}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default History;
