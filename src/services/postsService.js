const pool = require('../db/pool');
const ApiError = require('../middlewares/ApiError');

async function getAllPosts() {
  const { rows } = await pool.query('SELECT * FROM posts ORDER BY id');
  return rows;
}

async function getPostById(id) {
  const { rows } = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
  if (rows.length === 0) {
    throw new ApiError(404, `No existe un post con id ${id}.`);
  }
  return rows[0];
}

async function getPostsByAuthor(authorId) {
  const authorCheck = await pool.query('SELECT id, name, email, bio FROM authors WHERE id = $1', [authorId]);
  if (authorCheck.rows.length === 0) {
    throw new ApiError(404, `No existe un author con id ${authorId}.`);
  }

  const { rows } = await pool.query(
    `SELECT p.*, a.name AS author_name, a.email AS author_email
     FROM posts p
     JOIN authors a ON a.id = p.author_id
     WHERE p.author_id = $1
     ORDER BY p.id`,
    [authorId]
  );

  return { author: authorCheck.rows[0], posts: rows };
}

async function createPost({ title, content, author_id, published }) {
  const authorCheck = await pool.query('SELECT id FROM authors WHERE id = $1', [author_id]);
  if (authorCheck.rows.length === 0) {
    throw new ApiError(400, `El author_id ${author_id} no existe.`);
  }

  const { rows } = await pool.query(
    `INSERT INTO posts (title, content, author_id, published)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [title, content, author_id, published ?? false]
  );
  return rows[0];
}

async function updatePost(id, { title, content, author_id, published }) {
  const { rows } = await pool.query(
    `UPDATE posts
     SET title = COALESCE($1, title),
         content = COALESCE($2, content),
         author_id = COALESCE($3, author_id),
         published = COALESCE($4, published)
     WHERE id = $5
     RETURNING *`,
    [title, content, author_id, published, id]
  );
  if (rows.length === 0) {
    throw new ApiError(404, `No existe un post con id ${id}.`);
  }
  return rows[0];
}

async function deletePost(id) {
  const { rows } = await pool.query('DELETE FROM posts WHERE id = $1 RETURNING id', [id]);
  if (rows.length === 0) {
    throw new ApiError(404, `No existe un post con id ${id}.`);
  }
}

module.exports = {
  getAllPosts,
  getPostById,
  getPostsByAuthor,
  createPost,
  updatePost,
  deletePost,
};