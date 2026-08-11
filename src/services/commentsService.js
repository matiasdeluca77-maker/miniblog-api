const pool = require('../db/pool');
const ApiError = require('../middlewares/ApiError');

async function getCommentsByPost(postId) {
  const postCheck = await pool.query('SELECT id FROM posts WHERE id = $1', [postId]);
  if (postCheck.rows.length === 0) {
    throw new ApiError(404, `No existe un post con id ${postId}.`);
  }

  const { rows } = await pool.query(
    `SELECT c.*, a.name AS author_name
     FROM comments c
     LEFT JOIN authors a ON a.id = c.author_id
     WHERE c.post_id = $1
     ORDER BY c.id`,
    [postId]
  );
  return rows;
}

async function createComment({ content, post_id, author_id }) {
  const postCheck = await pool.query('SELECT id FROM posts WHERE id = $1', [post_id]);
  if (postCheck.rows.length === 0) {
    throw new ApiError(400, `El post_id ${post_id} no existe.`);
  }

  if (author_id) {
    const authorCheck = await pool.query('SELECT id FROM authors WHERE id = $1', [author_id]);
    if (authorCheck.rows.length === 0) {
      throw new ApiError(400, `El author_id ${author_id} no existe.`);
    }
  }

  const { rows } = await pool.query(
    `INSERT INTO comments (content, post_id, author_id)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [content, post_id, author_id || null]
  );
  return rows[0];
}

module.exports = { getCommentsByPost, createComment };