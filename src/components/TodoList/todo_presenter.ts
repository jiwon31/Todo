import { Filter } from "App";

export type Todo = {
  id: string;
  text: string;
  status: "active" | "completed";
};
type UpdateTodo = (todos: Todo[]) => void;

export default class TodoPresenter {
  constructor(private todos: Todo[]) {}

  getTodos(): Todo[] {
    return this.todos;
  }

  add(todo: Todo, update: UpdateTodo) {
    this.todos = [...this.todos, todo];
    update(this.todos);
  }

  delete(deleted: Todo, update: UpdateTodo) {
    this.todos = this.todos.filter((todo) => todo.id !== deleted.id);
    update(this.todos);
  }

  update(updated: Todo, update: UpdateTodo) {
    this.todos = this.todos.map((todo) =>
      todo.id === updated.id ? updated : todo
    );
    update(this.todos);
  }

  getFilteredTodos(filter: Filter): Todo[] {
    if (filter === "all") {
      return this.todos;
    }
    return this.todos.filter((todo) => todo.status === filter);
  }
}
