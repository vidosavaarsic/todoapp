import React from "react";
import { FilterStatusType } from "../../../../types";

type TabProps = {
  handleStatusFilterChange: (value: FilterStatusType) => void;
  text: string;
  color: string;
  value: FilterStatusType;
  isActive: boolean;
};

const ToDoTab: React.FC<TabProps> = ({
  handleStatusFilterChange,
  text,
  color,
  value,
  isActive,
}) => {
  return (
    <div className="m-1 dark:text-[var(--black)]">
      <button
        style={{ backgroundColor: color }}
        className={`p-2 w-20 ${
          isActive ? "ring-1 ring-[var(--purple)] hover:resize-x" : ""
        }`}
        onClick={() => handleStatusFilterChange(value)}
      >
        {text}
      </button>
    </div>
  );
};

export default ToDoTab;
