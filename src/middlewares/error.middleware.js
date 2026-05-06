const AppError = require("../shared/errors/app-error");

const notFoundHandler = (req, res, next) => {
  next(new AppError(`Route not found: ${req.method} ${req.originalUrl}`, 404));
};

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    error: {
      message,
      ...(err.meta ? { meta: err.meta } : {}),
      ...(process.env.NODE_ENV !== "production" ? { stack: err.stack } : {}),
    },
  });
};

module.exports = {
  notFoundHandler,
  errorHandler,
};
