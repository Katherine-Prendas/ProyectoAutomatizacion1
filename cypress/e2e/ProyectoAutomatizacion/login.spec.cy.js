describe('Pruebas para login', () => {
    
        it('Login exitoso', () => {
            cy.visit("https://www.saucedemo.com/v1/index.html");
            cy.wait(2000);
            cy.get("#user-name").click().type("standard_user");
            cy.wait(2000);
            cy.get("#password").click().type("secret_sauce");
            cy.wait(2000);
            cy.get("#login-button").click();
            cy.url().should('include', '/inventory.html');
        })
    
        it('Login error', () => {
            cy.visit("https://www.saucedemo.com/v1/index.html");
            cy.wait(2000);
            cy.get("#user-name").click().type("estandar_user");
            cy.wait(2000);
            cy.get("#password").click().type("secret_s");
            cy.wait(2000);
            cy.get("#login-button").click();
            cy.get("#login_button_container > div > form > h3").should('contain.text', 'Epic sadface: Username and password do not match any user in this service');
        });
    });
        
    