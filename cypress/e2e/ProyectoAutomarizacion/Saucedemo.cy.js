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
    it('Eliminar desde la pagina productos', () => {
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
        cy.get("#shopping_cart_container > a > svg > path").click();
        cy.wait(2000);
        cy.get('#cart_contents_container > div > div.cart_list > div:nth-child(3) > div.cart_item_label').should('exist')
            .wait(2000);
        cy.get("#cart_contents_container > div > div.cart_footer > a.btn_secondary").click()
            .wait(2000);
        cy.get("#inventory_container > div > div:nth-child(1) > div.pricebar > button").click()
            .wait(2000);
        cy.get('#cart_contents_container > div > div.cart_list > div:nth-child(3) > div.cart_item_label').should('not.exist')
            .wait(2000);
        cy.get("#shopping_cart_container > a > svg > path").click()
            .wait(2000);
        cy.get('#cart_contents_container > div > div.cart_list > div:nth-child(3) > div.cart_item_label').should('not.exist');
    })
    it('Completar Ckeckout y ver orden', () => {
        cy.visit("https://www.saucedemo.com/v1/index.html");
        cy.wait(2000);
        cy.get("#user-name").click().type("standard_user");
        cy.wait(2000);
        cy.get("#password").click().type("secret_sauce");
        cy.wait(2000);
        cy.get("#login-button").click()
            .wait(2000);
        cy.get("#inventory_container > div > div:nth-child(1) > div.pricebar > button").click()
            .wait(1000);
        cy.get("#inventory_container > div > div:nth-child(2) > div.pricebar > button").click()
            .wait(1000);
        cy.get("#inventory_container > div > div:nth-child(3) > div.pricebar > button").click()
            .wait(1000);
        cy.get("#shopping_cart_container > a > svg > path").click()
            .wait(3000);
        //************Verificar que todos los datos de la orden se muestren correctamente********
        // Array para almacenar la información de los productos (nombre, precio, cantidad)
        const productsInCart = [];

        // Función para capturar la información de un producto
        function captureProductInfo(selectorName, selectorPrice, selectorQuantity) {
            return cy.get(selectorName).invoke('text').then((name) => {
                cy.get(selectorPrice).invoke('text').then((price) => {
                    cy.get(selectorQuantity).invoke('text').then((quantity) => {
                        productsInCart.push({
                            name: name.trim(),
                            price: parseFloat(price.replace(/[^\d.-]/g, '').trim()),
                            quantity: parseInt(quantity.trim(), 10)
                        });
                    });
                });
            });
        }

        // Capturar información de los tres productos en el carrito
        captureProductInfo('#item_4_title_link > div', '#cart_contents_container > div > div.cart_list > div:nth-child(3) > div.cart_item_label > div.item_pricebar > div', '#cart_contents_container > div > div.cart_list > div:nth-child(3) > div.cart_quantity');
        captureProductInfo('#item_0_title_link > div', '#cart_contents_container > div > div.cart_list > div:nth-child(4) > div.cart_item_label > div.item_pricebar > div', '#cart_contents_container > div > div.cart_list > div:nth-child(4) > div.cart_quantity');
        captureProductInfo('#item_1_title_link > div', '#cart_contents_container > div > div.cart_list > div:nth-child(5) > div.cart_item_label > div.item_pricebar > div', '#cart_contents_container > div > div.cart_list > div:nth-child(5) > div.cart_quantity');

        // Navegar a la página de checkout your information
        cy.get('#cart_contents_container > div > div.cart_footer > a.btn_action.checkout_button').click();
        cy.get("#first-name").click().type("Katherine")
            .wait(1000);
        cy.get("#last-name").click().type("Prendas")
            .wait(1000);
        cy.get("#postal-code").click().type("60803")
            .wait(2000);
        cy.get("#checkout_info_container > div > form > div.checkout_buttons > input").click()
            .wait(2000);
        // Verificar información de los productos en la página de checkout
        function verifyProductInfoInCheckout(index, selectorName, selectorPrice, selectorQuantity) {
            cy.get(selectorName).invoke('text').then((checkoutName) => {
                cy.get(selectorPrice).invoke('text').then((checkoutPrice) => {
                    cy.get(selectorQuantity).invoke('text').then((checkoutQuantity) => {
                        const product = productsInCart[index];
                        expect(checkoutName.trim()).to.equal(product.name);  // Verifica nombre
                        expect(parseFloat(checkoutPrice.replace(/[^\d.-]/g, '').trim())).to.equal(product.price);  // Verifica precio
                        expect(parseInt(checkoutQuantity.trim(), 10)).to.equal(product.quantity);  // Verifica cantidad
                    });
                });
            });
        }
        // Verificar los tres productos en la página de checkout
        verifyProductInfoInCheckout(0, '#item_4_title_link > div', '#checkout_summary_container > div > div.cart_list > div:nth-child(3) > div.cart_item_label > div.inventory_item_price', '#checkout_summary_container > div > div.cart_list > div:nth-child(3) > div.summary_quantity');
        verifyProductInfoInCheckout(1, '#item_0_title_link > div', '#checkout_summary_container > div > div.cart_list > div:nth-child(4) > div.cart_item_label > div.inventory_item_price', '#checkout_summary_container > div > div.cart_list > div:nth-child(4) > div.summary_quantity');
        verifyProductInfoInCheckout(2, '#item_1_title_link > div', '#checkout_summary_container > div > div.cart_list > div:nth-child(5) > div.cart_item_label > div.inventory_item_price', '#checkout_summary_container > div > div.cart_list > div:nth-child(5) > div.summary_quantity');

        // Variable para almacenar el total calculado
        let calculatedTotal = 0;

        // Función para capturar el precio de un producto y sumarlo al total
        function captureProductPrice(selectorPrice) {
            return cy.get(selectorPrice).invoke('text').then((price) => {
                const cleanPrice = parseFloat(price.replace(/[^\d.-]/g, '').trim());
                calculatedTotal += cleanPrice;
            });
        }

        // Capturar los precios de los productos y sumarlos
        captureProductPrice('#checkout_summary_container > div > div.cart_list > div:nth-child(3) > div.cart_item_label > div.inventory_item_price');
        captureProductPrice('#checkout_summary_container > div > div.cart_list > div:nth-child(4) > div.cart_item_label > div.inventory_item_price');
        captureProductPrice('#checkout_summary_container > div > div.cart_list > div:nth-child(5) > div.cart_item_label > div.inventory_item_price');

        // Verificar el total en la página de checkout
        cy.get('#checkout_summary_container > div > div.summary_info > div.summary_subtotal_label').invoke('text').then((checkoutTotalText) => {
            const checkoutTotal = parseFloat(checkoutTotalText.replace(/[^\d.-]/g, '').trim());
            expect(checkoutTotal).to.equal(calculatedTotal);  // Verificar que el total sea correcto
        });

        cy.wait(3000);
        cy.get("#checkout_summary_container > div > div.summary_info > div.cart_footer > a.btn_action.cart_button").click();
    });
});