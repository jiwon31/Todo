import AddForm from "components/AddForm/AddForm";
import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("AddForm", () => {
  it("renders", () => {
    const component = renderer.create(<AddForm onAdd={jest.fn()} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  describe("Form Submit", () => {
    let onAdd: () => void;
    let input: HTMLInputElement;
    let button: HTMLButtonElement;

    beforeEach(() => {
      onAdd = jest.fn();
      render(<AddForm onAdd={onAdd} />);
      input = screen.getByPlaceholderText("Add Todo");
      button = screen.getByText("Add");
    });

    it("calls onAdd when button is clicked and valid todo is entered", () => {
      userEvent.type(input, "New Todo");
      userEvent.click(button);

      expect(onAdd).toHaveBeenCalledTimes(1);
    });

    it("does not call onAdd when the todo is empty", () => {
      userEvent.type(input, " ");
      userEvent.click(button);

      expect(onAdd).toHaveBeenCalledTimes(0);
    });
  });
});
