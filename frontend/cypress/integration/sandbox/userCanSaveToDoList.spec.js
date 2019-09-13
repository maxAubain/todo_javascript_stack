describe("User can save todo lists", () => {
  const TIMER = 1000;

  before("Visit the browser", () => {
    cy.visit("http://localhost:3000");
  });

  it("Headline content check", () => {
    cy.findByText("My ToDo Lists").should("exist");
  });

  it("Adds a todo item in the first list", () => {
    cy.findByText("First List").click();
    cy.findAllByText("What to do?").should("have.length", 1);
    cy.findByText("Add Todo").click();
    cy.wait(TIMER);
    cy.findByText("Second List").click();
    cy.findByText("First List").click();
    cy.findAllByText("What to do?").should("have.length", 2);
  });

  it("Saves new content to added todo item", () => {
    const itemText = "Second todo item";
    cy.get("input")
      .eq(1)
      .type(itemText);
    cy.wait(TIMER);
    cy.findByText("Second List").click();
    cy.findByText("First List").click();
    cy.get("input")
      .eq(1)
      .should("have.value", itemText);
  });
});
