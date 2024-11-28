import { Router } from "express";
import * as controller from "../controllers/index.js";
export const router = Router();
import { login } from "../controllers/nutriologoController.js";
import { guardarNutriologo } from "../controllers/nutriologoController.js";

// Escribe aqui tus rutas...
router.post("/register", (req, res) => {
  const {
    nombre,
    apellido_pat,
    apellido_mat,
    telefono,
    ciudad_residencia,
    codigo_postal,
    cedula_profesional,
    correo_electronico,
    contrasena,
    token,
  } = req.body;

  // Add your logic here to handle the registration
  console.log("hola desde la api");
  console.log(req.body);
  guardarNutriologo(req, res);
});

router.post(
  "/autenticar-nutriologo",
  controller.NutriologoController.autenticarNutriologo
);
router.post(
  "/register-paciente",
  controller.PacienteController.guardarPaciente
);

router.get("/prueba_middleware", (req, res) => {
  //checa el encabezado req.session
  console.log(req.session);
  if (req.session.email) {
    res.json({ message: "Usuario autenticado" });
  } else {
    res.json({ message: "Usuario no autenticado" });
  }
});

router.post("/prueba", (req, res) => {
  res.json({ message: "Hola mundo" });
});

router.post("/login", (req, res) => {
  const status = login(req, res);
  if (status === 200) {
    res.status(200).json({ message: "Usuario logeado" });
  } else {
    res.status(400).json({ message: "Usuario no logeado" });
  }
});

router.get("/getPatients", (_, res) => {
  const patients = [
    { id: 1, name: "Juan Perez" },
    { id: 2, name: "Maria Lopez" },
    { id: 3, name: "Carlos Sanchez" },
    { id: 4, name: "Ana Martinez" },
    { id: 5, name: "Luis Fernandez" },
    { id: 6, name: "Sofia Ramirez" },
    { id: 7, name: "Pedro Rodriguez" },
  ];

  return res.status(200).json(patients);
});

router.post("/logout", (req, res) => {
  return res.status(200);
});
