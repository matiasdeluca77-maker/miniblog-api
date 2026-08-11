const request = require('supertest');
const app = require('../src/app');
const pool = require('../src/db/pool');

afterAll(async () => {
  await pool.end();
});

describe('Posts API', () => {
  let createdPostId;

  test('GET /posts devuelve una lista', async () => {
    const res = await request(app).get('/posts');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /posts crea un post válido', async () => {
    const res = await request(app)
      .post('/posts')
      .send({ title: 'Post de test', content: 'Contenido de test', author_id: 1 });
    expect(res.status).toBe(201);
    createdPostId = res.body.id;
  });

  test('POST /posts con author_id inexistente devuelve 400', async () => {
    const res = await request(app)
      .post('/posts')
      .send({ title: 'x', content: 'y', author_id: 999999 });
    expect(res.status).toBe(400);
  });

  test('GET /posts/:id devuelve el post creado', async () => {
    const res = await request(app).get(`/posts/${createdPostId}`);
    expect(res.status).toBe(200);
  });

  test('GET /posts/:id con id inexistente devuelve 404', async () => {
    const res = await request(app).get('/posts/999999');
    expect(res.status).toBe(404);
  });

  test('POST /posts/:id/comments crea un comentario', async () => {
    const res = await request(app)
      .post(`/posts/${createdPostId}/comments`)
      .send({ content: 'Comentario de test', author_id: 1 });
    expect(res.status).toBe(201);
  });

  test('DELETE /posts/:id elimina el post creado', async () => {
    const res = await request(app).delete(`/posts/${createdPostId}`);
    expect(res.status).toBe(204);
  });

  test('DELETE /posts/:id sobre un recurso inexistente devuelve 404', async () => {
    const res = await request(app).delete('/posts/999999');
    expect(res.status).toBe(404);
  });
});