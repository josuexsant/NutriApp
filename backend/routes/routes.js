import { Router } from "express";
import * as controller from "../controllers/index.js";
export const router = Router();

// Escribe aqui tus rutas...
router.post("/register", controller.NutriologoController.guardarNutriologo);
router.post("/autenticar-nutriologo", controller.NutriologoController.autenticarNutriologo);
router.post("/register-paciente", controller.PacienteController.guardarPaciente);

router.post("/prueba", (req, res) => {
	res.json({ message: "Hola mundo" });
});
