import sequelize from '../DataBase.js'; // Ajusta la ruta si es necesario

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
    token,
  } = req.body;

  try {
    await sequelize.query(
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
        type: sequelize.QueryTypes.RAW,
      }
    );

    res.status(200).json({ message: 'Paciente registrado exitosamente.' });
  } catch (error) {
    if (error.original && error.original.sqlMessage) {
      res.status(400).json({ error: error.original.sqlMessage });
    } else {
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  }
};

// Procedimiento para verificar la unicidad del correo electrónico
const verificarCorreoPaciente = async (req, res) => {
  const { correo } = req.body;

  try {
    await sequelize.query(
      `CALL verificar_correo_paciente(:correo)`,
      {
        replacements: { correo },
        type: sequelize.QueryTypes.RAW,
      }
    );

    res.status(200).json({ message: 'El correo es único y válido.' });
  } catch (error) {
    if (error.original && error.original.sqlMessage) {
      res.status(400).json({ error: error.original.sqlMessage });
    } else {
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  }
};

export default {
  guardarPaciente,
  verificarCorreoPaciente,
};