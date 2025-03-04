require('dotenv').config();
const router = require('./routes/routes');
const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.use('/blogapi/v1', router);

module.exports = app;
