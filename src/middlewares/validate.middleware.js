const AppError = require("../shared/errors/app-error");

const validate = (schema) => {
  return (req, res, next) => {
    if (!schema || typeof schema.safeParse !== "function") {
      return next(new AppError("Invalid validation schema provided", 500));
    }

    const result = schema.safeParse(req.body);
    if (!result.success) {
      return next(
        new AppError("Validation failed", 422, {
          issues: result.error.issues,
        })
      );
    }

    req.body = result.data;
    return next();
  };
};

module.exports = validate;
