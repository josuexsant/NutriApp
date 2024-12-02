const { Builder, By, until } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');

// Configuración de Firefox
let options = new firefox.Options();
options.setBinary('path_to_your_firefox_binary'); // Esto es opcional si Firefox está en tu PATH

(async function example() {
  let driver = await new Builder()
    .forBrowser('firefox')
    .setFirefoxOptions(options)
    .build();

  try {
    // Navegar a la página
    await driver.get('C:\proyectos\NutriApp\simulacion\pacienteWeb.html'); // Ruta local al archivo HTML

    // Interactuar con el formulario de agregar alimento
    await driver.findElement(By.id('nombre')).sendKeys('Manzana');
    await driver.findElement(By.id('calorias')).sendKeys('100');
    await driver.findElement(By.id('proteinas')).sendKeys('1');
    await driver.findElement(By.id('carbohidratos')).sendKeys('25');

    // Hacer clic en el botón de agregar
    await driver.findElement(By.id('add-food-btn')).click();

    // Esperar un poco para que se agregue el alimento a la lista
    await driver.wait(until.elementLocated(By.css('.list-group-item')), 10000);

    // Validar que el alimento se haya agregado correctamente
    let items = await driver.findElements(By.css('.list-group-item'));
    console.log(`Items en la lista: ${items.length}`); // Debe ser 1

  } finally {
    await driver.quit();
  }
})();
