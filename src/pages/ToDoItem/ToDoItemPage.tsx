import React from "react";
import useMainStore from "../../store/useMainStore";
import { useParams } from "react-router-dom";
import "./ItemPage.css";
import {
  CheckCircleIcon,
  EllipsisHorizontalCircleIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";

const ToDoItemPage = () => {
  const { id } = useParams<{ id: string }>();
  const getToDoById = useMainStore.use.getToDoById();

  if (!id) return <div>Invalid route.</div>;
  const todo = getToDoById(+id);

  if (!todo) return <div>ToDo with {id} was not found</div>;

  return (
    <div>
      <h1 className="title">{todo.description}</h1>

      <div className="status">
        <strong>Status:</strong>

        <div className="badge">
          {todo.status}
          {todo.status === "done" ? (
            <CheckCircleIcon />
          ) : todo.status === "pending" ? (
            <EllipsisHorizontalCircleIcon />
          ) : (
            <HandThumbUpIcon />
          )}
        </div>
      </div>
    </div>
  );
};

export default ToDoItemPage;
