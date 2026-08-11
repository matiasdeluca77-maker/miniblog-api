const pool = require('../db/pool');
const ApiError = require('../middlewares/ApiError');

async function getAllAuthors() {
  const { rows } = await pool.query(
    'SELECT id, name, email, bio, created_at FROM authors ORDER BY id'
  );
  return rows;
}

async function getAuthorById(id) {
  const { rows } = await pool.query(
    'SELECT id, name, email, bio, created_at FROM authors WHERE id = $1',
    [id]
  );
  if (rows.length === 0) {
    throw new ApiError(404, `No existe un author con id ${id}.`);
  }
  return rows[0];
}

async function createAuthor({ name, email, bio }) {
  const { rows } = await pool.query(
    `INSERT INTO authors (name, email, bio)
     VALUES ($1, $2, $3)
     RETURNING id, name, email, bio, created_at`,
    [name, email, bio || null]
  );
  return rows[0];
}

async function updateAuthor(id, { name, email, bio }) {
  const { rows } = await pool.query(
    `UPDATE authors
     SET name = COALESCE($1, name),
         email = COALESCE($2, email),
         bio = COALESCE($3, bio)
     WHERE id = $4
     RETURNING id, name, email, bio, created_at`,
    [name, email, bio, id]
  );
  if (rows.length === 0) {
    throw new ApiError(404, `No existe un author con id ${id}.`);
  }
  return rows[0];
}

async function deleteAuthor(id) {
  const { rows } = await pool.query(
    'DELETE FROM authors WHERE id = $1 RETURNING id',
    [id]
  );
  if (rows.length === 0) {
    throw new ApiError(404, `No existe un author con id ${id}.`);
  }
}

module.exports = {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
};