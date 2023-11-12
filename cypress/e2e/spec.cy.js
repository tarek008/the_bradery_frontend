describe("template spec", () => {
  it("TestFilters", () => {
    cy.visit("http://localhost:3000");
    cy.viewport(1600, 1000);
    cy.wait(1000);
    cy.get("#email-input").type("tarek@gmail.com", { delay: 300 });
    cy.get("#password-input").type("123456789", { delay: 300 });
    cy.contains("button", "Me Connecter").click();
    cy.wait(5000);
    cy.get('[data-testid="my-account-link"]').click();
    cy.wait(10000);
    cy.get('[data-testid="products-link"]').click();
    cy.wait(5000);
    cy.get('[data-testid="AddtoCart"]').eq(1).click();
    cy.wait(5000);
    cy.get('[data-testid="AddtoCart"]').eq(7).click();
    cy.wait(5000);
    cy.get('[data-testid="Cart-link"]').click();
    cy.wait(5000);
    cy.get('[data-testid="empty-Cart"]').click();
    cy.wait(5000);
    cy.get('[data-testid="logout"]').click();
    cy.wait(5000);
  });
});
