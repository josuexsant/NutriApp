import jwt from "jsonwebtoken";

//crea token y lo alamacena en la bd
export const generarToken = async (usuario_id, email, password) => {
	try {
		const token = jwt.sign({ usuario_id: usuario_id, email: email, password: password }, process.env.SECRET_KEY);

		//connection es el nombre de la conexion a la bd y guardarToken es el nombre del procedimiento almacenado
		const [results] = await connection.execute("CALL guardarToken(?, ?)", [usuario_id, token]);

		//retorna el boolean de la funcion guardarToken
		return results[0];
	} catch (error) {
		throw new Error("Error al generar o almacenar el token: " + err.message);
	}
};

export const verificarCredenciales = async (email, password) => {
	try {
		const [results] = await connection.execute("CALL verificarCredenciales(?, ?)", [email, password]);
		// Si el id no es NULL, entonces las credenciales son correctas
		const usuario = results[0][0];

		if (usuario && usuario.id) {
			return usuario.id; // Retornamos el ID del usuario si las credenciales son válidas
		} else {
			throw new Error("Credenciales inválidas");
		}
	} catch (err) {
		throw new Error("Error al verificar las credenciales: " + err.message);
	}
};

//busca el token en la bd de acuerdo al id del usuario
export const buscarToken = async (id_usuario) => {
	try {
		const [results] = await connection.execute("CALL buscarTokenPorUsuario(?)", [id_usuario]);
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
