import express from "express";
import { nutriologoRegister, pacienteRegister } from "../controllers/userController.js";

export const router = express.Router();

// Ruta para registrar un nutriólogo
router.post("/register/nutriologo", nutriologoRegister);

// Ruta para registrar un paciente
router.post("/register/paciente", pacienteRegister);

export default router;
