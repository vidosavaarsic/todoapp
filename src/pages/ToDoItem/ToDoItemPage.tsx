import React from "react";
import useMainStore from "../../store/useMainStore";
import { useParams } from "react-router-dom";
import "./ItemPage.css";

const ToDoItemPage = () => {
  const { id } = useParams<{ id: string }>();
  const getToDoById = useMainStore.use.getToDoById();

  if (!id) return <div>Invalid route.</div>;
  const todo = getToDoById(+id);

  if (!todo) return <div>ToDo with {id} was not found</div>;

  return (
    <div className="formPage">
      <h1 className="title">{todo.description}</h1>
      <article>
        <p>{todo.status}</p>
      </article>
    </div>
  );
};

export default ToDoItemPage;
