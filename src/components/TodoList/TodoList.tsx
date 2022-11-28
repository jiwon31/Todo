import { Filter } from "App";
import AddForm from "components/AddForm/AddForm";
import TodoItem from "components/TodoItem/TodoItem";
import { useState, useEffect } from "react";
import styles from "./TodoList.module.css";

export type Todo = {
  id: string;
  text: string;
  status: "active" | "completed";
};

type TodoListProps = {
  filter: Filter;
};

export default function TodoList({ filter }: TodoListProps) {
  /* ⭐ 중요 포인트!
  컴포넌트가 리렌더링될 때마다 useState도 다시 호출이 되어서 초기값이 다시 전달되는데, useState 내부적으로 저장된 값이 있다면 초기값을 무시하고 내부적으로 사용하고 있는 값을 사용한다.
  함수를 호출해서 데이터를 읽어오는 경우(로컬스토리지나 파일, 네트워크 통신 등), 컴포넌트가 리렌더링될 때마다 계속 데이터를 읽어온다.
  그리고 내부적으로 다시 읽어온 값을 쓰지 않고 원래 가지고 있는 값을 사용한다. UI상으로 업데이트 되지 않아도 계속 불필요하게 초기값을 읽어오게 된다.
  초기값으로 함수를 호출하는 경우라면(특히, 함수 안에서 무거운 일을 하는 경우라면) 함수를 호출한 값 자체를 전달하는 것이 아니라 콜백함수로 한 단계 감싸줘야 한다.
  => 초기값이 필요한 경우에만 전달한 함수를 호출해서 초기값을 얻는다. */
  const [todos, setTodos] = useState<Todo[]>(() => getTodosFromLocalStorage());

  const handleAdd = (todo: Todo) => setTodos([...todos, todo]);

  const handleDelete = (deleted: Todo) =>
    setTodos(todos.filter((todo) => todo.id !== deleted.id));

  const handleUpdate = (updated: Todo) =>
    setTodos(todos.map((todo) => (todo.id === updated.id ? updated : todo)));

  /* ✅ useEffect
  1. 특정한 값이 변경될 때마다 무언가 하고 싶다면
    리액트에서 state가 변경이 되어서 UI를 업데이트하는 흐름이 아니라 side effect으로(부가적으로), state가 변경이 되어서 UI가 업데이트될 때마다 추가적으로 해줘야되는게 있다면
  2. 컴포넌트가 마운트될 때 처음으로 해줘야될 것이 있다면
  3. 컴포넌트가 언마운트될 때 정리해줘야될 것이 있다면  */
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const filterd = getFilteredItems(todos, filter);
  return (
    <section className={styles.container}>
      <ul className={styles.list}>
        {filterd.map((item) => (
          <TodoItem
            key={item.id}
            todo={item}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </ul>
      <AddForm onAdd={handleAdd} />
    </section>
  );
}

function getFilteredItems(todos: Todo[], filter: Filter): Todo[] {
  if (filter === "all") {
    return todos;
  }
  return todos.filter((todo) => todo.status === filter);
}

function getTodosFromLocalStorage(): Todo[] {
  const todos = localStorage.getItem("todos");
  return todos ? JSON.parse(todos) : [];
}
