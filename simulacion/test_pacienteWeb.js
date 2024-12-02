const { Builder, By, Key, until } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const path = require('path');

async function test() {
    let options = new firefox.Options();
    options.addArguments('--headless');
    let driver = await new Builder().forBrowser('firefox').setFirefoxOptions(options).build();

    try {
        console.log('Iniciando prueba Selenium...');

        // Abrir la página de login
        console.log('Abriendo la página de login...');
        await driver.get('http://localhost:5173/PacienteWeb'); // Cambia el URL si es necesario

        // Espera para asegurarse de que la página cargue
        await driver.sleep(5000);  // Espera 5 segundos antes de buscar el formulario

        // Verifica que la página haya cargado correctamente buscando un elemento visible en la página
        await driver.wait(until.elementLocated(By.css('h2')), 10000); // Espera a que el título "NutriApp - Simulación" esté presente

        // Esperar a que el formulario de login esté presente
        const loginForm = await driver.wait(until.elementLocated(By.id('login-form')), 20000);

        // Ingresar datos en el formulario de login
        await driver.findElement(By.id('inputEmail')).sendKeys('test@nutriapp.com');
        await driver.findElement(By.id('inputPassword')).sendKeys('123456');
        
        // Hacer clic en el botón de login
        await driver.findElement(By.css('button[type="submit"]')).click();

        // Esperar a que la página de estadísticas se cargue
        console.log('Esperando que la página de estadísticas se cargue...');
        await driver.wait(until.elementLocated(By.css('.paciente-web')), 10000);
        
        // Verificar que los elementos de estadísticas estén presentes
        const calorias = await driver.findElement(By.xpath("//section[contains(@class, 'stats-section')]//p[contains(text(), 'Calorías')]")).getText();
        console.log('Estadísticas del Día:', calorias);

        // Verificar que la lista de consumos esté presente
        const consumedList = await driver.findElements(By.css('.consumed-list-section .list-group-item'));
        console.log('Cantidad de elementos en el registro de consumo:', consumedList.length);

        // Interactuar con el formulario de agregar alimento
        console.log('Agregando un alimento...');
        await driver.findElement(By.id('nombre')).sendKeys('Banana');
        await driver.findElement(By.id('calorias')).sendKeys('100');
        await driver.findElement(By.id('proteinas')).sendKeys('1');
        await driver.findElement(By.id('carbohidratos')).sendKeys('27');
        
        // Hacer clic en el botón de agregar alimento
        await driver.findElement(By.id('add-food-btn')).click();
        
        // Verificar si el alimento se agregó
        await driver.wait(until.elementLocated(By.xpath("//ul[contains(@class, 'list-group')]//li[contains(text(), 'Banana')]")), 10000);
        console.log('El alimento fue agregado correctamente');

    } catch (error) {
        console.error('Error en la prueba:', error);
    } finally {
        console.log('Cerrando el navegador...');
        await driver.quit();
    }
}

test();
