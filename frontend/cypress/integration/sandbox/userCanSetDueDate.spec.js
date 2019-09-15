describe("", () => {
  before("Visit the site", () => {
    cy.visit("http://localhost:3000");
  });

  const index = 0; // input array index

  it("User can choose due date", () => {
    cy.get(/* reference to date picker */)
      .eq(index)
      .select(/* date */);
  });

  it("User can see due date time remaining", () => {
    cy.get(/* reference time-remaining span */)
    .should("contain", /* ßtime-remaining */)
  });
});
