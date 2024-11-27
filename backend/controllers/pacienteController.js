import connectDB from "../models/DataBase.js"; // Ajusta la ruta si es necesario
import * as auth from "../utils/auth.js"; // Ajusta la ruta si es necesario

// Procedimiento para guardar un paciente
const guardarPaciente = async (req, res) => {
	const {
		nombres,
		apellido_pat,
		apellido_mat,
		fecha_nacimiento,
		genero,
		peso,
		altura,
		telefono,
		correo_electronico,
		contrasena,
	} = req.body;

	try {
		// Verificamos si el correo ya está registrado
		const [resultado] = await connectDB.query(`CALL verificar_correo_paciente(:correo)`, {
			replacements: { correo: correo_electronico },
			type: connectDB.QueryTypes.RAW,
		});

		// Si el resultado tiene algún valor, significa que el correo ya existe
		if (resultado && resultado.length > 0) {
			return res.status(400).json({ error: "El correo electrónico ya está en uso." });
		}

		// Si el correo no existe, generamos el token
		const token = await auth.generarToken(correo_electronico, contrasena);

		// Llamamos al procedimiento para guardar el paciente
		await connectDB.query(
			`CALL guardar_paciente(
        :nombres, 
        :apellido_pat, 
        :apellido_mat, 
        :fecha_nacimiento, 
        :genero, 
        :peso, 
        :altura, 
        :telefono, 
        :correo_electronico, 
        :contrasena, 
        :token
      )`,
			{
				replacements: {
					nombres,
					apellido_pat,
					apellido_mat,
					fecha_nacimiento,
					genero,
					peso,
					altura,
					telefono,
					correo_electronico,
					contrasena,
					token,
				},
				type: connectDB.QueryTypes.RAW,
			}
		);

		res.status(200).json({ message: "Paciente registrado exitosamente." });
	} catch (error) {
		if (error.original && error.original.sqlMessage) {
			res.status(400).json({ error: error.original.sqlMessage });
		} else {
			res.status(500).json({ error: "Error interno del servidor." });
		}
	}
};

export default {
	guardarPaciente,
};
