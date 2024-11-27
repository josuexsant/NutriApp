// middlewares/authMiddleware.js
import jwt from "jsonwebtoken"; // Asegúrate de importar jwt

export const authMiddleware = (req, res, next) => {
	const token = req.headers["authorization"]?.split(" ")[1]; // Extraemos el token después de "Bearer"

	req.session = { email: null };

	if (!token) {
		return next(); // Si no hay token, pasa al siguiente middleware
	}

	try {
		const data = jwt.verify(token, process.env.SECRET_KEY); // Verifica el token
		req.session = {
			email: data.email,
		};
	} catch (error) {
		return res.status(401).json({ error: "Token inválido o malformado" }); // Respuesta clara
	}

	next(); // Continua al siguiente middleware o ruta
};
