import request from 'supertest';
import app from '../../app'; // Adjust the path to your app

describe('POST /register-paciente', () => {
  it('should register a new patient successfully', async () => {
    const newPatient = {
      name: 'John Doe',
      age: 30,
      email: 'john.doe@example.com',
      password: 'password123'
    };

    const response = await request(app)
      .post('/register-paciente')
      .send(newPatient);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(newPatient.name);
    expect(response.body.email).toBe(newPatient.email);
  });

  it('should return 400 if required fields are missing', async () => {
    const incompletePatient = {
      name: 'Jane Doe'
    };

    const response = await request(app)
      .post('/register-paciente')
      .send(incompletePatient);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  it('should return 409 if email already exists', async () => {
    const existingPatient = {
      name: 'John Doe',
      age: 30,
      email: 'john.doe@example.com',
      password: 'password123'
    };

    // First registration
    await request(app)
      .post('/register-paciente')
      .send(existingPatient);

    // Second registration with the same email
    const response = await request(app)
      .post('/register-paciente')
      .send(existingPatient);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty('error');
  });
});
it('should register a new patient with detailed information successfully', async () => {
  const newPatient = {
    nombres: 'Gabriel',
    apellido_pat: 'Romero',
    apellido_mat: 'Luna',
    fecha_nacimiento: '1990-05-15',
    genero: 'M',
    peso: 75.5,
    altura: 1.75,
    telefono: '0987654321',
    correo_electronico: 'gabriel.luna@example.com',
    contrasena: 'securepassword123'
  };

  const response = await request(app)
    .post('/register-paciente')
    .send(newPatient);

  expect(response.status).toBe(201);
  expect(response.body).toHaveProperty('id');
  expect(response.body.nombres).toBe(newPatient.nombres);
  expect(response.body.correo_electronico).toBe(newPatient.correo_electronico);
});