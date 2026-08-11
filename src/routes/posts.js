const express = require('express');
const router = express.Router();
const postsService = require('../services/postsService');
const commentsService = require('../services/commentsService');
const { validatePost, validatePostUpdate, validateComment, validateIdParam } = require('../middlewares/validators');

router.get('/', async (req, res, next) => {
  try {
    const posts = await postsService.getAllPosts();
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
});

router.get('/author/:authorId', validateIdParam('authorId'), async (req, res, next) => {
  try {
    const result = await postsService.getPostsByAuthor(req.params.authorId);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', validateIdParam(), async (req, res, next) => {
  try {
    const post = await postsService.getPostById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
});

router.post('/', validatePost, async (req, res, next) => {
  try {
    const post = await postsService.createPost(req.body);
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', validateIdParam(), validatePostUpdate, async (req, res, next) => {
  try {
    const post = await postsService.updatePost(req.params.id, req.body);
    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', validateIdParam(), async (req, res, next) => {
  try {
    await postsService.deletePost(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

router.get('/:id/comments', validateIdParam(), async (req, res, next) => {
  try {
    const comments = await commentsService.getCommentsByPost(req.params.id);
    res.status(200).json(comments);
  } catch (err) {
    next(err);
  }
});

router.post(
  '/:id/comments',
  validateIdParam(),
  (req, res, next) => {
    req.body.post_id = req.params.id;
    next();
  },
  validateComment,
  async (req, res, next) => {
    try {
      const comment = await commentsService.createComment(req.body);
      res.status(201).json(comment);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;