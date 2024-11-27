import { Router } from "express";
import * as controller from "../controllers/index.js";
export const router = Router();

// Escribe aqui tus rutas...
router.post("/register", controller.NutriologoController.guardarNutriologo);
router.post("/autenticar-nutriologo", controller.NutriologoController.autenticarNutriologo);
router.post("/register-paciente", controller.PacienteController.guardarPaciente);

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
