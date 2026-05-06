const express = require("express");
const moduleRoutes = require("./modules");
const { notFoundHandler, errorHandler } = require("./middlewares/error.middleware");
const AppError = require("./shared/errors/app-error");

const DB_HEALTH_TIMEOUT_MS = Number(process.env.DB_HEALTH_TIMEOUT_MS || "8000");

const withTimeout = (promise, ms, label) => {
  let timeoutId;
  const timeoutPromise = new Promise((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error(`${label} timed out after ${ms}ms`));
    }, ms);
  });
  return Promise.race([promise, timeoutPromise]).finally(() => clearTimeout(timeoutId));
};

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "SchoolFlow API is healthy",
    timestamp: new Date().toISOString(),
  });
});

app.get("/health/db", async (req, res, next) => {
  try {
    const prisma = require("./config/database");
    const started = Date.now();
    await withTimeout(
      prisma.$queryRaw`SELECT 1 AS ok`,
      DB_HEALTH_TIMEOUT_MS,
      "Database health check"
    );
    const ms = Date.now() - started;
    res.status(200).json({
      success: true,
      message: "Database connection OK",
      latencyMs: ms,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    if (String(err.message || "").includes("timed out")) {
      return next(
        new AppError(
          `Database did not respond within ${DB_HEALTH_TIMEOUT_MS}ms. ` +
            "Check that Postgres is running, DATABASE_URL is correct (encode @ in passwords as %40), " +
            "and consider adding connect_timeout to the URL (e.g. ?connect_timeout=5).",
          504,
          { code: "DB_HEALTH_TIMEOUT" }
        )
      );
    }
    return next(err);
  }
});

app.use("/api/v1", moduleRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
