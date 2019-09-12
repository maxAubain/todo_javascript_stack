describe("User can save todo lists", () => {
  before("Visit the browser", () => {
    cy.visit("http://localhost:3000");
  });

  it("Simple header check", () => {
    cy.get("#headline").should("contain", "My ToDo Lists");
  });

  it("Adds a todo item in the first list", () => {
    cy.get("#0000000001").click()
    cy.get("#add-todo").click()
  });
});
