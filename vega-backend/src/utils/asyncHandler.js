const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
      console.log("Async Error:", {
        stack: err.stack,
        method: req.method,
        message: err.message,
        route: req.originalUrl,
        timestamp: new Date().toISOString(),
      });
      next(err);
    });
  };
};

module.exports = asyncHandler;