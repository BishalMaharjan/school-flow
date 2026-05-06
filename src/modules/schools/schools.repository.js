const { getPrisma } = require("../../shared/utils/db");

const findById = (id) => {
  const prisma = getPrisma();
  return prisma.school.findUnique({
    where: { id },
  });
};

const updateById = (id, data) => {
  const prisma = getPrisma();
  return prisma.school.update({
    where: { id },
    data,
  });
};

module.exports = {
  findById,
  updateById,
};
