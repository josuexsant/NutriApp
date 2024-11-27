import express from "express";
import { registrarCalorias } from "../controllers/caloriasController.js";
import { nutriologoRegister } from "../controllers/nutriologoController.js";
import { pacienteRegister } from "../controllers/pacienteController.js";
import { guardarRegimen } from "../controllers/regimenController.js";

export const router = express.Router();

router.post("/register/nutriologo", nutriologoRegister);
router.post("/register/paciente", pacienteRegister);
router.post("/calorias", registrarCalorias);
router.post("/regimen", guardarRegimen);

export default router;
