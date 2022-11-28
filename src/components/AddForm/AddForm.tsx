import { Todo } from "components/TodoList/TodoList";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./AddForm.module.css";

type AddFormProps = {
  onAdd: (todo: Todo) => void;
};

export default function AddForm({ onAdd }: AddFormProps) {
  const [text, setText] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // trim() 메서드는 문자열 양 끝의 공백을 제거하고 원본 문자열을 수정하지 않고 새로운 문자열을 반환한다.
    if (text.trim().length === 0) {
      return;
    }
    onAdd({ id: uuidv4(), text, status: "active" });
    setText("");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        placeholder="Add Todo"
        value={text}
        onChange={handleChange}
      ></input>
      <button className={styles.button}>Add</button>
    </form>
  );
}
