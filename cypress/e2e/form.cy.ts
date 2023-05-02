describe("Form page testing", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get('[href="/form"]').click();
  });

  it("Submit add card after fill all fields", () => {
    cy.get("button").contains("Submit").as("sbmtBtn").should("be.disabled");
    cy.get("input[name=firstName]").type("John");
    cy.get("input[name=lastName]").type("Connor");
    cy.get("input[name=date]").type("1999-04-01");
    cy.get("select[name=nat]").select("FI");
    cy.get("input[type=email]").type("example@ex.com");
    cy.get('[data-testid="file-field"]').selectFile({
      contents: Cypress.Buffer.from("file contents"),
      fileName: "file.png",
      mimeType: "image/png",
    });
    cy.get("input[type=checkbox]").filter("[name=check]").check();
    cy.get("@sbmtBtn").should("be.enabled").click();
    cy.get('[data-testid="wrapper"]').should("exist").click();
    cy.get(".modal__content").should("be.visible");
    cy.get('[data-testid="close-modal-btn"]').click();
    cy.get(".modal__content").should("not.be.visible");
  });
});
