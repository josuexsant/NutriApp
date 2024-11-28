import { generarToken } from '../../utils/auth';
import jwt from 'jsonwebtoken';

process.env.SECRET_KEY = 'test_secret_key';

describe('generarToken', () => {
    it('debería generar un token válido para un usuario', async () => {
      const email = 'test@example.com';
      const password = 'test_password';
      
      const token = await generarToken(email, password);
      
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      expect(decoded).toHaveProperty('email', email);
      expect(decoded).toHaveProperty('password', password);
    });
  
    it('debería lanzar un error si no se pasa el email o la contraseña', async () => {
        try {
          await generarToken();
        } catch (error) {
          console.log('Error esperado:', error.message);
          expect(error.message).toBe('El email y la contraseña son requeridos');
        }
      });
  });
  
