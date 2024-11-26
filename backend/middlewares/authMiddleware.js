// middlewares/authMiddleware.js
import jwt from "jsonwebtoken"; // Asegúrate de importar jwt

export const authMiddleware = (req, res, next) => {
	const token = req.headers["authorization"]?.split(" ")[1]; // Extraemos el token después de "Bearer"

	req.session = { usuario: null };

	if (!token) {
		return next(); // Si no hay token, pasa al siguiente middleware
	}

	try {
		const data = jwt.verify(token, process.env.SECRET_KEY); // Verifica el token
		req.session.user = {
			usuario: data.usuario_id,
		};
	} catch (error) {
		console.log("Token inválido:", error); // Para depuración
	}

	next(); // Continua al siguiente middleware o ruta
};
