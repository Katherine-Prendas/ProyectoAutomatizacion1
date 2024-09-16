describe('Pruebas para la página web Saucedemo', () => {

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
    })

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
    })

    it('Agregar un producto al carrito', () => {
        cy.visit("https://www.saucedemo.com/v1/index.html");
        cy.wait(2000);
        cy.get("#user-name").click().type("standard_user");
        cy.wait(2000);
        cy.get("#password").click().type("secret_sauce");
        cy.wait(2000);
        cy.get("#login-button").click()
            .wait(2000);
        cy.get("#inventory_container > div > div:nth-child(1) > div.pricebar > button").click();
        cy.wait(2000);
        cy.get("#shopping_cart_container > a > svg > path").click();

        cy.get('#item_4_title_link').invoke('text').then((text1) => {
            cy.get('#item_4_title_link > div').invoke('text').should((text2) => {
                expect(text1).to.equal(text2);
            });
        });

        cy.get("#cart_contents_container > div > div.cart_list > div.cart_item > div.cart_quantity").should('contain.text', '1');

        cy.get("#cart_contents_container > div > div.cart_footer > a.btn_secondary").click();

        cy.get('#inventory_container > div > div:nth-child(1) > div.pricebar > div').invoke('text').then((productPrice) => {
            const cleanProductPrice = productPrice.replace(/[^\d.-]/g, '').trim();
            cy.get("#shopping_cart_container > a > svg > path").click();
            cy.get('#cart_contents_container > div > div.cart_list > div.cart_item > div.cart_item_label > div.item_pricebar > div').invoke('text').then((cartPrice) => {
                const cleanCartPrice = cartPrice.replace(/[^\d.-]/g, '').trim();
                expect(cleanProductPrice).to.equal(cleanCartPrice);
            });
        });
    })
    it('Agregar varios productos al carrito', () => {
        cy.visit("https://www.saucedemo.com/v1/index.html");
        cy.wait(2000);
        cy.get("#user-name").click().type("standard_user");
        cy.wait(2000);
        cy.get("#password").click().type("secret_sauce");
        cy.wait(2000);
        cy.get("#login-button").click()
            .wait(2000);
        cy.get("#inventory_container > div > div:nth-child(1) > div.pricebar > button").click();
        cy.wait(1000);
        cy.get("#inventory_container > div > div:nth-child(2) > div.pricebar > button").click();
        cy.wait(1000);
        cy.get("#inventory_container > div > div:nth-child(3) > div.pricebar > button").click();
        cy.wait(1000);

        cy.get('#item_4_title_link > div').invoke('text').then((text1) => {
            cy.get("#shopping_cart_container > a > svg").click();
            cy.get('#item_4_title_link > div').invoke('text').should((text2) => {
                // Compara ambos textos para verificar que sean iguales
                expect(text1).to.equal(text2);
            });
        });
        cy.get("#cart_contents_container > div > div.cart_footer > a.btn_secondary").click();
        // Selecciona el precio del producto en la página de productos
        cy.get('#inventory_container > div > div:nth-child(1) > div.pricebar > div').invoke('text').then((productPrice) => {
            const cleanProductPrice = productPrice.replace(/[^\d.-]/g, '').trim();
            cy.get("#shopping_cart_container > a > svg > path").click();
            // Selecciona el precio del mismo producto en el carrito
            cy.get('#cart_contents_container > div > div.cart_list > div:nth-child(3) > div.cart_item_label > div.item_pricebar > div').invoke('text').then((cartPrice) => {
                const cleanCartPrice = cartPrice.replace(/[^\d.-]/g, '').trim();
                // Compara ambos precios para verificar que sean iguales
                expect(cleanProductPrice).to.equal(cleanCartPrice);
            });
        });

        cy.get('#item_0_title_link > div').invoke('text').then((text1) => {
            cy.get("#shopping_cart_container > a > svg").click();
            cy.get('#item_0_title_link > div').invoke('text').should((text2) => {
                // Compara ambos textos para verificar que sean iguales
                expect(text1).to.equal(text2);
            });
        });
        cy.get("#cart_contents_container > div > div.cart_footer > a.btn_secondary").click();
        // Selecciona el precio del producto en la página de productos
        cy.get('#inventory_container > div > div:nth-child(2) > div.pricebar > div').invoke('text').then((productPrice) => {
            const cleanProductPrice = productPrice.replace(/[^\d.-]/g, '').trim();
            cy.get("#shopping_cart_container > a > svg > path").click();
            // Selecciona el precio del mismo producto en el carrito
            cy.get('#cart_contents_container > div > div.cart_list > div:nth-child(4) > div.cart_item_label > div.item_pricebar > div').invoke('text').then((cartPrice) => {
                const cleanCartPrice = cartPrice.replace(/[^\d.-]/g, '').trim();
                // Compara ambos precios para verificar que sean iguales
                expect(cleanProductPrice).to.equal(cleanCartPrice);
            });
        });

        cy.get('#item_1_title_link > div').invoke('text').then((text1) => {
            cy.get("#shopping_cart_container > a > svg").click();
            cy.get('#item_1_title_link > div').invoke('text').should((text2) => {
                // Compara ambos textos para verificar que sean iguales
                expect(text1).to.equal(text2);
            });
        });
        cy.get("#cart_contents_container > div > div.cart_footer > a.btn_secondary").click();
        // Selecciona el precio del producto en la página de productos
        cy.get('#inventory_container > div > div:nth-child(3) > div.pricebar > div').invoke('text').then((productPrice) => {
            // Limpia el formato del precio (por ejemplo, si viene con un símbolo de moneda y espacios)
            const cleanProductPrice = productPrice.replace(/[^\d.-]/g, '').trim();
            cy.get("#shopping_cart_container > a > svg > path").click();
            // Selecciona el precio del mismo producto en el carrito
            cy.get('#cart_contents_container > div > div.cart_list > div:nth-child(5) > div.cart_item_label > div.item_pricebar > div').invoke('text').then((cartPrice) => {
                // Limpia el formato del precio (por ejemplo, si viene con un símbolo de moneda y espacios)
                const cleanCartPrice = cartPrice.replace(/[^\d.-]/g, '').trim();
                // Compara ambos precios para verificar que sean iguales
                expect(cleanProductPrice).to.equal(cleanCartPrice);

            });
        });
        // Crea una lista de selectores que corresponden a las cantidades de cada producto
        const productSelectors = [
            '#cart_contents_container > div > div.cart_list > div:nth-child(3) > div.cart_quantity',
            '#cart_contents_container > div > div.cart_list > div:nth-child(4) > div.cart_quantity',
            '#cart_contents_container > div > div.cart_list > div:nth-child(5) > div.cart_quantity'
        ];

        let totalQuantity = 0;

        // Itera sobre cada selector para sumar las cantidades
        cy.wrap(productSelectors).each((selector) => {
            cy.get(selector)
                .invoke('text')
                .then((text) => {
                    const quantity = parseInt(text.trim(), 10); // Convierte el texto en número
                    totalQuantity += quantity; // Suma la cantidad al total
                });
        }).then(() => {
            // Muestra el total en la consola
            cy.log('Total de productos en el carrito:', totalQuantity);

            // Realiza una verificación opcional
            expect(totalQuantity).to.be.greaterThan(0); // Verifica que haya al menos un producto
        });

        it('Eliminar del carrito', () => {
            cy.visit("https://www.saucedemo.com/v1/index.html");
            cy.wait(2000);
            cy.get("#user-name").click().type("standard_user");
            cy.wait(2000);
            cy.get("#password").click().type("secret_sauce");
            cy.wait(2000);
            cy.get("#login-button").click()
                .wait(2000);
            cy.get("#inventory_container > div > div:nth-child(1) > div.pricebar > button").click();
            cy.wait(1000);
            cy.get("#inventory_container > div > div:nth-child(2) > div.pricebar > button").click();
            cy.wait(1000);
            cy.get("#shopping_cart_container > a > svg > path").click();
            cy.wait(1000);

            // Verifica que ambos productos estén presentes inicialmente
            cy.get('#cart_contents_container > div > div.cart_list > div:nth-child(3) > div.cart_item_label').should('exist');
            cy.get('#cart_contents_container > div > div.cart_list > div:nth-child(4) > div.cart_item_label').should('exist');

            // Elimina el primer producto
            cy.get('#cart_contents_container > div > div.cart_list > div:nth-child(3) > div.cart_item_label > div.item_pricebar > button').click();

            // Espera a que el carrito se actualice
            cy.wait(1000); // Ajusta según sea necesario

            // Verifica que el primer producto ya no esté en el carrito
            cy.get('#cart_contents_container > div > div.cart_list > div:nth-child(3) > div.cart_item_label').should('not.exist');

            // Verifica que el segundo producto aún esté en el carrito
            cy.get('#cart_contents_container > div > div.cart_list > div:nth-child(4) > div.cart_item_label').should('exist');
        })

    })
});