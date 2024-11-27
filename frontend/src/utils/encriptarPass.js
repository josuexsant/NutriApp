// utils/encrypt.js
import bcrypt from "bcryptjs";

// Función para encriptar la contraseña
export const encryptPassword = async (password) => {
	try {
		const saltRounds = 10; // Determina el costo de la encriptación
		const hashedPassword = await bcrypt.hash(password, saltRounds); // Hashea la contraseña
		return hashedPassword;
	} catch (error) {
		throw new Error("Error al encriptar la contraseña");
	}
};
