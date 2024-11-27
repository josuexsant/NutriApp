import connectDB from "../models/DataBase.js"; // Ajusta la ruta si es necesario
import bcrypt from "bcrypt";
import * as auth from "../utils/auth.js"; // Si es necesario

const verificarUnicidadNutriologo = async (req, res) => {
	const { correo, cedula, telefono } = req.body;

	try {
		const connection = await connectDB(); // Establece la conexión
		console.log("entro a verificarUnicidadNutriologo");

		// Ejecutar el procedimiento almacenado
		const [rows] = await connection.execute(
			"CALL verificar_unicidad_nutriologo(?, ?, ?)", // Utiliza los placeholders (?) para los parámetros
			[correo, cedula, telefono] // Los valores que pasas al procedimiento
		);

		// Si el procedimiento no lanza errores, el registro es único
		res.status(200).json({ message: "El registro es único y válido." });
		connection.end(); // Cierra la conexión después de la consulta
	} catch (error) {
		// Manejar errores personalizados del procedimiento almacenado
		if (error.code === "ER_DUP_ENTRY") {
			res.status(400).json({ error: "El nutriólogo ya está registrado." });
		} else {
			res.status(500).json({ error: "Error interno del servidor." });
		}
	}
};

const guardarNutriologo = async (req, res) => {
	const {
		nombre,
		apellido_pat,
		apellido_mat,
		telefono,
		ciudad_residencia,
		codigo_postal,
		cedula_profesional,
		correo_electronico,
		contrasena,
	} = req.body;
	const token = await auth.generarToken(correo_electronico, contrasena);
	try {
		const connection = await connectDB(); // Establece la conexión

		// Ejecutar el procedimiento almacenado
		const [rows] = await connection.execute("CALL guardar_nutriologo(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [
			nombre,
			apellido_pat,
			apellido_mat,
			telefono,
			ciudad_residencia,
			codigo_postal,
			cedula_profesional,
			correo_electronico,
			contrasena,
			token,
		]);

		console.log("Resultado de la ejecución del procedimiento:", rows);
		res.status(200).json({ message: "Nutriólogo registrado exitosamente." });
		connection.end(); // Cierra la conexión después de la consulta
	} catch (error) {
		// Manejar errores del procedimiento almacenado
		console.error("Error al registrar nutriólogo:", error.message);
		res.status(500).json({ error: "Error interno del servidor." });
	}
};

const autenticarNutriologo = async (req, res) => {
	const { correo_electronico, contrasena } = req.body;

	try {
		const connection = await connectDB(); // Establece la conexión

		// Ejecutar el procedimiento almacenado
		const [rows] = await connection.execute("CALL autenticar_nutriologo(?, ?, @token)", [
			correo_electronico,
			contrasena,
		]);

		// Obtener el token
		const [tokenQuery] = await connection.execute("SELECT @token AS token");

		if (tokenQuery[0].token) {
			res.status(200).json({ token: tokenQuery[0].token });
		} else {
			res.status(400).json({ error: "Correo electrónico o contraseña incorrectos." });
		}

		connection.end(); // Cierra la conexión después de la consulta
	} catch (error) {
		// Manejar errores del procedimiento almacenado
		res.status(500).json({ error: "Error interno del servidor." });
	}
};

export default {
	verificarUnicidadNutriologo,
	guardarNutriologo,
	autenticarNutriologo,
};
