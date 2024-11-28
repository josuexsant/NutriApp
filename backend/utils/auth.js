import jwt from "jsonwebtoken";

//crea token y lo alamacena en la bd
export const generarToken = async (email, password) => {
	if (!email || !password){
		throw new Error('El email y la contraseña son requeridos');
	}
	const token = jwt.sign({ email: email, password: password }, process.env.SECRET_KEY);
	return token;
};
