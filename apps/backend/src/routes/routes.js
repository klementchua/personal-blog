const { Router } = require('express');
const router = Router();
const controller = require('../controllers/controller');
const authController = require('../controllers/authController');
const passport = require('../config/passport');

// Authentication
router.post('/login', authController.login);
// router.post('/logout', authController.logout);

// For users
router.get('/users', controller.getAllUsers);
router.post('/users', controller.addUser);
router.get('/users/:id', controller.getUser);

// For blog posts
router.get('/posts', controller.getAllPosts);
router.post(
  '/posts',
  passport.authenticate('jwt', { session: false }),
  authController.isAdmin,
  controller.addPost
);
router.get('/posts/:id', controller.getPost);
router.put(
  '/posts/:id',
  passport.authenticate('jwt', { session: false }),
  authController.isAdmin,
  controller.updatePost
);
router.delete(
  '/posts/:id',
  passport.authenticate('jwt', { session: false }),
  authController.isAdmin,
  controller.deletePost
);
router.post(
  '/posts/:id/publish',
  passport.authenticate('jwt', { session: false }),
  authController.isAdmin,
  controller.publishPost
);

// For post comments
router.get('/posts/:postId/comments', controller.getAllComments);
router.post(
  '/posts/:postId/comments',
  passport.authenticate('jwt', { session: false }),
  controller.addComment
);
router.get('/posts/:postId/comments/:commentId', controller.getComment);
router.put(
  '/posts/:postId/comments/:commentId',
  passport.authenticate('jwt', { session: false }),
  authController.canEditComment,
  controller.updateComment
);
router.delete(
  '/posts/:postId/comments/:commentId',
  passport.authenticate('jwt', { session: false }),
  authController.canEditComment,
  controller.deleteComment
);

module.exports = router;
