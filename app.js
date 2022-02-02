require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const setupRoutes = require('./src/routes'); // recupère les routes definies dans routes/index.js

app.use(
  cors({
    origin: '*',
  })
);

app.use(express.json());

setupRoutes(app);

module.exports = app;
