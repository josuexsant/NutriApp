import express from "express";
import { router } from "./routes/routes.js"; // Ensure the correct path
import dotenv from "dotenv";
import { authMiddleware } from "./middlewares/authMiddleware.js"; // Importa el middleware

dotenv.config();

const app = express();

app.use(express.json());
app.use(authMiddleware);
app.use(express.urlencoded({ extended: false }));

app.use("/", router);

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});

export default app;
