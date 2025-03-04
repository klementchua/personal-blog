require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const prisma = require('../config/prisma');

function generateToken(user) {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
}

async function login(req, res) {
  const { username, password } = req.body;
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) return res.status(401).json({ message: 'Invalid username' });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: 'Invalid password' });

  const token = generateToken(user);
  res.json({
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
}

async function isAdmin(req, res, next) {
  if (req.user.role === 'ADMIN') {
    return next();
  }
  return res.status(403).json({ message: 'Access denied.' });
}

async function canEditComment(req, res, next) {
  try {
    const comment = await prisma.comment.findUnique({
      where: {
        id: parseInt(req.params.commentId),
        postId: parseInt(req.params.postId),
      },
    });
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found.' });
    }
    if (comment.userId === req.user.id || req.user.role === 'ADMIN') {
      return next();
    }
    return res.status(403).json({ message: 'Access denied.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = {
  login,
  isAdmin,
  canEditComment,
};
