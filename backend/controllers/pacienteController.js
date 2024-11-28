import connectDB from "../models/DataBase.js"; // Ajusta la ruta si es necesario
import * as auth from "../utils/auth.js"; // Ajusta la ruta si es necesario

//  Procedimiento para guardar un paciente
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

  const parsedPeso = parseFloat(peso);
  const parsedAltura = parseFloat(altura);
  const token = "abcdetest";

  try {
    const connection = await connectDB(); // Establece la conexión
    const [rows] = await connection.execute(
      "CALL guardar_paciente(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        nombres,
        apellido_pat,
        apellido_mat,
        fecha_nacimiento,
        genero,
        parsedPeso,
        parsedAltura,
        telefono,
        correo_electronico,
        contrasena,
        token,
      ]
    );
    console.log("Respuesta del procedimiento:", rows);
    res.status(200).json({ message: "Paciente registrado exitosamente." });
  } catch (error) {
    if (error.original && error.original.sqlMessage) {
      res.status(400).json({ error: error.original.sqlMessage });
    } else {
      res.status(500).json({ error });
    }
  }
};

// Procedimiento para verificar la unicidad del correo electrónico
const verificarCorreoPaciente = async (req, res) => {
  const { correo } = req.body;

  try {
    await sequelize.query(`CALL verificar_correo_paciente(:correo)`, {
      replacements: { correo },
      type: sequelize.QueryTypes.RAW,
    });

    res.status(200).json({ message: "El correo es único y válido." });
  } catch (error) {
    if (error.original && error.original.sqlMessage) {
      res.status(400).json({ error: error.original.sqlMessage });
    } else {
      res.status(500).json({ error: "Error interno del servidor." });
    }
  }
};

export const obtenerPacientes = async (req, res) => {
  try {
    const connection = await connectDB(); // Establece la conexión
    const [rows] = await connection.execute("CALL obtener_pacientes()");
    console.log("Respuesta del procedimiento:", rows);
    res.status(200).json(rows[0]);
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
  verificarCorreoPaciente,
};
