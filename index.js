const express = require("express");

const app = express();

// Middlewares
app.use(express.json());

// Routes

module.exports = app;
