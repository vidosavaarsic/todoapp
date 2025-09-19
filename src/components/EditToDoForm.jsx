import React from "react";

const EditToDoForm = ({
  editText,
  setEditText,
  handleCancelEdit,
  handleSaveEdit,
}) => {
  return (
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
  );
};

export default EditToDoForm;
