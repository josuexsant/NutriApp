const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("nombre_base_datos", "usuario", "contraseña", {
  host: "127.0.0.1", // o la dirección IP de tu base de datos
  dialect: "mysql",  // o el dialecto correspondiente
  logging: false,    // Opcional: desactiva los logs de SQL
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión a la base de datos exitosa");
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error);
  }
})();

module.exports = sequelize;
