import request from 'supertest';
import app from '../../index'; // Asegúrate de que la ruta a tu archivo app.js sea correcta

describe('POST /login', () => {
  it('Inicio de sesion con credenciales validas', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        email: 'josue@gmail.com',
        password: '1234'
      });
    expect(response.statusCode).toBe(200);
    //expect(response.body).toHaveProperty('token');
  });

  it('Inicio de sesion con credenciales no validas', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        email: 'nadie@gmail.com',
        password: '1234'
      });
    expect(response.statusCode).toBe(400);
    //expect(response.body).toHaveProperty('error');
  });
});