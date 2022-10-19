const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const doctorRoutes = require("./routes/doctor-routes");
const ErrorHandler = require("./controllers/error-controllers");
const ErrorObject = require("./utils/error");
const { PORT } = process.env;

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
app.use("/api/v1/doctors", doctorRoutes);

app.all("*", (req, res, next) => {
  const err = new ErrorObject(
    `http://localhost:${PORT}${req.url} not found`,
    404
  );
  next(err);
});

// Error Handling
app.use(ErrorHandler);

module.exports = app;
