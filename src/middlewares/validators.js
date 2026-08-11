const ApiError = require('./ApiError');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateAuthor(req, res, next) {
  const { name, email } = req.body;
  if (!name || typeof name !== 'string' || !name.trim()) {
    return next(new ApiError(400, 'El campo "name" es obligatorio.'));
  }
  if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email)) {
    return next(new ApiError(400, 'El campo "email" es obligatorio y debe ser válido.'));
  }
  next();
}

function validateAuthorUpdate(req, res, next) {
  const { name, email } = req.body;
  if (name !== undefined && (typeof name !== 'string' || !name.trim())) {
    return next(new ApiError(400, 'El campo "name" no puede estar vacío.'));
  }
  if (email !== undefined && (typeof email !== 'string' || !EMAIL_REGEX.test(email))) {
    return next(new ApiError(400, 'El campo "email" debe ser válido.'));
  }
  next();
}

function validatePost(req, res, next) {
  const { title, content, author_id } = req.body;
  if (!title || typeof title !== 'string' || !title.trim()) {
    return next(new ApiError(400, 'El campo "title" es obligatorio.'));
  }
  if (!content || typeof content !== 'string' || !content.trim()) {
    return next(new ApiError(400, 'El campo "content" es obligatorio.'));
  }
  if (author_id === undefined || author_id === null || isNaN(Number(author_id))) {
    return next(new ApiError(400, 'El campo "author_id" es obligatorio y debe ser numérico.'));
  }
  next();
}

function validatePostUpdate(req, res, next) {
  const { title, content, author_id } = req.body;
  if (title !== undefined && (typeof title !== 'string' || !title.trim())) {
    return next(new ApiError(400, 'El campo "title" no puede estar vacío.'));
  }
  if (content !== undefined && (typeof content !== 'string' || !content.trim())) {
    return next(new ApiError(400, 'El campo "content" no puede estar vacío.'));
  }
  if (author_id !== undefined && isNaN(Number(author_id))) {
    return next(new ApiError(400, 'El campo "author_id" debe ser numérico.'));
  }
  next();
}

function validateComment(req, res, next) {
  const { content, post_id } = req.body;
  if (!content || typeof content !== 'string' || !content.trim()) {
    return next(new ApiError(400, 'El campo "content" es obligatorio.'));
  }
  if (post_id === undefined || post_id === null || isNaN(Number(post_id))) {
    return next(new ApiError(400, 'El campo "post_id" es obligatorio y debe ser numérico.'));
  }
  next();
}

function validateIdParam(paramName = 'id') {
  return (req, res, next) => {
    if (isNaN(Number(req.params[paramName]))) {
      return next(new ApiError(400, `El parámetro "${paramName}" debe ser numérico.`));
    }
    next();
  };
}

module.exports = {
  validateAuthor,
  validateAuthorUpdate,
  validatePost,
  validatePostUpdate,
  validateComment,
  validateIdParam,
};