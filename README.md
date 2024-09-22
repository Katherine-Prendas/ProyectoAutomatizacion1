# Proyecto de Automatización de Pruebas de Software 1
## Descripción
Este proyecto automatiza pruebas para garantizar que las funcionalidades clave del sitio web de compras Saucedemo funcionen correctamente. Las pruebas están diseñadas para verificar el correcto funcionamiento de las funcionalidades críticas del sitio, como el inicio de sesión, gestión del carrito, y el proceso de checkout.
## Tecnologías y herramientas utilizadas
Lenguaje de programación: JavaScript        
Framework de automatización: Cypress        
Gestión de dependencias: npm (Node Package Manager)     
Herramientas de reporting: Allure 
# Instalación
## Prerequisitos
Antes de comenzar, asegúrate de tener instalados los siguientes programas:  
- ***[Node.js](https://nodejs.org/en/download/package-manager) (versión 14 o superior)***     
- ***npm (incluido con Node.js)***      
- ***Cypress (instalado como dependencia del proyecto)***
### Mas información sobre como instalar [cypress](https://docs.cypress.io/guides/getting-started/installing-cypress)
## Pasos de instalación
### 1. Clona el repositorio del proyecto:
```
git clone https://github.com/tu-repo/proyecto-automatizacion-software1.git
```
### 2. Navega a la carpeta del proyecto:
```
cd proyecto-automatizacion-software1
```
### 3. Instala las dependencias necesarias:
```
npm install
```
## Ejecución de las pruebas
### Para ejecutar las pruebas en Cypress, usa uno de los siguientes comandos:

- Para abrir la interfaz gráfica de Cypress y seleccionar las pruebas:         
```
npx cypress open
```        
- Para ejecutar todas las pruebas en modo headless (sin interfaz gráfica):  
```
npx cypress run
```
## Estructura del proyecto
```
proyectoAutomatizacion/                               
└── cypress/        
    ├── e2e/    
    │   ├── login.spec.cy.js    
    │   ├── carrito.spec.cy.js  
    │   ├── checkout.spec.cy.js     
    │   └── logout.spec.cy.js       
    ├── fixtures/   
    └── support/        
└── node_modules/   
├── cypress.config.js   
├── package-lock.json   
├── package.json    
├── README.md
```
## Casos de prueba incluidos
El proyecto incluye pruebas para las siguientes funcionalidades clave del sitio:        
- Login
- Logout
- Agregar productos al carrito
- Eliminar productos del carrito
- Ir a Checkout y Ver la orden                   
Cada caso de prueba valida el correcto funcionamiento de las interacciones del usuario con la aplicación.
## Contribuciones
Si deseas contribuir a este proyecto, sigue estos pasos:

- Haz un fork del repositorio.
- Crea una nueva rama para tu funcionalidad o corrección de errores (git checkout -b nueva-funcionalidad).
- Realiza tus cambios y haz commit (git commit -m 'Agregada nueva funcionalidad').
- Sube tus cambios a tu rama (git push origin nueva-funcionalidad).
- Abre un Pull Request en GitHub.
## Créditos
Este proyecto fue desarrollado por Katherine Prendas Araya como parte de su curso en la Universidad CENFOTEC, bajo la supervisión del profesor Luis Felipe Soto Cruz.
## Licencia
Este proyecto está licenciado bajo la Licencia MIT. Ver el archivo [LICENSE](https://mit-license.org/) para más detalles.