// backend/config/__test__/authMiddleware.test.js
import request from 'supertest';
import express from 'express';
import jwt from 'jsonwebtoken';
import { authMiddleware } from '../../middlewares/authMiddleware';

const app = express();
app.use(express.json());
app.use((req, res, next) => {
    req.headers.authorization = req.headers.authorization || '';
    next();
});
app.use(authMiddleware);

// Define una ruta de prueba para manejar las solicitudes GET a /prueba_middleware
app.get('/prueba_middleware', (req, res) => {
    res.status(200).json({ message: 'Success', email: req.session.email }); // Respuesta exitosa con el email
});

// Caso de prueba: Middleware de autenticación (Happy Path)
describe('Middleware de autenticación', () => {
    process.env.SECRET_KEY = 'tu_clave_secreta'; // Asegúrate de definir la clave secreta aquí

    it('debería manejar correctamente un token válido', async () => {
        const validToken = jwt.sign({ email: 'usuario@example.com' }, process.env.SECRET_KEY);
        
        const response = await request(app)
            .get('/prueba_middleware') // Ruta de prueba
            .set('Authorization', `Bearer ${validToken}`);

        expect(response.status).toBe(200);
        expect(response.body.email).toBe('usuario@example.com'); // Verifica que el email se haya almacenado
    });

    // Caso de prueba: Middleware de autenticación (Scary Path - Token Inválido)
    it('debería manejar correctamente un token inválido', async () => {
        const invalidToken = 'token.invalido';

        const response = await request(app)
            .get('/prueba_middleware') 
            .set('Authorization', `Bearer ${invalidToken}`);

        expect(response.status).toBe(401);
        expect(response.body.error).toBe('Token inválido o malformado'); // Verifica el mensaje de error
    });
});