const AppError = require("../shared/errors/app-error");

const allowRoles = (...roles) => {
  return (req, res, next) => {
    const userRole = req.user?.role;
    if (!userRole) {
      return next(new AppError("User role missing in request context", 403));
    }
    if (!roles.includes(userRole)) {
      return next(new AppError("Forbidden: insufficient role", 403));
    }
    return next();
  };
};

module.exports = allowRoles;
