const AppError = require("../../shared/errors/app-error");
const { getPrisma } = require("../../shared/utils/db");

const list = ({ schoolId, skip, take }) => {
  const prisma = getPrisma();
  return prisma.section.findMany({
    where: { school_id: schoolId },
    orderBy: { id: "asc" },
    skip,
    take,
    include: { class: true },
  });
};

const findFirst = ({ schoolId, id }) => {
  const prisma = getPrisma();
  return prisma.section.findFirst({
    where: { id, school_id: schoolId },
    include: { class: true },
  });
};

const create = (data) => {
  const prisma = getPrisma();
  return prisma.section.create({
    data,
    include: { class: true },
  });
};

const update = ({ id, data }) => {
  const prisma = getPrisma();
  return prisma.section.update({
    where: { id },
    data,
    include: { class: true },
  });
};

const remove = ({ id }) => {
  const prisma = getPrisma();
  return prisma.section.delete({
    where: { id },
  });
};

const assertOwned = async ({ schoolId, id }) => {
  const row = await findFirst({ schoolId, id });
  if (!row) {
    throw new AppError("Section not found", 404);
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
