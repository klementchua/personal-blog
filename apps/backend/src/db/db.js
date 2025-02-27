const prisma = require('../config/prisma');

// Users
async function getAllUsers() {
  const users = await prisma.user.findMany();
  return users;
}
async function addUser(data) {
  await prisma.user.create({
    data,
  });
}

// Posts
async function getAllPosts() {
  const posts = await prisma.post.findMany();
  return posts;
}
async function getPostById(id) {
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
  });
  return post;
}
async function addPost({ title, content, userId }) {
  await prisma.post.create({
    data: {
      title,
      content,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}
async function updatePost({ id, title, content }) {
  await prisma.post.update({
    where: {
      id,
    },
    data: {
      title,
      content,
    },
  });
}
async function deletePost(id) {
  await prisma.comment.deleteMany({
    where: {
      postId: id,
    },
  });
  await prisma.post.delete({
    where: {
      id,
    },
  });
}
async function publishPost(id) {
  await prisma.post.update({
    where: {
      id,
    },
    data: {
      isPublished: true,
      datePublished: new Date(),
    },
  });
}

// Comments
async function getAllComments(postId) {
  const comments = await prisma.comment.findMany({
    where: {
      postId,
    },
  });
  return comments;
}
async function getCommentById(postId, commentId) {
  const comment = await prisma.comment.findUnique({
    where: {
      postId,
      id: commentId,
    },
  });
  return comment;
}
async function addComment({ content, postId, userId }) {
  await prisma.comment.create({
    data: {
      content,
      postId,
      userId,
    },
  });
}
async function updateComment({ postId, commentId, content }) {
  await prisma.comment.update({
    where: {
      postId,
      id: commentId,
    },
    data: {
      content,
    },
  });
}
async function deleteComment(postId, commentId) {
  await prisma.comment.delete({
    where: {
      postId,
      id: commentId,
    },
  });
}

module.exports = {
  getAllUsers,
  addUser,
  getAllPosts,
  getPostById,
  addPost,
  updatePost,
  deletePost,
  publishPost,
  getAllComments,
  getCommentById,
  addComment,
  updateComment,
  deleteComment,
};
