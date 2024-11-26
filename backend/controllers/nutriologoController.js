import sequelize from '../DataBase.js'; // Ajusta la ruta si es necesario
import bcrypt from 'bcrypt';
import * as auth from '../utils/auth.js'; // Si es necesario

const nutriologoRegister = async (req, res) => {
  const {
    name,
    lastname1,
    lastname2,
    phoneNumber,
    state,
    city,
    license,
    email,
    password,
    confirmPassword,
  } = req.body;

  try {
    // Verificar que todos los campos sean proporcionados
    if (
      !name ||
      !lastname1 ||
      !lastname2 ||
      !phoneNumber ||
      !state ||
      !city ||
      !license ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    // Verificar si las contraseñas coinciden
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Las contraseñas no coinciden" });
    }

    // Validar el formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "El correo electrónico no es válido" });
    }

    // Llamar al procedimiento para verificar la unicidad de correo, cédula y teléfono
    await sequelize.query(
      'CALL verificar_unicidad_nutriologo(:correo, :cedula, :telefono)',
      {
        replacements: { correo: email, cedula: license, telefono: phoneNumber },
        type: sequelize.QueryTypes.RAW,
      }
    );

    // Si pasa la validación, proceder con el registro
    const hashedPassword = await bcrypt.hash(password, 10);

    // Guardar al nutriologo en la base de datos
    const newNutriologo = await sequelize.query(
      `CALL guardar_nutriologo(
        :nombre, 
        :apellido_pat, 
        :apellido_mat, 
        :telefono, 
        :ciudad_residencia, 
        :codigo_postal, 
        :cedula_profesional, 
        :correo_electronico, 
        :contrasena, 
        :token
      )`,
      {
        replacements: {
          nombre: name,
          apellido_pat: lastname1,
          apellido_mat: lastname2,
          telefono: phoneNumber,
          ciudad_residencia: city,
          codigo_postal: state, // Asegúrate de que este campo sea realmente el código postal, o ajusta el nombre del campo
          cedula_profesional: license,
          correo_electronico: email,
          contrasena: hashedPassword,
          token: await auth.generarToken(email, password),
        },
        type: sequelize.QueryTypes.RAW,
      }
    );

    // Responder con un mensaje de éxito
    res.status(201).json({
      message: "Nutriólogo registrado exitosamente",
      data: newNutriologo,
    });
  } catch (error) {
    // Manejar errores del procedimiento almacenado (unicidad)
    if (error.original && error.original.sqlMessage) {
      return res.status(400).json({ message: error.original.sqlMessage });
    } else {
      // Manejar otros errores
      console.error("Error al registrar nutriólogo:", error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  }
};

export default {
  nutriologoRegister,
};
