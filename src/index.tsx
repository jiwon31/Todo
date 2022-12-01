import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Todo, TodoPresenterImpl } from "components/TodoList/todo_presenter";

const todoPresenter = new TodoPresenterImpl(getTodosFromLocalStorage());
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App present={todoPresenter} />
  </React.StrictMode>
);

function getTodosFromLocalStorage(): Todo[] {
  const todos = localStorage.getItem("todos");
  return todos ? JSON.parse(todos) : [];
}
