import express from "express";
import { registrarCalorias } from "../controllers/caloriasController.js";
import { nutriologoRegister} from "../controllers/nutriologoController.js";
import { pacienteRegister} from "../controllers/pacienteController.js"

export const router = express.Router();

// Ruta para registrar un nutriólogo
router.post("/register/nutriologo", nutriologoRegister);

// Ruta para registrar un paciente
router.post("/register/paciente", pacienteRegister);

// Ruta para registrar calorías
router.post("/calorias", registrarCalorias);

export default router;
