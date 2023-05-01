describe("General view", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
  it("passes", () => {
    cy.get("header").as("my-header").should("exist");
    cy.get('[data-testid="search-container"]').should("exist");
    cy.get('[data-testid="cards-list"]').should("exist");
  });
});
