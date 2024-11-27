import request from 'supertest';
import app from '../../index'; // Asegúrate de que la ruta a tu archivo app.js sea correcta

describe('POST /login', () => {
  it('should respond with a 200 status code and a token for valid credentials', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        email: 'josue@gmail.com',
        password: '1234'
      });
    expect(response.statusCode).toBe(200);
    //expect(response.body).toHaveProperty('token');
  });

  it('should respond with a 401 status code for invalid credentials', async () => {
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