import request from 'supertest';
import app from '../../app'; // Ajusta la ruta a tu aplicación

describe('POST /register-paciente', () => {
  it('debería registrar un nuevo paciente exitosamente', async () => {
    const nuevoPaciente = {
      name: 'John Doe',
      age: 30,
      email: 'john.doe@example.com',
      password: 'password123',
    };

    const response = await request(app)
      .post('/register-paciente')
      .send(nuevoPaciente);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(nuevoPaciente.name);
    expect(response.body.email).toBe(nuevoPaciente.email);
  });

  it('debería devolver 400 si faltan campos obligatorios', async () => {
    const pacienteIncompleto = {
      name: 'Jane Doe',
    };

    const response = await request(app)
      .post('/register-paciente')
      .send(pacienteIncompleto);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  it('debería devolver 409 si el correo electrónico ya existe', async () => {
    const pacienteExistente = {
      name: 'John Doe',
      age: 30,
      email: 'john.doe@example.com',
      password: 'password123',
    };

    // Primer registro
    await request(app).post('/register-paciente').send(pacienteExistente);

    // Segundo registro con el mismo correo
    const response = await request(app)
      .post('/register-paciente')
      .send(pacienteExistente);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty('error');
  });

  it('debería registrar un nuevo paciente con información detallada exitosamente', async () => {
    const nuevoPaciente = {
      nombres: 'Gabriel',
      apellido_pat: 'Romero',
      apellido_mat: 'Luna',
      fecha_nacimiento: '1990-05-15',
      genero: 'M',
      peso: 75.5,
      altura: 1.75,
      telefono: '0987654321',
      correo_electronico: 'gabriel.luna@example.com',
      contrasena: 'securepassword123',
    };

    const response = await request(app)
      .post('/register-paciente')
      .send(nuevoPaciente);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.nombres).toBe(nuevoPaciente.nombres);
    expect(response.body.correo_electronico).toBe(
      nuevoPaciente.correo_electronico
    );
  });
});
