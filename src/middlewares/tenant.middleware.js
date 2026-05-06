const AppError = require("../shared/errors/app-error");

const tenantMiddleware = (req, res, next) => {
  const tenantIdFromHeader = req.headers["x-school-id"];
  const tenantId = tenantIdFromHeader || req.user?.schoolId;

  if (!tenantId) {
    return next(new AppError("Tenant context not found", 400));
  }

  req.tenant = { schoolId: Number(tenantId) };
  return next();
};

module.exports = tenantMiddleware;
