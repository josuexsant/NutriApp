import express from "express";
import cors from "cors";
import { router } from "./routes/routes.js"; // Asegúrate de que la ruta sea correcta
import dotenv from "dotenv";
import { authMiddleware } from "./middlewares/authMiddleware.js"; // Importa el middleware

dotenv.config();

const app = express();

app.use(express.json());
app.use(authMiddleware);
app.use(express.urlencoded({ extended: false }));

app.use(cors({
	origin: 'http://localhost:5173', // Cambia al puerto correcto de tu app React
	methods: ['GET', 'POST', 'PUT', 'DELETE'], 
	credentials: true
}));

app.use("/", router);

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});

export default app;
