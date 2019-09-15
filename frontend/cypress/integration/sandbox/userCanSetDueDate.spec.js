describe("", () => {
  before("Visit the site", () => {
    cy.visit("http://localhost:3000");
  });

  it("User can see due date prompt, set due date, and check item complete", () => {
    cy.findByText("First List").click();

    cy.findByText("Please set a due date").should("exist");

    cy.get("input")
      .eq(1)
      .type("2021-10-11");

    cy.findByText("Please set a due date").should("not.exist");

    cy.get('[type="checkbox"]')
      .eq(0)
      .click();

    cy.findByText("Item complete").should("exist");
  });
});
