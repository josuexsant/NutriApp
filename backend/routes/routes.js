import { Router } from "express";
import * as controller from "../controllers/index.js";
export const router = Router();

// Escribe aqui tus rutas...
router.post("/register", controller.NutriologoController.nutriologoRegister);

router.post("/prueba", (req, res) => {
	res.json({ message: "Hola mundo" });
});
