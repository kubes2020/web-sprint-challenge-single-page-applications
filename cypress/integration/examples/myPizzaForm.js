describe("Test form", () => {
  it("go to url", () => {
    cy.visit("http://localhost:3000/order/pizza");
  });

  it("add text to name input", () => {
    cy.get('input[name="name"]').type("Brian");
    cy.get("#size").select("12 inch");
    cy.get("#olives").click();
    cy.get("#chicken").click();
    cy.get("button").click();
  });
});
