const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./routes/index");
const errorHandler = require("./middleware/error.middleware");
const ApiError = require("./utils/apiError");

const path = require("path");

const app = express();

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "../public/uploads")));

// API Routes
app.use("/api/v1", routes);

// 404 handler
app.use((req, res, next) => {
  next(new ApiError(404, "Route not found"));
});

// Global Error Handler
app.use(errorHandler);

module.exports = app;
