const AppError = require("../../shared/errors/app-error");
const { getPrisma } = require("../../shared/utils/db");

const list = ({ schoolId, skip, take }) => {
  const prisma = getPrisma();
  return prisma.invoice.findMany({
    where: { school_id: schoolId },
    orderBy: [{ due_date: "asc" }, { id: "desc" }],
    skip,
    take,
    include: {
      student: true,
      fee: true,
    },
  });
};

const findFirst = ({ schoolId, id }) => {
  const prisma = getPrisma();
  return prisma.invoice.findFirst({
    where: { id, school_id: schoolId },
    include: {
      student: true,
      fee: true,
    },
  });
};

const create = (data) => {
  const prisma = getPrisma();
  return prisma.invoice.create({
    data,
    include: {
      student: true,
      fee: true,
    },
  });
};

const update = ({ id, data }) => {
  const prisma = getPrisma();
  return prisma.invoice.update({
    where: { id },
    data,
    include: {
      student: true,
      fee: true,
    },
  });
};

const remove = ({ id }) => {
  const prisma = getPrisma();
  return prisma.invoice.delete({
    where: { id },
  });
};

const assertOwned = async ({ schoolId, id }) => {
  const row = await findFirst({ schoolId, id });
  if (!row) {
    throw new AppError("Invoice not found", 404);
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
