import React from "react";

const AddToDoForm = ({
  addText,
  setAddText,
  handleCancelAdd,
  handleSaveAdd,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md dark:bg-[var(--black)] dark:ring-1 dark:ring-[var(--white)]">
        <h2 className="text-xl font-semibold mb-4">NEW NOTE</h2>
        <input
          type="text"
          value={addText}
          onChange={(e) => setAddText(e.target.value)}
          className="w-full border border-[var(--purple)] dark:border-[var(--white)]  rounded-md p-2 mb-4 focus:outline-none dark:bg-[var(--black)] "
          placeholder="Input your note..."
        />
        <div className="flex justify-between mt-20">
          <button
            onClick={handleCancelAdd}
            className="bg-white hover:bg-gray-400 text-[var(--purple)] px-4 py-2 rounded-md ring-1 ring-[var(--purple)] font-semibold dark:bg-[var(--black)] "
          >
            CANCEL
          </button>
          <button
            onClick={handleSaveAdd}
            className="bg-[var(--purple)] hover:brightness-90 text-white px-4 py-2 rounded-md font-semibold"
          >
            APPLY
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddToDoForm;
