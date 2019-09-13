describe("User can finish todo list items", () => {
  before("Visit the browser", () => {
    cy.visit("http://localhost:3000");
  });

  it("Headline content check", () => {
    cy.findByText("My ToDo Lists").should("exist");
  });

  const index = 0; // Todo list item index
  const TIMER = 1000; // Autosave wait time

  it("Todo list item starts unfinished", () => {
    cy.findByText("First List").click();

    cy.get('[type="checkbox"]')
      .eq(index)
      .should("have.value", "false");
  });

  it("User can finish todo list item and save", () => {
    cy.get('[type="checkbox"]')
      .eq(index)
      .check();
    cy.wait(TIMER);
    
    cy.get('[type="checkbox"]')
      .eq(index)
      .should("have.value", "true");
    
      cy.findByText("Second List").click();
      cy.findByText("First List").click();
  
      cy.get('[type="checkbox"]')
        .eq(index)
        .should("have.value", "true");
  });
});
