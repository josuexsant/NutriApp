const { validationResult } = require("express-validator");
const RegimenTiempos = require("../models/RegimenTiempos");

// Función para manejar el registro del régimen
const guardarRegimen = async (req, res) => {
  try {
    // Validar errores en el request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errores: errors.array(),
        mensaje: "Validaciones fallidas en los datos enviados.",
      });
    }

    const { regimen } = req.body;

    // Verificar que se envíen los datos necesarios
    if (!regimen || !Array.isArray(regimen)) {
      return res.status(400).json({
        mensaje: "Datos inválidos o incompletos: el campo 'regimen' es obligatorio y debe ser un arreglo.",
      });
    }

    const regimenGuardado = [];
    for (const dia of regimen) {
      const { diaSemana, caloriasTotales, distribucionCalorias } = dia;

      // Verificar que todos los campos estén presentes
      if (!diaSemana) {
        return res.status(400).json({
          mensaje: "Falta el campo obligatorio: diaSemana.",
        });
      }
      if (!caloriasTotales) {
        return res.status(400).json({
          mensaje: "Falta el campo obligatorio: caloriasTotales.",
        });
      }
      if (!Array.isArray(distribucionCalorias)) {
        return res.status(400).json({
          mensaje: "Falta el campo obligatorio: distribucionCalorias debe ser un arreglo.",
        });
      }

      // Calcular suma de calorías
      const sumaCalorias = distribucionCalorias.reduce(
        (acc, grupo) => acc + (grupo.kcal || 0),
        0
      );

      if (sumaCalorias > caloriasTotales) {
        return res.status(400).json({
          mensaje: `Las calorías para ${diaSemana} exceden el total permitido.`,
        });
      }

      // Guardar cada día en la base de datos
      const nuevoDia = await RegimenTiempos.create({
        Dia: diaSemana,
        Calorias_totales: caloriasTotales,
        Grupos_calorias: JSON.stringify(distribucionCalorias),
      });

      regimenGuardado.push(nuevoDia);
    }

    // Respuesta exitosa
    res.status(201).json({
      mensaje: "Régimen guardado exitosamente.",
      data: regimenGuardado,
    });
  } catch (error) {
    console.error("Error al guardar el régimen:", error);
    res.status(500).json({
      mensaje: "Hubo un error al guardar el régimen.",
      error: error.message,
    });
  }
};

module.exports = {
  guardarRegimen,
};
