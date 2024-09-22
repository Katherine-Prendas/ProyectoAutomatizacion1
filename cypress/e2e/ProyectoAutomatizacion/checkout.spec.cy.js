describe('Pruebas de Checkout', () => {
it('Completar Ckeckout y ver orden', () => {
    cy.visit("https://www.saucedemo.com/v1/index.html");
    cy.wait(2000);
    cy.get("#user-name").click().type("standard_user");
    cy.wait(2000);
    cy.get("#password").click().type("secret_sauce");
    cy.wait(2000);
    cy.get("#login-button").click()
    .wait(2000);
    //Agregan los productos al carrito de compras
    cy.get("#inventory_container > div > div:nth-child(1) > div.pricebar > button").click()
        .wait(1000);
    cy.get("#inventory_container > div > div:nth-child(2) > div.pricebar > button").click()
        .wait(1000);
    cy.get("#inventory_container > div > div:nth-child(3) > div.pricebar > button").click()
        .wait(1000);
    //Ir al carrito de compras
    cy.get("#shopping_cart_container > a > svg > path").click()
        .wait(3000);
    //************Verificar que todos los datos de la orden se muestren correctamente********
    // Array para almacenar la información de los productos (nombre, precio, cantidad)
    const productosEnCarrito = []; // Declara un array vacío para almacenar los productos en el carrito

// Función para capturar la información de un producto
function capturarInfoProducto(selectorNombre, selectorPrecio, selectorCantidad) {
    // Obtiene el texto del nombre del producto
    return cy.get(selectorNombre).invoke('text').then((nombre) => {
        // Obtiene el texto del precio del producto
        cy.get(selectorPrecio).invoke('text').then((precio) => {
            // Obtiene el texto de la cantidad del producto
            cy.get(selectorCantidad).invoke('text').then((cantidad) => {
                // Añade un objeto con el nombre, precio y cantidad al array de productos
                productosEnCarrito.push({
                    // Elimina espacios en blanco al inicio y final del nombre
                    name: nombre.trim(),
                    // Convierte el texto del precio en un número flotante, eliminando caracteres no numéricos
                    price: parseFloat(precio.replace(/[^\d.-]/g, '').trim()),
                    // Convierte el texto de la cantidad en un número entero
                    quantity: parseInt(cantidad.trim(), 10)
                });
            });
        });
    });
}
// Captura la información de los tres productos en el carrito
// Captura la información del primer producto
capturarInfoProducto('#item_4_title_link > div', '#cart_contents_container > div > div.cart_list > div:nth-child(3) > div.cart_item_label > div.item_pricebar > div', '#cart_contents_container > div > div.cart_list > div:nth-child(3) > div.cart_quantity');
// Captura la información del segundo producto
capturarInfoProducto('#item_0_title_link > div', '#cart_contents_container > div > div.cart_list > div:nth-child(4) > div.cart_item_label > div.item_pricebar > div', '#cart_contents_container > div > div.cart_list > div:nth-child(4) > div.cart_quantity');
// Captura la información del tercer producto
capturarInfoProducto('#item_1_title_link > div', '#cart_contents_container > div > div.cart_list > div:nth-child(5) > div.cart_item_label > div.item_pricebar > div', '#cart_contents_container > div > div.cart_list > div:nth-child(5) > div.cart_quantity');
    // Navegar a la página de checkout your information
    cy.get('#cart_contents_container > div > div.cart_footer > a.btn_action.checkout_button').click();
    // Selecciona el campo de nombre y escribe
    cy.get("#first-name").click().type("Katherine")
        .wait(1000);
    //Selecciona el campo de apellido y escribe
    cy.get("#last-name").click().type("Prendas")
        .wait(1000);
    //Selecciona el campo de código postal y escribe
    cy.get("#postal-code").click().type("60803")
        .wait(2000);
    //Navega a la página de CHECKOUT:OVERVIEW
    cy.get("#checkout_info_container > div > form > div.checkout_buttons > input").click()
        .wait(2000);
    // Verificar información de los productos en la página de checkout
    //Función para verificar que la información del producto en la página de checkout coincida con la información en el carrito.
    function verificarInfoProductoEnCheckout(indice, selectorNombre, selectorPrecio, selectorCantidad) {
        // Obtiene el nombre del producto en el checkout
        cy.get(selectorNombre).invoke('text').then((nombreCheckout) => {
            // Obtiene el precio del producto en el checkout
            cy.get(selectorPrecio).invoke('text').then((precioCheckout) => {
                // Obtiene la cantidad del producto en el checkout
                cy.get(selectorCantidad).invoke('text').then((cantidadCheckout) => {
                    // Obtiene el producto de la lista de productos en el carrito
                    const producto = productosEnCarrito[indice];
                    // Verifica que el nombre del producto en el checkout coincida con el del carrito
                    expect(nombreCheckout.trim()).to.equal(producto.name);
                    // Verifica que el precio del producto en el checkout coincida con el del carrito
                    expect(parseFloat(precioCheckout.replace(/[^\d.-]/g, '').trim())).to.equal(producto.price);
                    // Verifica que la cantidad del producto en el checkout coincida con la del carrito
                    expect(parseInt(cantidadCheckout.trim(), 10)).to.equal(producto.quantity);
                });
            });
        });
    }
    
    // Verificar la información de los tres productos en la página de checkout
    verificarInfoProductoEnCheckout(0, '#item_4_title_link > div', '#checkout_summary_container > div > div.cart_list > div:nth-child(3) > div.cart_item_label > div.inventory_item_price', '#checkout_summary_container > div > div.cart_list > div:nth-child(3) > div.summary_quantity');
    verificarInfoProductoEnCheckout(1, '#item_0_title_link > div', '#checkout_summary_container > div > div.cart_list > div:nth-child(4) > div.cart_item_label > div.inventory_item_price', '#checkout_summary_container > div > div.cart_list > div:nth-child(4) > div.summary_quantity');
    verificarInfoProductoEnCheckout(2, '#item_1_title_link > div', '#checkout_summary_container > div > div.cart_list > div:nth-child(5) > div.cart_item_label > div.inventory_item_price', '#checkout_summary_container > div > div.cart_list > div:nth-child(5) > div.summary_quantity');
    
    // Variable para almacenar el total calculado
    let totalCalculado = 0;
    
    // Función para capturar el precio de un producto y sumarlo al total
    function capturarPrecioProducto(selectorPrecio) {
        // Obtiene el texto del precio del producto y lo suma al total calculado
        return cy.get(selectorPrecio).invoke('text').then((precio) => {
            const precioLimpio = parseFloat(precio.replace(/[^\d.-]/g, '').trim()); // Limpia el texto, dejando solo números y el punto decimal
            totalCalculado += precioLimpio; // Suma el precio limpio al total calculado
        });
    }
    
    // Captura los precios de los productos y los suma al total calculado
    capturarPrecioProducto('#checkout_summary_container > div > div.cart_list > div:nth-child(3) > div.cart_item_label > div.inventory_item_price');
    capturarPrecioProducto('#checkout_summary_container > div > div.cart_list > div:nth-child(4) > div.cart_item_label > div.inventory_item_price');
    capturarPrecioProducto('#checkout_summary_container > div > div.cart_list > div:nth-child(5) > div.cart_item_label > div.inventory_item_price');
    
    // Verificar que el total mostrado en la página de checkout sea correcto
    cy.get('#checkout_summary_container > div > div.summary_info > div.summary_subtotal_label').invoke('text').then((textoTotalCheckout) => {
        const totalCheckout = parseFloat(textoTotalCheckout.replace(/[^\d.-]/g, '').trim()); // Limpia y convierte el texto del total en la página
        expect(totalCheckout).to.equal(totalCalculado); // Verifica que el total mostrado en la página coincida con el total calculado
    });
    
    cy.wait(3000); // Espera 3 segundos antes de proceder
    cy.get("#checkout_summary_container > div > div.summary_info > div.cart_footer > a.btn_action.cart_button").click(); // Hace clic en el botón para completar la compra
});
});