const caloriasController = require('../../controllers/caloriasController');
const Calorias = require('../../models/Calorias');

// Prueba para la función validarDatos
describe("validarDatos", () => {
  test("Debe devolver válido si los datos son correctos", () => {
    const datosValidos = {
      cerealesSinGrasa: 5,
      frutas: 3,
      verduras: 4,
      alimentosOAMuyBajoGrasa: 2,
      alimentosOABajoGrasa: 1,
      lecheYSustitutos: 3,
      leguminosas: 2,
      grasas: 1,
      totalCalorias: 100,
    };

    const resultado = caloriasController.validarDatos(datosValidos); // Ajusta el llamado al controlador
    expect(resultado).toEqual({ valido: true });
  });

  test("Debe devolver error si un valor es negativo", () => {
    const datosInvalidos = {
      cerealesSinGrasa: -1,
      frutas: 3,
      verduras: 4,
      alimentosOAMuyBajoGrasa: 2,
      alimentosOABajoGrasa: 1,
      lecheYSustitutos: 3,
      leguminosas: 2,
      grasas: 1,
      totalCalorias: 100,
    };

    const resultado = caloriasController.validarDatos(datosInvalidos); // Ajusta el llamado al controlador
    expect(resultado).toEqual({
      valido: false,
      error: "Los valores no pueden ser negativos.",
    });
  });
});

// Mock para probar la función registrarCalorias
describe("registrarCalorias", () => {
  test("Debe responder con estado 201 si los datos son válidos", async () => {
    const req = {
      body: {
        cerealesSinGrasa: 5,
        frutas: 3,
        verduras: 4,
        alimentosOAMuyBajoGrasa: 2,
        alimentosOABajoGrasa: 1,
        lecheYSustitutos: 3,
        leguminosas: 2,
        grasas: 1,
        totalCalorias: 100,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await caloriasController.registrarCalorias(req, res); // Ajusta el llamado al controlador

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Registro de calorías exitoso",
      })
    );
  });

  test("Debe responder con estado 400 si los datos son inválidos", async () => {
    const req = {
      body: {
        cerealesSinGrasa: -5,
        frutas: 3,
        verduras: 4,
        alimentosOAMuyBajoGrasa: 2,
        alimentosOABajoGrasa: 1,
        lecheYSustitutos: 3,
        leguminosas: 2,
        grasas: 1,
        totalCalorias: 100,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await caloriasController.registrarCalorias(req, res); // Ajusta el llamado al controlador

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Datos inválidos",
      })
    );
  });
});
