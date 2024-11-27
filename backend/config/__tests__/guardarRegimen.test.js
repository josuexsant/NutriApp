const request = require("supertest");
const express = require("express");
const RegimenTiempos = require("../../models/RegimenTiempos");
const { guardarRegimen } = require("../../controllers/regimenController");

// Crear una instancia de la aplicación Express
const app = express();
app.use(express.json());

// Mock del modelo RegimenTiempos
jest.mock("../../models/RegimenTiempos", () => ({
  create: jest.fn(),
}));

// Rutas de prueba
app.post("/api/regimen", guardarRegimen);

describe("Pruebas del controlador guardarRegimen", () => {
  it("debería devolver un error si falta algún campo obligatorio en el régimen", async () => {
    const response = await request(app)
      .post("/api/regimen")
      .send({
        regimen: [
          {
            diaSemana: "Lunes",
            // Falta caloriasTotales
            distribucionCalorias: [{ kcal: 500 }, { kcal: 1500 }],
          },
        ],
      });

    expect(response.status).toBe(400);
    expect(response.body.mensaje).toBe("Falta el campo obligatorio: caloriasTotales.");
  });

  it("debería devolver un error si la suma de las calorías excede las calorías totales", async () => {
    const response = await request(app)
      .post("/api/regimen")
      .send({
        regimen: [
          {
            diaSemana: "Lunes",
            caloriasTotales: 2000,
            distribucionCalorias: [{ kcal: 1500 }, { kcal: 600 }],
          },
        ],
      });

    expect(response.status).toBe(400);
    expect(response.body.mensaje).toBe("Las calorías para Lunes exceden el total permitido.");
  });

  it("debería devolver un error si hay un problema al guardar en la base de datos", async () => {
    RegimenTiempos.create.mockRejectedValue(new Error("Error al guardar en la base de datos"));

    const response = await request(app)
      .post("/api/regimen")
      .send({
        regimen: [
          {
            diaSemana: "Lunes",
            caloriasTotales: 2000,
            distribucionCalorias: [{ kcal: 500 }, { kcal: 1500 }],
          },
        ],
      });

    expect(response.status).toBe(500);
    expect(response.body.mensaje).toBe("Hubo un error al guardar el régimen.");
  });

  it("debería guardar correctamente el régimen si todos los datos son válidos", async () => {
    RegimenTiempos.create.mockResolvedValue({
      Dia: "Lunes",
      Calorias_totales: 2000,
      Grupos_calorias: JSON.stringify([{ kcal: 500 }, { kcal: 1500 }]),
    });

    const response = await request(app)
      .post("/api/regimen")
      .send({
        regimen: [
          {
            diaSemana: "Lunes",
            caloriasTotales: 2000,
            distribucionCalorias: [{ kcal: 500 }, { kcal: 1500 }],
          },
        ],
      });

    expect(response.status).toBe(201);
    expect(response.body.mensaje).toBe("Régimen guardado exitosamente.");
    expect(response.body.data.length).toBe(1);
    expect(response.body.data[0].Dia).toBe("Lunes");
  });
});
