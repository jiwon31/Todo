import TodoList from "../TodoList";
import { TodoPresenter, TodoPresenterImpl } from "../todo_presenter";
import renderer from "react-test-renderer";

describe("TodoList", () => {
  let present: TodoPresenter;
  beforeEach(() => {
    present = new TodoPresenterImpl([
      { id: "280a", text: "studying", status: "active" },
      { id: "280b", text: "running", status: "completed" },
    ]);
  });

  it("renders", () => {
    const component = renderer.create(
      <TodoList present={present} filter={"all"} />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
