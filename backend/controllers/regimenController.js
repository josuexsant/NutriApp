import connectDB from '../models/DataBase.js'; // Importa la conexión

// Controlador para agregar un régimen de consumo diario
const agregarRegimenConsumoDiario = async (req, res) => {
  const {
    pacienteId, diasJson, caloriasPorGrupoJson, alimentosJson
  } = req.body;

  try {
    const connection = await connectDB(); // Establece la conexión

    // Ejecutar el procedimiento almacenado para el régimen de consumo diario
    const [rows] = await connection.execute(
      'CALL agregar_regimen_consumo_diario(?, ?, ?, ?)',
      [pacienteId, diasJson, caloriasPorGrupoJson, alimentosJson]
    );

    res.status(200).json({ message: 'Régimen de consumo diario registrado exitosamente.' });
    connection.end(); // Cierra la conexión después de la consulta
  } catch (error) {
    // Manejar errores del procedimiento almacenado
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

// Controlador para agregar un régimen por tiempos
const agregarRegimenTiempos = async (req, res) => {
  const {
    pacienteId, limiteCalorias, tiemposComidaJson, caloriasPorGrupoJson, alimentosTiemposJson
  } = req.body;

  try {
    const connection = await connectDB(); // Establece la conexión

    // Ejecutar el procedimiento almacenado para el régimen por tiempos
    const [rows] = await connection.execute(
      'CALL agregar_regimen_tiempos(?, ?, ?, ?, ?)',
      [pacienteId, limiteCalorias, tiemposComidaJson, caloriasPorGrupoJson, alimentosTiemposJson]
    );

    res.status(200).json({ message: 'Régimen por tiempos registrado exitosamente.' });
    connection.end(); // Cierra la conexión después de la consulta
  } catch (error) {
    // Manejar errores del procedimiento almacenado
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

export default {
  agregarRegimenConsumoDiario,
  agregarRegimenTiempos
};