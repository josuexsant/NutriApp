import { Sequelize } from "sequelize";

// Configuración de la conexión con Sequelize
const sequelize = new Sequelize("ssa", "root", "1234", {
  host: "localhost",
  dialect: "mysql", // Dialecto de la base de datos (MySQL en este caso)
  logging: false,   // Opcional: desactiva el logging de consultas SQL en consola
});

// Verificar la conexión
try {
  await sequelize.authenticate();
  console.log("Conexión a la base de datos establecida correctamente.");
} catch (error) {
  console.error("Error al conectar con la base de datos:", error);
}

export default sequelize;
