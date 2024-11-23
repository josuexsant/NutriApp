import bcrypt from "bcrypt";
import mysql from "mysql2/promise";
import User from "../models/User";

// TODO:
const dbConfig = {
	host: "localhost",
	user: "root",
	password: "",
	database: "nombre_de_tu_base_de_datos",
};

export const Login = async (req, res) => {
	const { correo, contrasena } = req.body;

	User.findOne({ where: { Correo: correo } })
		.then((user) => {
			if (!user) {
				return res.status(404).json({ message: "Usuario no encontrado" });
			}

			bcrypt.compare(contrasena, user.Contrasena, (err, result) => {
				if (err) {
					return res.status(401).json({ message: "Error al autenticar" });
				}

				if (result) {
					return res.status(200).json({ message: "Usuario autenticado" });
				}

				return res.status(401).json({ message: "Contraseña incorrecta" });
			});
		})
		.catch((error) => {
			console.error(error);
			res.status(500).json({ message: "Error al autenticar" });
		});
};

const registerUser = async (req, res) => {
	User.create({
		Nombre: req.body.nombre,
		Apellidos: req.body.apellidos,
		Correo: req.body.correo,
		Contrasena: req.body.contrasena,
		Telefono: req.body.telefono,
	})
		.then(() => {
			res.status(201).json({ message: "Usuario registrado exitosamente" });
		})
		.catch((error) => {
			console.error(error);
			res.status(500).json({ message: "Error al registrar el usuario" });
		});
};
