const dotenv = require("dotenv");

dotenv.config();

const nodeEnv = process.env.NODE_ENV || "development";

const requiredEnv = ["DATABASE_URL"];
const missingEnv = requiredEnv.filter((envKey) => !process.env[envKey]);

if (missingEnv.length > 0) {
  throw new Error(`Missing required environment variables: ${missingEnv.join(", ")}`);
}

const jwtSecret =
  process.env.JWT_SECRET ||
  (nodeEnv === "development" ? "dev-only-jwt-secret-change-me" : "");

if (!jwtSecret) {
  throw new Error("JWT_SECRET is required outside development");
}

if (nodeEnv === "development" && !process.env.JWT_SECRET) {
  // eslint-disable-next-line no-console
  console.warn("[env] JWT_SECRET not set; using insecure development default");
}

module.exports = {
  nodeEnv,
  port: Number(process.env.PORT || 3000),
  jwtSecret,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  databaseUrl: process.env.DATABASE_URL,
};
