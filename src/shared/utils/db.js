const AppError = require("../errors/app-error");

const getPrisma = () => {
  try {
    return require("../../config/database");
  } catch (error) {
    throw new AppError("Prisma client is not ready. Run: npx prisma generate", 500, {
      details: error.message,
    });
  }
};

module.exports = { getPrisma };
