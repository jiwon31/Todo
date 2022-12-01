import { Todo } from "components/TodoList/todo_presenter";
import { BsFillTrashFill } from "react-icons/bs";
import styles from "./TodoItem.module.css";

type TodoItemProps = {
  todo: Todo;
  onDelete: (deleted: Todo) => void;
  onUpdate: (updated: Todo) => void;
};

export default function TodoItem({ todo, onDelete, onUpdate }: TodoItemProps) {
  const { id, text, status } = todo;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const status = e.target.checked ? "completed" : "active";
    onUpdate({ ...todo, status });
  };

  const handleDelete = () => onDelete(todo);

  return (
    <li className={styles.todo}>
      <input
        className={styles.checkbox}
        data-testid="checkbox"
        id={id}
        type="checkbox"
        checked={status === "completed"}
        onChange={handleChange}
      />
      <label
        htmlFor={id}
        className={`${styles.text} ${
          status === "completed" && styles.completed
        }`}
        data-testid="todo-text"
      >
        {text}
      </label>
      <button className={styles.button} title="delete" onClick={handleDelete}>
        <BsFillTrashFill />
      </button>
    </li>
  );
}
