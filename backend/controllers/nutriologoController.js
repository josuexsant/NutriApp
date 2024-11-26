import sequelize from '../DataBase.js'; // Ajusta la ruta si es necesario

const verificarUnicidadNutriologo = async (req, res) => {
  const { correo, cedula, telefono } = req.body;

  try {
    // Ejecutar el procedimiento almacenado
    await sequelize.query(
      'CALL verificar_unicidad_nutriologo(:correo, :cedula, :telefono)',
      {
        replacements: { correo, cedula, telefono }, // Parámetros para el procedimiento
        type: sequelize.QueryTypes.RAW,            // Indica que es una consulta RAW
      }
    );

    // Si el procedimiento no lanza errores, el registro es único
    res.status(200).json({ message: 'El registro es único y válido.' });
  } catch (error) {
    // Manejar errores personalizados del procedimiento almacenado
    if (error.original && error.original.sqlMessage) {
      res.status(400).json({ error: error.original.sqlMessage });
    } else {
      // Manejar otros errores
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  }
};

export default {
  verificarUnicidadNutriologo,
};