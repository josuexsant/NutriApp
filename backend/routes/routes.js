import { Router } from "express";
export const router = Router();

// Escribe aqui tus rutas...
router.post("/register", () => {
	console.log("endpoint register");
});

res.cookie("access_token", token, {
	httpOnly: true,
	sameSite: "strict",
	maxAge: 1000 * 60,
});
