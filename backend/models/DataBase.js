import mysql from "mysql2/promise";

// Configuración de la conexión a la base de datos
const connectDB = async () => {
  try {
    const connection = await mysql.createConnection({
      host: "127.0.0.1", // Cambia al host de tu base de datos
      user: "root", // Cambia al usuario de tu base de datos
      password: "", // Cambia a la contraseña de tu base de datos
      database: "nutriapp", // Cambia al nombre de tu base de datos
    });

		console.log("Conexión exitosa a la base de datos");
		return connection;
	} catch (error) {
		console.error("Error al conectar a la base de datos:", error);
		throw error;
	}
};

export default connectDB;
