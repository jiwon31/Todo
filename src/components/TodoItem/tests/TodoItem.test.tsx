import { Todo } from "components/TodoList/todo_presenter";
import TodoItem from "../TodoItem";
import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("TodoItem", () => {
  const todo: Todo = { id: "280a", text: "studying", status: "active" };
  let TodoItemComponent: JSX.Element;
  let onDelete: () => void;
  let onUpdate: () => void;

  beforeEach(() => {
    onDelete = jest.fn();
    onUpdate = jest.fn();
    TodoItemComponent = (
      <TodoItem todo={todo} onDelete={onDelete} onUpdate={onUpdate} />
    );
  });

  it("renders", () => {
    const component = renderer.create(TodoItemComponent);
    expect(component.toJSON()).toMatchSnapshot();
  });

  describe("Button Click", () => {
    beforeEach(() => {
      render(TodoItemComponent);
    });

    it('calls onDelete when clicking the "delete" button', () => {
      const button = screen.getByTitle("delete");
      userEvent.click(button);

      expect(onDelete).toHaveBeenCalledTimes(1);
      expect(onDelete).toHaveBeenCalledWith(todo);
    });

    it('calls onUpdate when clicking the "checkbox"', () => {
      const checkbox = screen.getByTestId("checkbox");
      userEvent.click(checkbox);

      expect(onUpdate).toHaveBeenCalledTimes(1);
      expect(onUpdate).toHaveBeenCalledWith({ ...todo, status: "completed" });
    });

    it('calls onUpdate when clicking the "label text"', () => {
      const text = screen.getByLabelText("studying");
      userEvent.click(text);

      expect(onUpdate).toHaveBeenCalledTimes(1);
      expect(onUpdate).toHaveBeenCalledWith({ ...todo, status: "completed" });
    });
  });
});
