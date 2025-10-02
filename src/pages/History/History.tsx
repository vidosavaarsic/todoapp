import React from "react";
import useMainStore from "../../store/useMainStore";

const History = () => {
  const addToHistory = useMainStore.use.addToHistory();
  const getAllToDoHistory = useMainStore.use.getAllToDoHistory();

  const handleAddToHistory = () => {
    addToHistory({ id: 4, description: "string", status: "done" });
    console.log(getAllToDoHistory());
  };

  return (
    <div>
      <div>History</div>
      <div>
        <button onClick={handleAddToHistory}>Dodajjj</button>
      </div>
    </div>
  );
};

export default History;
