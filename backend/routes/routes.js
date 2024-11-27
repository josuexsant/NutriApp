import { Router } from "express";
import * as controller from "../controllers/index.js";
export const router = Router();
import { login } from "../controllers/nutriologoController.js";

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

router.post("/login", (req, res) => {
  const status = login(req, res);
  if (status === 200) {
    res.status(200).json({ message: "Usuario logeado" });
  } else {
    res.status(400).json({ message: "Usuario no logeado" });
  }
});
