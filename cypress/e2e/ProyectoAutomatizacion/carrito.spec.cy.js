describe('Pruebas del Carrito', () => {
    it('Agregar un producto al carrito', () => {
        cy.visit("https://www.saucedemo.com/v1/index.html");
        cy.wait(2000);
        cy.get("#user-name").click().type("standard_user");
        cy.wait(2000);
        cy.get("#password").click().type("secret_sauce");
        cy.wait(2000);
        cy.get("#login-button").click();
        cy.wait(2000);
        //Agrega un producto al carrito
        cy.get("#inventory_container > div > div:nth-child(1) > div.pricebar > button").click();
        cy.wait(2000);
        //clic en carrito
        cy.get("#shopping_cart_container > a > svg > path").click();
        cy.wait(2000);
        //compara el nombre del producto de la pagina "text1" con el producto del carrito "text2"
        cy.get('#item_4_title_link').invoke('text').then((text1) => { //Obtiene el texto del elemento, almacena el texto obtenido en text1.
            cy.get('#item_4_title_link > div').invoke('text').should((text2) => {
                //Verifica que ambos textos sean iguales.
                expect(text1).to.equal(text2);
            });
        });
        //validar que la cantidad de productos sea la correcta
        cy.get("#cart_contents_container > div > div.cart_list > div.cart_item > div.cart_quantity").should('contain.text', '1');//Verifica que ese elemento contenga el texto '1', es decir, que la cantidad de productos sea 1.
        //clic en boton continuar comprando
        cy.get("#cart_contents_container > div > div.cart_footer > a.btn_secondary").click();
        //Validar que el precio del producto en la página de inventario coincide con el del carrito
        cy.get('#inventory_container > div > div:nth-child(1) > div.pricebar > div').invoke('text').then((precioProducto) => {//obtiene el texto del precio del producto en la pagina principal
            const precioProductoLimpio = precioProducto.replace(/[^\d.-]/g, '').trim(); //Elimina cualquier carácter que no sea un número o un punto (deja solo los números y el punto decimal).
            // hacer clic en el carrito de compras
            cy.get("#shopping_cart_container > a > svg > path").click();

            cy.get('#cart_contents_container > div > div.cart_list > div.cart_item > div.cart_item_label > div.item_pricebar > div').invoke('text').then((precioCarrito) => {//obtiene el texto del precio del producto en el carrito
                const precioCarritoLimpio = precioCarrito.replace(/[^\d.-]/g, '').trim();//Elimina cualquier carácter que no sea un número o un punto
                //Compara que el precio del producto en la página de inventario sea igual al precio en el carrito.
                expect(precioProductoLimpio).to.equal(precioCarritoLimpio);
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
        cy.get("#login-button").click();
        cy.wait(2000);
        //Se agregan varios productos al carrito de compras
        cy.get("#inventory_container > div > div:nth-child(1) > div.pricebar > button").click();
        cy.wait(1000);
        cy.get("#inventory_container > div > div:nth-child(2) > div.pricebar > button").click();
        cy.wait(1000);
        cy.get("#inventory_container > div > div:nth-child(3) > div.pricebar > button").click();
        cy.wait(2000);
        //Obtener el texto del primer producto desde la pagina principal
        cy.get('#item_4_title_link > div').invoke('text').then((text1) => {
            //Ir al carrito
            cy.get("#shopping_cart_container > a > svg").click();
            cy.wait(2000);
            //Obtener el texto del primer producto desde el carrito de compras
            cy.get('#item_4_title_link > div').invoke('text').should((text2) => {
                // Compara ambos textos para verificar que sean iguales
                expect(text1).to.equal(text2);
            });
        });
        cy.wait(2000);
        //clic en el boton continuar comprando
        cy.get("#cart_contents_container > div > div.cart_footer > a.btn_secondary").click();
        cy.wait(2000);
        // Selecciona el precio del primer producto en la página de productos
        cy.get('#inventory_container > div > div:nth-child(1) > div.pricebar > div').invoke('text').then((precioProducto) => {
            //Elimina cualquier carácter que no sea un número o un punto
            const precioProductoLimpio = precioProducto.replace(/[^\d.-]/g, '').trim();
            //Ir al carrito
            cy.wait(2000);
            cy.get("#shopping_cart_container > a > svg > path").click();
            cy.wait(2000);
            // Selecciona el precio del primer producto en el carrito
            cy.get('#cart_contents_container > div > div.cart_list > div:nth-child(3) > div.cart_item_label > div.item_pricebar > div').invoke('text').then((precioCarrito) => {
                //Elimina cualquier carácter que no sea un número o un punto
                const precioCarritoLimpio = precioCarrito.replace(/[^\d.-]/g, '').trim();
                // Compara ambos precios para verificar que sean iguales
                expect(precioProductoLimpio).to.equal(precioCarritoLimpio);
            });
        });
        cy.wait(2000);
        //Obtener el texto del segundo producto desde la pagina principal
        cy.get('#item_0_title_link > div').invoke('text').then((text1) => {
            //ir al carrito
            cy.wait(2000);
            cy.get("#shopping_cart_container > a > svg").click();
            cy.wait(2000);
            //Obtener el texto del segundo producto desde el carrito
            cy.get('#item_0_title_link > div').invoke('text').should((text2) => {
                // Compara ambos textos para verificar que sean iguales
                expect(text1).to.equal(text2);
            });
        });
        cy.wait(2000);
        //clic en el boton continuar comprando
        cy.get("#cart_contents_container > div > div.cart_footer > a.btn_secondary").click();
        // Selecciona el precio del producto en la página de productos
        cy.get('#inventory_container > div > div:nth-child(2) > div.pricebar > div').invoke('text').then((precioProducto) => {
            const precioProductoLimpio = precioProducto.replace(/[^\d.-]/g, '').trim();
            //Ir al carrito
            cy.wait(2000);
            cy.get("#shopping_cart_container > a > svg > path").click();
            cy.wait(2000);
            // Selecciona el precio del mismo producto en el carrito
            cy.get('#cart_contents_container > div > div.cart_list > div:nth-child(4) > div.cart_item_label > div.item_pricebar > div').invoke('text').then((precioCarrito) => {
                const precioCarritoLimpio = precioCarrito.replace(/[^\d.-]/g, '').trim();
                // Compara ambos precios para verificar que sean iguales
                expect(precioProductoLimpio).to.equal(precioCarritoLimpio);
            });
        });
        cy.wait(2000);
        //Obtener el texto del tercer producto desde la pagina principal
        cy.get('#item_1_title_link > div').invoke('text').then((text1) => {
            //ir al carrito
            cy.wait(2000);
            cy.get("#shopping_cart_container > a > svg").click();
            cy.wait(2000);
            //Obtener el texto del tercer producto desde el carrito
            cy.get('#item_1_title_link > div').invoke('text').should((text2) => {
                // Compara ambos textos para verificar que sean iguales
                expect(text1).to.equal(text2);
            });
        });
        cy.wait(2000);
        //clic en el boton continuar comprando
        cy.get("#cart_contents_container > div > div.cart_footer > a.btn_secondary").click();
        // Selecciona el precio del tercer producto en la página de productos
        cy.get('#inventory_container > div > div:nth-child(3) > div.pricebar > div').invoke('text').then((precioProducto) => {
            // Limpia el formato del precio (por ejemplo, si viene con un símbolo de moneda y espacios)
            const precioProductoLimpio = precioProducto.replace(/[^\d.-]/g, '').trim();
            //Ir al carrito
            cy.wait(2000);
            cy.get("#shopping_cart_container > a > svg > path").click();
            cy.wait(2000);
            // Selecciona el precio del mismo producto en el carrito
            cy.get('#cart_contents_container > div > div.cart_list > div:nth-child(5) > div.cart_item_label > div.item_pricebar > div').invoke('text').then((precioCarrito) => {
                // Limpia el formato del precio (por ejemplo, si viene con un símbolo de moneda y espacios)
                const precioCarritoLimpio = precioCarrito.replace(/[^\d.-]/g, '').trim();
                // Compara ambos precios para verificar que sean iguales
                expect(precioProductoLimpio).to.equal(precioCarritoLimpio);
            });
        });
        cy.wait(2000);
        // Crea una lista de selectores que corresponden a las cantidades de cada producto
        const selectorProductos = [
            '#cart_contents_container > div > div.cart_list > div:nth-child(3) > div.cart_quantity',
            '#cart_contents_container > div > div.cart_list > div:nth-child(4) > div.cart_quantity',
            '#cart_contents_container > div > div.cart_list > div:nth-child(5) > div.cart_quantity'
        ];
        //Se declara una variable totalQuantity que comienza con un valor de 0. 
        //Aquí es donde se irá sumando la cantidad de cada producto a medida que se recorre la lista.
        let cantidadTotal = 0;

        // Itera sobre cada selector para sumar las 
        //Cypress envuelve el array de selectores con cy.wrap y usa each para iterar sobre cada selector.
        cy.wrap(selectorProductos).each((selector) => {
            //Para cada iteración, Cypress selecciona el elemento en el DOM que corresponde al selector actual.
            cy.get(selector)
                //Obtiene el texto del elemento (que contiene la cantidad del producto en el carrito).
                .invoke('text')
                //Dentro de la promesa, convierte el texto en un número usando parseInt, eliminando cualquier espacio en blanco con trim().
                .then((text) => {
                    const cantidad = parseInt(text.trim(), 10);
                    cantidadTotal += cantidad; //Suma el número de productos encontrados a la variable
                });
        }).then(() => {
            cy.wait(2000);
            // Muestra el total en la consola
            cy.log('Total de productos en el carrito:', cantidadTotal);
            // Realiza una verificación opcional
            expect(cantidadTotal).to.be.greaterThan(0); // Verifica que haya al menos un producto
        })
    })
        it('Eliminar del carrito', () => {
            cy.visit("https://www.saucedemo.com/v1/index.html");
            cy.wait(2000);
            cy.get("#user-name").click().type("standard_user");
            cy.wait(2000);
            cy.get("#password").click().type("secret_sauce");
            cy.wait(2000);
            cy.get("#login-button").click();
            cy.wait(2000);
            //Agregar primer producto al carrito
            cy.get("#inventory_container > div > div:nth-child(1) > div.pricebar > button").click();
            cy.wait(2000);
            //Agregar segundo producto al carrito
            cy.get("#inventory_container > div > div:nth-child(2) > div.pricebar > button").click();
            cy.wait(2000);
            //ir al carrito
            cy.get("#shopping_cart_container > a > svg > path").click();
            cy.wait(1000);
            // Verifica que ambos productos estén presentes inicialmente
            cy.get('#cart_contents_container > div > div.cart_list > div:nth-child(3) > div.cart_item_label').should('exist');
            cy.wait(1000);
            cy.get('#cart_contents_container > div > div.cart_list > div:nth-child(4) > div.cart_item_label').should('exist');
            cy.wait(2000);
            // Elimina el primer producto
            cy.get('#cart_contents_container > div > div.cart_list > div:nth-child(3) > div.cart_item_label > div.item_pricebar > button').click();
            //Espera a que el carrito se actualice
            cy.wait(1000);
            // Verifica que el primer producto ya no esté en el carrito
            cy.get('#cart_contents_container > div > div.cart_list > div:nth-child(3) > div.cart_item_label').should('not.exist');
            //Verifica que el segundo producto aún esté en el carrito
            cy.get('#cart_contents_container > div > div.cart_list > div:nth-child(4) > div.cart_item_label').should('exist');
        })
    
    it('Eliminar desde la pagina productos', () => {
        cy.visit("https://www.saucedemo.com/v1/index.html");
        cy.wait(2000);
        cy.get("#user-name").click().type("standard_user");
        cy.wait(2000);
        cy.get("#password").click().type("secret_sauce");
        cy.wait(2000);
        cy.get("#login-button").click();
        cy.wait(2000);
        //Agregamos producto al carrito
        cy.get("#inventory_container > div > div:nth-child(1) > div.pricebar > button").click();
        //Vamos al carrito de compras
        cy.get("#shopping_cart_container > a > svg > path").click();
        //Verificamos que el producto exista en el carrito de compras
        cy.get('#cart_contents_container > div > div.cart_list > div:nth-child(3) > div.cart_item_label').should('exist').wait(2000);
        //Regresamos a la pagina de compras por medio del botón seguir comprando
        cy.get("#cart_contents_container > div > div.cart_footer > a.btn_secondary").click();
        //Eliminamos el producto desde el botón remove
        cy.get("#inventory_container > div > div:nth-child(1) > div.pricebar > button").click();
        //Verificamos que el producto ya no se encuentra añadido desde la página principal
        cy.get('#cart_contents_container > div > div.cart_list > div:nth-child(3) > div.cart_item_label').should('not.exist');
        //Vamos al carrito de compras
        cy.get("#shopping_cart_container > a > svg > path").click().wait(2000);
        //Verificamos que no existe el producto
        cy.get('#cart_contents_container > div > div.cart_list > div:nth-child(3) > div.cart_item_label').should('not.exist');
    });
});