import bcrypt from "bcrypt";
import Nutriologo from "../models/Nutriologo.js";
import Paciente from "../models/Paciente.js";

// Registro para nutriólogos
export const nutriologoRegister = async (req, res) => {
  const { name, lastname1, lastname2, phoneNumber, state, city, license, email, password, confirmPassword } = req.body;

  try {
    if (!name || !lastname1 || !lastname2 || !phoneNumber || !state || !city || !license || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Las contraseñas no coinciden" });
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

    res.status(201).json({ message: "Nutriólogo registrado exitosamente", data: newNutriologo });
  } catch (error) {
    console.error("Error al registrar nutriólogo:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Registro para pacientes
export const pacienteRegister = async (req, res) => {
  const { name, lastname1, lastname2, birthDate, height, weight, email, password, confirmPassword, phoneNumber } = req.body;

  try {
    if (!name || !lastname1 || !lastname2 || !birthDate || !height || !weight || !email || !password || !confirmPassword || !phoneNumber) {
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

    res.status(201).json({ message: "Paciente registrado exitosamente", data: newPaciente });
  } catch (error) {
    console.error("Error al registrar paciente:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
