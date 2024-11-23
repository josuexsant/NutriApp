import express from "express";
import routes from "./routes/routes.js"; // Ajusta la ruta según la ubicación real de routes.js

const app = express();
app.use(express.json());

// Usar las rutas definidas
app.use("/api", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
