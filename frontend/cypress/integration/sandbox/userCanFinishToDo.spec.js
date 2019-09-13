describe("User can finish todo list items", () => {
  before("Visit the browser", () => {
    cy.visit("http://localhost:3000");
  });

  it("Headline content check", () => {
    cy.findByText("My ToDo Lists").should("exist");
  });

  it("User can finish todo list item by marking checkbox", () => {
    cy.findByText("First List").click();

    const index = 0;
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
});
