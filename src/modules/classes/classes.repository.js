const AppError = require("../../shared/errors/app-error");
const { getPrisma } = require("../../shared/utils/db");

const list = ({ schoolId, skip, take }) => {
  const prisma = getPrisma();
  return prisma.class.findMany({
    where: { school_id: schoolId },
    orderBy: { id: "asc" },
    skip,
    take,
  });
};

const findFirst = ({ schoolId, id }) => {
  const prisma = getPrisma();
  return prisma.class.findFirst({
    where: { id, school_id: schoolId },
  });
};

const create = (data) => {
  const prisma = getPrisma();
  return prisma.class.create({ data });
};

const update = ({ id, data }) => {
  const prisma = getPrisma();
  return prisma.class.update({
    where: { id },
    data,
  });
};

const remove = ({ id }) => {
  const prisma = getPrisma();
  return prisma.class.delete({
    where: { id },
  });
};

const assertOwned = async ({ schoolId, id }) => {
  const row = await findFirst({ schoolId, id });
  if (!row) {
    throw new AppError("Class not found", 404);
  }
  return row;
};

module.exports = {
  list,
  findFirst,
  create,
  update,
  remove,
  assertOwned,
};
