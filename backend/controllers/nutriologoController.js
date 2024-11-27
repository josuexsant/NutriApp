import connectDB from '../models/DataBase.js'; // Importa la conexión

const verificarUnicidadNutriologo = async (req, res) => {
  const { correo, cedula, telefono } = req.body;

  try {
    const connection = await connectDB(); // Establece la conexión

    // Ejecutar el procedimiento almacenado
    const [rows] = await connection.execute(
      'CALL verificar_unicidad_nutriologo(?, ?, ?)', // Utiliza los placeholders (?) para los parámetros
      [correo, cedula, telefono] // Los valores que pasas al procedimiento
    );

    // Si el procedimiento no lanza errores, el registro es único
    res.status(200).json({ message: 'El registro es único y válido.' });
    connection.end(); // Cierra la conexión después de la consulta
  } catch (error) {
    // Manejar errores personalizados del procedimiento almacenado
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ error: 'El nutriólogo ya está registrado.' });
    } else {
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  }
};

const guardarNutriologo = async (req, res) => {
  const {
    nombre, apellido_pat, apellido_mat, telefono, ciudad_residencia,
    codigo_postal, cedula_profesional, correo_electronico, contrasena, token
  } = req.body;

  try {
    const connection = await connectDB(); // Establece la conexión

    // Ejecutar el procedimiento almacenado
    const [rows] = await connection.execute(
      'CALL guardar_nutriologo(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [nombre, apellido_pat, apellido_mat, telefono, ciudad_residencia,
      codigo_postal, cedula_profesional, correo_electronico, contrasena, token]
    );

    res.status(200).json({ message: 'Nutriólogo registrado exitosamente.' });
    connection.end(); // Cierra la conexión después de la consulta
  } catch (error) {
    // Manejar errores del procedimiento almacenado
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

const autenticarNutriologo = async (req, res) => {
  const { correo_electronico, contrasena } = req.body;

  try {
    const connection = await connectDB(); // Establece la conexión

    // Ejecutar el procedimiento almacenado
    const [rows] = await connection.execute(
      'CALL autenticar_nutriologo(?, ?, @token)',
      [correo_electronico, contrasena]
    );

    // Obtener el token
    const [tokenQuery] = await connection.execute('SELECT @token AS token');

    if (tokenQuery[0].token) {
      res.status(200).json({ token: tokenQuery[0].token });
    } else {
      res.status(400).json({ error: 'Correo electrónico o contraseña incorrectos.' });
    }

    connection.end(); // Cierra la conexión después de la consulta
  } catch (error) {
    // Manejar errores del procedimiento almacenado
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

// Nueva función para modificar el correo del nutriólogo
const modificarCorreoNutriologo = async (req, res) => {
  const { id_nutriologo, nuevo_correo_electronico } = req.body;

  try {
    const connection = await connectDB(); // Establece la conexión

    // Ejecutar el procedimiento almacenado
    const [rows] = await connection.execute(
      'CALL ModificarCorreo(?, ?)', // Utiliza los placeholders (?) para los parámetros
      [id_nutriologo, nuevo_correo_electronico] // Los valores que pasas al procedimiento
    );

    // Verifica si se actualizó correctamente
    if (rows && rows.length > 0 && rows[0].mensaje === 'Correo actualizado correctamente.') {
      res.status(200).json({ message: rows[0].mensaje });
    } else {
      res.status(400).json({ error: 'No se pudo actualizar el correo. El ID del nutriólogo no existe.' });
    }

    connection.end(); // Cierra la conexión después de la consulta
  } catch (error) {
    // Manejar errores del procedimiento almacenado
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

export default {
  verificarUnicidadNutriologo,
  guardarNutriologo,
  autenticarNutriologo,
  modificarCorreoNutriologo,
};