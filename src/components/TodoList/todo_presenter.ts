import { Filter } from "App";

export interface TodoPresenter {
  getTodos(): Todo[];
  add(added: Todo, update: UpdateTodo): void;
  delete(deleted: Todo, update: UpdateTodo): void;
  update(updated: Todo, update: UpdateTodo): void;
  getFilteredTodos(filter: Filter): Todo[];
}

export type Todo = {
  id: string;
  text: string;
  status: "active" | "completed";
};
type UpdateTodo = (todos: Todo[]) => void;

export class TodoPresenterImpl implements TodoPresenter {
  constructor(private todos: Todo[]) {}

  getTodos(): Todo[] {
    return this.todos;
  }

  add(added: Todo, update: UpdateTodo) {
    this.todos = [...this.todos, added];
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
