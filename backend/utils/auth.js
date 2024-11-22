import jwt from "jsonwebtoken";

//la funcion solo crea tokens para guardarlos en la base de datos. devuelve el token en base a el user, email, password y rol
export const generateToken = (usuario, email, password, rol) => {
	return jwt.sign({ usuario: usuario, email: email, password: password, rol: rol }, process.env.SECRET_KEY);
};
