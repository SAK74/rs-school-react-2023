describe("home test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("search result", () => {
    cy.get("input[name=name]").type("rick");

    cy.get('[name="status"]').select("alive");
    cy.get('[name="gender"]').select("female");

    cy.get("button").click();

    cy.contains(/rick/i).should("exist");
    cy.contains(/alive/i).should("exist");
    cy.contains(/female/i).should("exist");
  });
});
