const { parse } = require('dotenv');
const db = require('../db/db');
const bcrypt = require('bcrypt');
const { post } = require('../config/prisma');

// User functions
async function getAllUsers(req, res) {
  const users = await db.getAllUsers();
  res.json(users);
}
async function getUser(req, res) {
  const user = await db.getUserById(parseInt(req.params.id));
  res.json(user);
}
async function addUser(req, res) {
  const { username, email, password } = req.body;
  const hashedpw = await bcrypt.hash(password, 10);
  await db.addUser({ username, email, password: hashedpw });
  res.end();
}

// Post functions
async function getAllPosts(req, res) {
  const posts = await db.getAllPosts();
  res.json(posts);
}
async function getPost(req, res) {
  const post = await db.getPostById(parseInt(req.params.id));
  res.json(post);
}
async function addPost(req, res) {
  const { title, content, userId } = req.body;
  await db.addPost({ title, content, userId });
  res.end();
}
async function updatePost(req, res) {
  const { id } = req.params;
  const { title, content } = req.body;
  await db.updatePost({ id: parseInt(id), title, content });
  res.end();
}
async function deletePost(req, res) {
  const { id } = req.params;
  await db.deletePost(parseInt(id));
  res.end();
}
async function publishPost(req, res) {
  const { id } = req.params;
  await db.publishPost(parseInt(id));
  res.end();
}
async function unpublishPost(req, res) {
  const { id } = req.params;
  await db.unpublishPost(parseInt(id));
  res.end();
}

// Comment functions
async function getAllComments(req, res) {
  const { postId } = req.params;
  const comments = await db.getAllComments(parseInt(postId));
  res.json(comments);
}
async function getComment(req, res) {
  const { postId, commentId } = req.params;
  const comment = await db.getCommentById(
    parseInt(postId),
    parseInt(commentId)
  );
  res.json(comment);
}
async function addComment(req, res) {
  const { content, userId } = req.body;
  const { postId } = req.params;
  await db.addComment({
    content,
    postId: parseInt(postId),
    userId,
  });
  res.end();
}
async function updateComment(req, res) {
  const { postId, commentId } = req.params;
  const { content } = req.body;
  await db.updateComment({
    postId: parseInt(postId),
    commentId: parseInt(commentId),
    content,
  });
  res.end();
}
async function deleteComment(req, res) {
  const { postId, commentId } = req.params;
  await db.deleteComment(parseInt(postId), parseInt(commentId));
  res.end();
}

module.exports = {
  getAllUsers,
  getUser,
  addUser,
  getAllPosts,
  getPost,
  addPost,
  updatePost,
  deletePost,
  publishPost,
  unpublishPost,
  getAllComments,
  getComment,
  addComment,
  updateComment,
  deleteComment,
};
