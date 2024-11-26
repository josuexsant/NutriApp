const Calorias = require("../models/Calorias");

// Función para validar los datos de entrada
const validarDatos = (datos) => {
  const {
    cerealesSinGrasa,
    frutas,
    verduras,
    alimentosOAMuyBajoGrasa,
    alimentosOABajoGrasa,
    lecheYSustitutos,
    leguminosas,
    grasas,
    totalCalorias,
  } = datos;

  if (
    cerealesSinGrasa < 0 || frutas < 0 || verduras < 0 ||
    alimentosOAMuyBajoGrasa < 0 || alimentosOABajoGrasa < 0 ||
    lecheYSustitutos < 0 || leguminosas < 0 || grasas < 0 ||
    totalCalorias < 0
  ) {
    return { valido: false, error: "Los valores no pueden ser negativos." };
  }
  return { valido: true };
};

// Función lógica para guardar los datos
const guardarCalorias = async (datos) => {
  const entrada = new Calorias(datos);
  return await entrada.save();
};

// Controlador principal
const registrarCalorias = async (req, res) => {
  try {
    const datos = req.body;

    // Validar datos
    const { valido, error } = validarDatos(datos);
    if (!valido) {
      return res.status(400).json({ message: "Datos inválidos", error });
    }

    // Guardar en la base de datos
    const resultado = await guardarCalorias(datos);
    return res.status(201).json({
      message: "Registro de calorías exitoso",
      data: resultado,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al registrar las calorías", error });
  }
};

module.exports = { registrarCalorias, validarDatos, guardarCalorias };
