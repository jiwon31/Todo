import "@testing-library/cypress/add-commands";

describe("Todo App", () => {
  it("renders", () => {
    cy.visit("/");
  });

  describe("Todo test", () => {
    beforeEach(() => {
      cy.visit("/");
      const todos = ["책 읽기", "공부하기", "밥 먹기"];
      todos.forEach((todo) => {
        cy.findByPlaceholderText("Add Todo").type(todo);
        cy.findByText("Add").click();
      });
    });

    it("changes dark mode", () => {
      cy.findByTestId("theme").click();
      cy.get("html").should("have.class", "dark");
    });

    it("adds new todo at the end", () => {
      const newTodo = "장보기";
      cy.findByPlaceholderText("Add Todo").type(newTodo);
      cy.findByText("Add").click();
      cy.findAllByTestId("todo-text").last().should("have.text", newTodo);
      cy.findAllByTestId("checkbox").last().should("not.be.checked");
    });

    it("checks the checkbox of a todo", () => {
      cy.findAllByTestId("checkbox").first().check().should("be.checked");
    });

    it("deletes a todo", () => {
      cy.findAllByTitle("delete").first().click();
      cy.findAllByTestId("todo-text").findByText("책 읽기").should("not.exist");
    });

    describe("select filter", () => {
      beforeEach(() => {
        cy.findAllByTestId("checkbox").first().check();
      });

      it('select an "all" filter', () => {
        cy.findByText("all").click();
        cy.findAllByTestId("checkbox").should("have.length", 3);
      });

      it('select an "active" filter', () => {
        cy.findByText("active").click();
        cy.findAllByTestId("checkbox").should("have.length", 2);
        cy.findAllByTestId("checkbox").each((item) => {
          cy.wrap(item).should("not.be.checked");
        });
      });

      it('select a "completed" filter', () => {
        cy.findByText("completed").click();
        cy.findAllByTestId("checkbox").should("have.length", 1);
        cy.findAllByTestId("checkbox").each((item) => {
          cy.wrap(item).should("be.checked");
        });
      });
    });
  });
});
