import { Router } from "express";
export const router = Router();

// Escribe aqui tus rutas...
router.post("/register", () => {
	console.log("endpoint register");
});
