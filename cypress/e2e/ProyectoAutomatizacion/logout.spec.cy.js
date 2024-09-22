describe('Pruebas de Logout', () => {
    it('Logout', () => {
        cy.visit("https://www.saucedemo.com/v1/index.html");
        cy.wait(2000);
        cy.get("#user-name").click().type("standard_user");
        cy.wait(2000);
        cy.get("#password").click().type("secret_sauce");
        cy.wait(2000);
        cy.get("#login-button").click();
        cy.wait(2000);
        cy.url().should('include', '/inventory.html');
        cy.get("#menu_button_container > div > div:nth-child(3) > div > button").click();
        cy.wait(2000);
        cy.get("#logout_sidebar_link").click();
        cy.url().should('include', '/index.html');
    });
});