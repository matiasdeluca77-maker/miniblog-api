const request = require('supertest');
const app = require('../src/app');
const pool = require('../src/db/pool');

// Cierra la conexión a la base al terminar, si no Jest queda "colgado"
afterAll(async () => {
  await pool.end();
});

describe('Authors API', () => {
  let createdAuthorId;
  const testEmail = `test.${Date.now()}@example.com`;

  test('GET /authors devuelve una lista', async () => {
    const res = await request(app).get('/authors');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /authors crea un author válido', async () => {
    const res = await request(app)
      .post('/authors')
      .send({ name: 'Nuevo Author', email: testEmail, bio: 'Bio de test' });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    createdAuthorId = res.body.id;
  });

  test('POST /authors sin email obligatorio devuelve 400', async () => {
    const res = await request(app).post('/authors').send({ name: 'Sin Email' });
    expect(res.status).toBe(400);
  });

  test('POST /authors con email duplicado devuelve 400', async () => {
    const res = await request(app)
      .post('/authors')
      .send({ name: 'Otro', email: testEmail });
    expect(res.status).toBe(400);
  });

  test('GET /authors/:id devuelve el author creado', async () => {
    const res = await request(app).get(`/authors/${createdAuthorId}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(createdAuthorId);
  });

  test('GET /authors/:id con id inexistente devuelve 404', async () => {
    const res = await request(app).get('/authors/999999');
    expect(res.status).toBe(404);
  });

  test('PUT /authors/:id actualiza parcialmente', async () => {
    const res = await request(app)
      .put(`/authors/${createdAuthorId}`)
      .send({ bio: 'Bio actualizada' });
    expect(res.status).toBe(200);
    expect(res.body.bio).toBe('Bio actualizada');
  });

  test('DELETE /authors/:id elimina el author creado', async () => {
    const res = await request(app).delete(`/authors/${createdAuthorId}`);
    expect(res.status).toBe(204);
  });

  test('DELETE /authors/:id sobre un recurso inexistente devuelve 404', async () => {
    const res = await request(app).delete('/authors/999999');
    expect(res.status).toBe(404);
  });
});