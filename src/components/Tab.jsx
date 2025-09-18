import React from "react";

const Tab = ({ setStatusFilter, text, color, value, isActive }) => {
  return (
    <div className="m-1">
      <button
        style={{ backgroundColor: color }}
        className={`p-2 w-20 ${
          isActive ? "ring-1 ring-[var(--purple)] hover:resize-x" : ""
        }`}
        onClick={() => setStatusFilter(value)}
      >
        {text}
      </button>
    </div>
  );
};

export default Tab;
