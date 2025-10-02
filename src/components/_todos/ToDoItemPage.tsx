import "../../styles/ItemPage.css";
import React from "react";
import useMainStore from "../../store/useMainStore";
import { useParams } from "react-router-dom";

const ToDoItemPage = () => {
  const { id } = useParams<{ id: string }>();
  const getToDoById = useMainStore.use.getToDoById();

  const todo = id ? getToDoById(Number(id)) : null;

  return (
    <div className="formPage">
      <h1 className="title">{todo?.description}</h1>
      <article>
        <p>{todo?.status}</p>
      </article>
    </div>
  );
};

export default ToDoItemPage;
