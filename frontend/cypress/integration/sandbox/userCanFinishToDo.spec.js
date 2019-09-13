describe("User can finish todo list items", () => {
  before("Visit the browser", () => {
    cy.visit("http://localhost:3000");
  });

  it("Headline content check", () => {
    cy.findByText("My ToDo Lists").should("exist");
  });

  const index = 0; // Todo list item index
  const TIMER = 1000;  // Autosave wait time

  it("User can finish todo list item by marking checkbox", () => {
    cy.findByText("First List").click();

    cy.get("input")
      .eq(index)
      .then($inpt => {
        expect($inpt).to.have.class("textFieldUnfinished");

        cy.get('[type="checkbox"]')
          .eq(index)
          .check();
        expect($inpt).to.have.class("textFieldFinished");
      });
  });

  it("User can save finished todo list item", () => {
    cy.get('[type="checkbox"]')
      .eq(index)
      .check();
    cy.wait(TIMER);

    cy.findByText("Second List").click();
    cy.findByText("First List").click();

    cy.get("input").eq(index).should("have.class", "textFieldFinished")
  });
});
