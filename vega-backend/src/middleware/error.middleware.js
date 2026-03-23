const ApiError = require("../utils/apiError");
const multer = require("multer");
const { NODE_ENV } = require("../config/env.config");

const errorHandler = (err, req, res, next) => {
  let { statusCode = 500, message = "Internal Server Error" } = err;

  // Handle Multer errors separately
  if (err instanceof multer.MulterError) {
    statusCode = 400;
    if (err.code === "LIMIT_FILE_SIZE") {
      message = "File too large (Max limit: 5MB)";
    } else {
      message = `Upload error: ${err.message}`;
    }
  } else if (!(err instanceof ApiError)) {
    statusCode = err.statusCode || 500;
  }

  const response = {
    success: false,
    statusCode,
    message,
    ...(NODE_ENV === "development" ? { stack: err.stack } : {}),
  };

  res.status(statusCode).json(response);
};

module.exports = errorHandler;
