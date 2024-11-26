import jwt from "jsonwebtoken";
import sequelize from "../DataBase.js"; // Ajusta la ruta si es necesario

//crea token y lo alamacena en la bd
export const generarToken = async (email, password) => {
	const token = jwt.sign({ email: email, password: password }, process.env.SECRET_KEY);
	return token;
};

//busca el token en la bd de acuerdo al id del usuario
export const buscarToken = async (id_usuario) => {
	try {
		const [results] = await sequelize.query("CALL buscarTokenPorUsuario(?)", [id_usuario]);
		// El primer conjunto de resultados contiene el token
		const token = results[0][0]?.token;

		if (!token) {
			throw new Error("Token no encontrado"); // Si no se encuentra el token, lanzar un error
		}

		return token; // Retornar el token si se encuentra
	} catch (error) {
		console.error("Error al buscar token:", error);
		throw error;
	}
};
