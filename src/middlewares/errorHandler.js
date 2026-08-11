const ApiError = require('./ApiError');

function errorHandler(err, req, res, next) {
  console.error(err);

  if (err.code === '23505') {
    return res.status(400).json({ error: 'El valor ya existe (debe ser único).' });
  }

  if (err.code === '23503') {
    return res.status(400).json({ error: 'Referencia inválida (el recurso relacionado no existe).' });
  }

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  return res.status(500).json({ error: 'Error interno del servidor.' });
}

function notFoundHandler(req, res) {
  res.status(404).json({ error: 'Recurso no encontrado.' });
}

module.exports = { errorHandler, notFoundHandler };