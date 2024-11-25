const { nutriologoRegister, pacienteRegister } = require("../../controllers/userController");
const Nutriologo = require("../../models/Nutriologo");
const Paciente = require("../../models/Paciente");

// Mockear los modelos para evitar interacciones reales con la base de datos
jest.mock("../../models/Nutriologo.js");
jest.mock("../../models/Paciente.js");

describe("userController tests", () => {
  describe("nutriologoRegister", () => {
    it("Debe retornar un error si faltan campos obligatorios", async () => {
      const req = {
        body: { name: "", lastname1: "", lastname2: "", phoneNumber: "", state: "", city: "", license: "", email: "", password: "", confirmPassword: "" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await nutriologoRegister(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Todos los campos son obligatorios" });
    });

    it("Debe retornar un error si las contraseñas no coinciden", async () => {
      const req = {
        body: { name: "Juan", lastname1: "Perez", lastname2: "Lopez", phoneNumber: "1234567890", state: "Estado", city: "Ciudad", license: "ABC123", email: "juan@example.com", password: "123456", confirmPassword: "654321" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await nutriologoRegister(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Las contraseñas no coinciden" });
    });

    it("Debe registrar un nutriólogo exitosamente", async () => {
      const req = {
        body: { name: "Juan", lastname1: "Perez", lastname2: "Lopez", phoneNumber: "1234567890", state: "Estado", city: "Ciudad", license: "ABC123", email: "juan@example.com", password: "123456", confirmPassword: "123456" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Nutriologo.create.mockResolvedValue({ id: 1, ...req.body });

      await nutriologoRegister(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: "Nutriólogo registrado exitosamente", data: expect.objectContaining({ id: 1 }) });
    });

    it("Debe manejar errores internos del servidor", async () => {
      const req = {
        body: { name: "Juan", lastname1: "Perez", lastname2: "Lopez", phoneNumber: "1234567890", state: "Estado", city: "Ciudad", license: "ABC123", email: "juan@example.com", password: "123456", confirmPassword: "123456" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Nutriologo.create.mockRejectedValue(new Error("Error al registrar"));

      await nutriologoRegister(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Error interno del servidor" });
    });
  });

  describe("pacienteRegister", () => {
    it("Debe retornar un error si faltan campos obligatorios", async () => {
      const req = {
        body: { name: "", lastname1: "", lastname2: "", birthDate: "", height: "", weight: "", email: "", password: "", confirmPassword: "", phoneNumber: "" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await pacienteRegister(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Todos los campos son obligatorios" });
    });

    it("Debe retornar un error si las contraseñas no coinciden", async () => {
      const req = {
        body: { name: "Juan", lastname1: "Perez", lastname2: "Lopez", birthDate: "2000-01-01", height: 180, weight: 75, email: "juan@example.com", password: "123456", confirmPassword: "654321", phoneNumber: "1234567890" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await pacienteRegister(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Las contraseñas no coinciden" });
    });

    it("Debe registrar un paciente exitosamente", async () => {
      const req = {
        body: { name: "Juan", lastname1: "Perez", lastname2: "Lopez", birthDate: "2000-01-01", height: 180, weight: 75, email: "juan@example.com", password: "123456", confirmPassword: "123456", phoneNumber: "1234567890" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Paciente.create.mockResolvedValue({ id: 1, ...req.body });

      await pacienteRegister(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: "Paciente registrado exitosamente", data: expect.objectContaining({ id: 1 }) });
    });

    it("Debe manejar errores internos del servidor", async () => {
      const req = {
        body: { name: "Juan", lastname1: "Perez", lastname2: "Lopez", birthDate: "2000-01-01", height: 180, weight: 75, email: "juan@example.com", password: "123456", confirmPassword: "123456", phoneNumber: "1234567890" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Paciente.create.mockRejectedValue(new Error("Error al registrar"));

      await pacienteRegister(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Error interno del servidor" });
    });
  });
});
