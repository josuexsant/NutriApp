const { Builder, By, until } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');

(async function testNutriApp() {
  let options = new firefox.Options();
  // options.addArguments('--headless'); // Descomenta esta línea para ejecutar en modo sin ventana

  let driver = await new Builder().forBrowser('firefox')
    .setFirefoxOptions(options)
    .build();

  try {
    // Navegar a la página de login
    await driver.get('http://localhost:5173/login');

    // Esperar hasta que el campo de correo esté visible e ingresar el correo electrónico
    await driver.wait(until.elementLocated(By.id('email')), 10000).sendKeys('aguilar@gmail.com');
    
    // Esperar hasta que el campo de contraseña esté visible e ingresar la contraseña
    await driver.wait(until.elementLocated(By.id('password')), 10000).sendKeys('1234');
    
    // Hacer clic en el botón de Acceder
    await driver.findElement(By.css('button[type="submit"]')).click();

    // Esperar a que redirija al dashboard y verificar que esté en la página correcta
    await driver.wait(until.urlContains('/dashboard'), 10000);
    console.log('Inicio de sesión exitoso y redireccionado al dashboard.');

    // Buscar y hacer clic en el enlace o botón del panel de estadísticas
    await driver.wait(until.elementLocated(By.linkText('Panel de Estadísticas')), 10000).click();

    // Esperar hasta que cargue el panel de estadísticas
    await driver.wait(until.elementLocated(By.css('.stats-section')), 10000);
    console.log('Acceso exitoso al panel de estadísticas.');

  } catch (error) {
    console.error('Error en la prueba:', error);
  } finally {
    await driver.quit();
  }
})();
