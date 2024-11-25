const bcrypt = require("bcrypt");
const Nutriologo = require("../models/Nutriologo");
const Paciente = require("../models/Paciente");

// Registro para nutriólogos
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

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Las contraseñas no coinciden" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "El correo electrónico no es válido" });
    }

    const existingNutriologo = await Nutriologo.findOne({
      where: { Licencia: license },
    });
    const existingEmail = await Nutriologo.findOne({
      where: { Correo: email },
    });

    if (existingNutriologo) {
      return res.status(400).json({ message: "La licencia ya está registrada" });
    }

    if (existingEmail) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newNutriologo = await Nutriologo.create({
      Nombre: name,
      Apellido_paterno: lastname1,
      Apellido_materno: lastname2,
      Telefono: phoneNumber,
      Estado: state,
      Ciudad: city,
      Licencia: license,
      Correo: email,
      Contrasena: hashedPassword,
    });

    res.status(201).json({
      message: "Nutriólogo registrado exitosamente",
      data: newNutriologo,
    });
  } catch (error) {
    console.error("Error al registrar nutriólogo:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Registro para pacientes
const pacienteRegister = async (req, res) => {
  const {
    name,
    lastname1,
    lastname2,
    birthDate,
    height,
    weight,
    email,
    password,
    confirmPassword,
    phoneNumber,
  } = req.body;

  try {
    if (
      !name ||
      !lastname1 ||
      !lastname2 ||
      !birthDate ||
      !height ||
      !weight ||
      !email ||
      !password ||
      !confirmPassword ||
      !phoneNumber
    ) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Las contraseñas no coinciden" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newPaciente = await Paciente.create({
      Nombre: name,
      Apellido_paterno: lastname1,
      Apellido_materno: lastname2,
      Fecha_nacimiento: birthDate,
      Altura: height,
      Peso: weight,
      Correo: email,
      Contrasena: hashedPassword,
      Telefono: phoneNumber,
    });

    res.status(201).json({
      message: "Paciente registrado exitosamente",
      data: newPaciente,
    });
  } catch (error) {
    console.error("Error al registrar paciente:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

module.exports = {
  nutriologoRegister,
  pacienteRegister,
};
