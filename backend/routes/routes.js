import { Router } from "express";
import * as controller from "../controllers/index.js";
export const router = Router();
import {
  guardarNutriologo,
  autenticarNutriologo,
} from "../controllers/nutriologoController.js";
import { obtenerPacientes } from "../controllers/pacienteController.js";

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
  const { correo_electronico, contrasena } = req.body;
  autenticarNutriologo(req, res);
});

router.get("/getPatients", (_, res) => {
  obtenerPacientes(_, res);
});

router.post("/logout", (req, res) => {
  return res.status(200);
});
