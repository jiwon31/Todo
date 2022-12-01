import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  TodoPresenter,
  TodoPresenterImpl,
} from "components/TodoList/todo_presenter";
import App from "app/App";

describe("App", () => {
  let presenter: TodoPresenter;
  beforeEach(() => {
    presenter = new TodoPresenterImpl([
      { id: "280a", text: "studying", status: "active" },
      { id: "280b", text: "running", status: "completed" },
      { id: "280c", text: "eating", status: "active" },
    ]);

    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it("renders", () => {
    const component = renderer.create(<App present={presenter} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  describe("Component", () => {
    beforeEach(() => {
      render(<App present={presenter} />);
    });

    it("adds a todo", () => {
      const input = screen.getByPlaceholderText("Add Todo");
      const button = screen.getByText("Add");
      userEvent.type(input, "drawing");
      userEvent.click(button);
      const text = screen.getAllByTestId("todo-text")[3]!;
      expect(text.innerHTML).toBe("drawing");
    });

    it("deletes a todo", () => {
      const button = screen.getAllByTitle("delete")[0]!;
      userEvent.click(button);
      const text = screen.getAllByTestId("todo-text")[0]!;
      expect(text.innerHTML).not.toBe("studying");
    });

    it("checks a checkbox", () => {
      const checkbox = screen.getAllByTestId("checkbox")[0]!;
      userEvent.click(checkbox);
      expect(checkbox).toBeChecked();
    });

    describe("Filter", () => {
      it("selects 'active' filter", () => {
        const button = screen.getByText("active");
        userEvent.click(button);
        const text = screen.getAllByTestId("todo-text")[1]!;
        expect(text.innerHTML).toBe("eating");
      });

      it("selects 'completed' filter", () => {
        const button = screen.getByText("completed");
        userEvent.click(button);
        const text = screen.getAllByTestId("todo-text")[0]!;
        expect(text.innerHTML).toBe("running");
      });
    });
  });
});
