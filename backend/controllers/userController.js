// import bcrypt from "bcrypt";
// import mysql from "mysql2/promise";
// import User from "../models/User";

// // TODO:
// const dbConfig = {
// 	host: "localhost",
// 	user: "root",
// 	password: "",
// 	database: "nombre_de_tu_base_de_datos",
// };

// export const Login = async (req, res) => {
// 	const { correo, contrasena } = req.body;

// 	User.findOne({ where: { Correo: correo } })
// 		.then((user) => {
// 			if (!user) {
// 				return res.status(404).json({ message: "Usuario no encontrado" });
// 			}

// 			bcrypt.compare(contrasena, user.Contrasena, (err, result) => {
// 				if (err) {
// 					return res.status(401).json({ message: "Error al autenticar" });
// 				}

// 				if (result) {
// 					return res.status(200).json({ message: "Usuario autenticado" });
// 				}

// 				return res.status(401).json({ message: "Contraseña incorrecta" });
// 			});
// 		})
// 		.catch((error) => {
// 			console.error(error);
// 			res.status(500).json({ message: "Error al autenticar" });
// 		});
// };

// const registerUser = async (req, res) => {
// 	// email = req.body.email;
// 	// password = req.body.password;
// 	// try {
// 	// 	const connection = await mysql.createConnection(dbConfig);
// 	// 	const [results] = await connection.execute("CALL verificarCredenciales(?, ?)", [email, password]);
// 	// 	const usuario = results[0][0];
// 	// 	if (usuario && usuario.id) {
// 	// 		//aqui generamos y guardamos el token
// 	// 		const token = jwt.sign(
// 	// 			{ usuario_id: usuario.id, email: email, password: password },
// 	// 			process.env.SECRET_KEY
// 	// 		);
// 	// 		const [results] = await connection.execute("CALL guardarToken(?, ?)", [usuario.id, token]);
// 	// 	} else {
// 	// 		throw new Error("Credenciales inválidas");
// 	// 	}
// 	// } catch (err) {
// 	// 	throw new Error("Error al verificar las credenciales: " + err.message);
// 	// }
// };
