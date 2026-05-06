const AppError = require("../shared/errors/app-error");
const { verifyAccessToken } = require("../shared/utils/jwt");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(new AppError("Missing Authorization header", 401));
  }

  const [scheme, token] = authHeader.split(" ");
  if (scheme !== "Bearer" || !token) {
    return next(new AppError("Invalid authorization format. Use Bearer <token>", 401));
  }

  try {
    const payload = verifyAccessToken(token);
    req.user = {
      id: Number(payload.sub),
      schoolId: payload.schoolId == null ? null : Number(payload.schoolId),
      role: payload.role,
      token,
    };
    return next();
  } catch {
    return next(new AppError("Invalid or expired token", 401));
  }
};

module.exports = authMiddleware;
