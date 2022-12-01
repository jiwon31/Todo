import { Filter } from "app/App";
import Header from "components/Header/Header";
import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Header", () => {
  const filters: Filter[] = ["all", "active", "completed"];
  let HeaderComponent: JSX.Element;
  let onFilterChange: () => void;

  beforeEach(() => {
    onFilterChange = jest.fn();
    HeaderComponent = (
      <Header
        filters={filters}
        filter={"all"}
        onFilterChange={onFilterChange}
      />
    );
  });

  it("renders", () => {
    const component = renderer.create(HeaderComponent);
    expect(component.toJSON()).toMatchSnapshot();
  });

  describe("Filter Click", () => {
    beforeEach(() => {
      render(HeaderComponent);
    });

    it('calls onFilterChange when clicking "all" button', () => {
      const button = screen.getByText("all");
      userEvent.click(button);

      expect(onFilterChange).toHaveBeenCalledTimes(1);
      expect(onFilterChange).toHaveBeenCalledWith(filters[0]);
    });

    it('calls onFilterChange when clicking "active" button', () => {
      const button = screen.getByText("active");
      userEvent.click(button);

      expect(onFilterChange).toHaveBeenCalledTimes(1);
      expect(onFilterChange).toHaveBeenCalledWith(filters[1]);
    });

    it('calls onFilterChange when clicking "completed" button', () => {
      const button = screen.getByText("completed");
      userEvent.click(button);

      expect(onFilterChange).toHaveBeenCalledTimes(1);
      expect(onFilterChange).toHaveBeenCalledWith(filters[2]);
    });
  });
});
