import request from "supertest";
import app from "../../index.js"; // Adjust the path to your app

describe("POST /register", () => {
  it(
    "Se registra un usuario nuevo",
    async () => {
      const response = await request(app).post("/register").send({
        nombre: "Viridiana",
        apellido_pat: "Benitez",
        apellido_mat: "Gonzalez",
        telefono: "7771234123",
        ciudad_residencia: "Axochiapan",
        codigo_postal: "72495",
        cedula_profesional: "1212121212",
        correo_electronico: "viri.benitez@example.com",
        contrasena: "password123",
        token: "abcdef123456",
      });

      expect(response.status).toBe(200);
    },
    it("te da un error en caso de usurio ya registrado", async () => {
      const response = await request(app).post("/register").send({
        nombre: "viri",
        apellido_pat: "Perez",
        apellido_mat: "Gomez",
        telefono: "1231567811",
        ciudad_residencia: "Ciudad de Mexico",
        codigo_postal: "01234",
        cedula_profesional: "2233112212",
        correo_electronico: "viri.psserez@example.com",
        contrasena: "password123",
        token: "abcdef123456",
      });
      expect(response.status).toBe(500);
    })
  );

});
