describe("General view", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("elements should be display", () => {
    cy.get("header").as("my-header").should("exist");
    cy.get('[data-testid="search-container"]').should("exist");
    cy.get('[data-testid="cards-list"]').should("exist");
  });

  it("navigation", () => {
    cy.get('[href="/about_us"]').click();
    cy.url().should("include", "/about_us");
    cy.get('[href="/form"]').click();
    cy.url().should("include", "/form");
  });
});
