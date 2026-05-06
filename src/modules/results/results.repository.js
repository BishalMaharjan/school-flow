const AppError = require("../../shared/errors/app-error");
const { getPrisma } = require("../../shared/utils/db");

const list = ({ schoolId, skip, take }) => {
  const prisma = getPrisma();
  return prisma.result.findMany({
    where: { school_id: schoolId },
    orderBy: { id: "desc" },
    skip,
    take,
    include: {
      exam: true,
      student: true,
    },
  });
};

const findFirst = ({ schoolId, id }) => {
  const prisma = getPrisma();
  return prisma.result.findFirst({
    where: { id, school_id: schoolId },
    include: {
      exam: true,
      student: true,
    },
  });
};

const create = (data) => {
  const prisma = getPrisma();
  return prisma.result.create({
    data,
    include: {
      exam: true,
      student: true,
    },
  });
};

const upsert = ({ create, update }) => {
  const prisma = getPrisma();
  return prisma.result.upsert({
    where: {
      exam_id_student_id: {
        exam_id: create.exam_id,
        student_id: create.student_id,
      },
    },
    create,
    update,
    include: {
      exam: true,
      student: true,
    },
  });
};

const update = ({ id, data }) => {
  const prisma = getPrisma();
  return prisma.result.update({
    where: { id },
    data,
    include: {
      exam: true,
      student: true,
    },
  });
};

const remove = ({ id }) => {
  const prisma = getPrisma();
  return prisma.result.delete({
    where: { id },
  });
};

const assertOwned = async ({ schoolId, id }) => {
  const row = await findFirst({ schoolId, id });
  if (!row) {
    throw new AppError("Result not found", 404);
  }
  return row;
};

module.exports = {
  list,
  findFirst,
  create,
  upsert,
  update,
  remove,
  assertOwned,
};
