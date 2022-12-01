import {
  Todo,
  TodoPresenter,
  TodoPresenterImpl,
} from "components/TodoList/todo_presenter";

describe("Todos", () => {
  const todos: Todo[] = [
    { id: "280a", text: "studying", status: "active" },
    { id: "280b", text: "running", status: "completed" },
  ];
  let presenter: TodoPresenter;
  let update: () => void;

  beforeEach(() => {
    presenter = new TodoPresenterImpl(todos);
    update = jest.fn();
  });

  it("inits with todos", () => {
    expect(presenter.getTodos()).toEqual(todos);
  });

  it("adds new todo to the list", () => {
    presenter.add({ id: "280c", text: "drawing", status: "active" }, update);

    expect(presenter.getTodos().length).toBe(3);
    expect(presenter.getTodos()[2]?.text).toBe("drawing");
    expect(presenter.getTodos()[2]?.status).toBe("active");
    checkUpdateIsCalled();
  });

  it("deletes todo from the list", () => {
    presenter.delete(
      { id: "280a", text: "studying", status: "active" },
      update
    );

    expect(presenter.getTodos().length).toBe(1);
    expect(presenter.getTodos()[0]?.text).toBe("running");
    checkUpdateIsCalled();
  });

  describe("updates", () => {
    it("updates status of todo", () => {
      presenter.update(
        { id: "280a", text: "studying", status: "completed" },
        update
      );

      expect(presenter.getTodos()[0]?.status).toBe("completed");
      expect(presenter.getTodos().length).toBe(2);
      checkUpdateIsCalled();
    });

    it("does not create new todo when status not changed", () => {
      const todos = presenter.getTodos();
      presenter.update(
        { id: "280a", text: "studying", status: "completed" },
        update
      );
      const updated = presenter.getTodos();

      expect(todos[1]).toBe(updated[1]);
    });
  });

  describe("returns filtered todos when filter changed", () => {
    it('when filter is "all"', () => {
      expect(presenter.getFilteredTodos("all")).toEqual(todos);
    });

    it('when filter is "active"', () => {
      const filterd = presenter.getFilteredTodos("active");

      expect(filterd.length).toBe(1);
      expect(filterd[0]?.status).toBe("active");
    });

    it('when filter is "completed"', () => {
      presenter.add(
        { id: "280c", text: "drawing", status: "completed" },
        update
      );
      const filterd = presenter.getFilteredTodos("completed");

      expect(filterd.length).toBe(2);
      filterd.forEach((todo) => expect(todo.status).toBe("completed"));
    });
  });

  function checkUpdateIsCalled() {
    expect(update).toHaveBeenCalledTimes(1);
    expect(update).toHaveBeenCalledWith(presenter.getTodos());
  }
});
