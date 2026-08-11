const express = require('express');
const router = express.Router();
const authorsService = require('../services/authorsService');
const { validateAuthor, validateAuthorUpdate, validateIdParam } = require('../middlewares/validators');

router.get('/', async (req, res, next) => {
  try {
    const authors = await authorsService.getAllAuthors();
    res.status(200).json(authors);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', validateIdParam(), async (req, res, next) => {
  try {
    const author = await authorsService.getAuthorById(req.params.id);
    res.status(200).json(author);
  } catch (err) {
    next(err);
  }
});

router.post('/', validateAuthor, async (req, res, next) => {
  try {
    const author = await authorsService.createAuthor(req.body);
    res.status(201).json(author);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', validateIdParam(), validateAuthorUpdate, async (req, res, next) => {
  try {
    const author = await authorsService.updateAuthor(req.params.id, req.body);
    res.status(200).json(author);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', validateIdParam(), async (req, res, next) => {
  try {
    await authorsService.deleteAuthor(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;