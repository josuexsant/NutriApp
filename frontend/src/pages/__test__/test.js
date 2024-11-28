import { Builder } from 'selenium-webdriver';
import { Options, ServiceBuilder } from 'selenium-webdriver/firefox';


// Especifica la ruta completa de geckodriver
const service = new ServiceBuilder('C:\\Seleniumdrivers\\geckodriver.exe'); // Ajusta la ruta si es necesario

const options = new Options();

// Crea el driver de Selenium para Firefox
const driver = new Builder()
    .forBrowser('firefox')
    .setFirefoxOptions(options)
    .setFirefoxService(service)
    .build();

(async function test() {
    await driver.get('https://www.google.com');
    console.log(await driver.getTitle());  // Imprime el título de la página
    await driver.quit();  // Cierra el navegador
})();
