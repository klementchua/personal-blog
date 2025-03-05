require('dotenv').config();
const router = require('./routes/routes');
const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_ORIGIN }));

app.use('/blogapi/v1', router);

module.exports = app;
