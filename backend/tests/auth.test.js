const request = require('supertest');
const app = require('../server');
const User = require('../models/User');

describe('Auth API', () => {
  beforeAll(async () => {
    await User.sync({ force: true }); // Limpiar la base de datos
  });

  test('Registro de usuario', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({ username: 'testuser', password: 'password123', role: 'employee' });
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Usuario registrado exitosamente');
  });

  test('Inicio de sesión', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ username: 'testuser', password: 'password123' });
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });
});
