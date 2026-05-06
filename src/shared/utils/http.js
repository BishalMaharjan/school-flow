const AppError = require("../errors/app-error");

const parseId = (value, label = "id") => {
  const n = Number(value);
  if (!Number.isInteger(n) || n < 1) {
    throw new AppError(`Invalid ${label}`, 400);
  }
  return n;
};

const listPagination = (query) => {
  const page = Math.max(1, Number(query.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(query.limit) || 50));
  return { skip: (page - 1) * limit, take: limit };
};

module.exports = { parseId, listPagination };
