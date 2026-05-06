const AppError = require("../../shared/errors/app-error");
const { getPrisma } = require("../../shared/utils/db");

const list = ({ schoolId, skip, take }) => {
  const prisma = getPrisma();
  return prisma.exam.findMany({
    where: { school_id: schoolId },
    orderBy: { id: "desc" },
    skip,
    take,
    include: {
      class: true,
      subject: true,
    },
  });
};

const findFirst = ({ schoolId, id }) => {
  const prisma = getPrisma();
  return prisma.exam.findFirst({
    where: { id, school_id: schoolId },
    include: {
      class: true,
      subject: true,
    },
  });
};

const create = (data) => {
  const prisma = getPrisma();
  return prisma.exam.create({
    data,
    include: {
      class: true,
      subject: true,
    },
  });
};

const update = ({ id, data }) => {
  const prisma = getPrisma();
  return prisma.exam.update({
    where: { id },
    data,
    include: {
      class: true,
      subject: true,
    },
  });
};

const remove = ({ id }) => {
  const prisma = getPrisma();
  return prisma.exam.delete({
    where: { id },
  });
};

const assertOwned = async ({ schoolId, id }) => {
  const row = await findFirst({ schoolId, id });
  if (!row) {
    throw new AppError("Exam not found", 404);
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
