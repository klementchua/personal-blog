const { Router } = require('express');
const router = Router();
const controller = require('../controllers/controller');

// For users
router.get('/users', controller.getAllUsers);
router.post('/users', controller.addUser);

// For blog posts
router.get('/posts', controller.getAllPosts);
router.post('/posts', controller.addPost);
router.get('/posts/:id', controller.getPost);
router.put('/posts/:id', controller.updatePost);
router.delete('/posts/:id', controller.deletePost);
router.post('/posts/:id/publish', controller.publishPost);

// For post comments
router.get('/posts/:postId/comments', controller.getAllComments);
router.post('/posts/:postId/comments', controller.addComment);
router.get('/posts/:postId/comments/:commentId', controller.getComment);
router.put('/posts/:postId/comments/:commentId', controller.updateComment);
router.delete('/posts/:postId/comments/:commentId', controller.deleteComment);

module.exports = router;
