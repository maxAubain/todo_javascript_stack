describe("User can save todo lists", () => {
  before("Visit the browser", () => {
    cy.visit("http://localhost:3000");
  });
  
  it("Headline content check", () => {
    cy.findByText("My ToDo Lists").should("exist");
  });

  it("Adds a todo item in the first list", () => {
    cy.findByText("First List").click()
    cy.findByText("Add Todo").click()
  });
});
