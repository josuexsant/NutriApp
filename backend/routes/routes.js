import { Router } from "express";
export const router = Router();
import { login } from "../controllers/nutriologoController.js";

// Escribe aqui tus rutas...
router.post("/register", () => {
  console.log("endpoint register");
});

router.post("/login", (req, res) => {
  const status = login(req, res);
  if (status === 200) {
    res.status(200).json({ message: "Usuario logeado" });
  } else {
    res.status(400).json({ message: "Usuario no logeado" });
  }
});
