const express = require("express");
const morgan = require("morgan");
const fs = require("fs");

const app = express();

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

// Middlewares

// body parser
app.use(express.json());

// setup the logger
app.use(morgan("combined", { stream: accessLogStream }));

// Routes

module.exports = app;
