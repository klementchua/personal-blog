require('dotenv').config();
const router = require('./routes/routes');
const express = require('express');
const app = express();

app.use(express.json());

app.use('/blogapi/v1', router);

module.exports = app;
