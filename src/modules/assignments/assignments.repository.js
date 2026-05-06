const AppError = require("../../shared/errors/app-error");
const { getPrisma } = require("../../shared/utils/db");

const scopedWhere = (schoolId) => ({
  class: { school_id: schoolId },
  subject: { school_id: schoolId },
});

const list = ({ schoolId, skip, take }) => {
  const prisma = getPrisma();
  return prisma.classSubject.findMany({
    where: scopedWhere(schoolId),
    orderBy: { id: "asc" },
    skip,
    take,
    include: {
      class: true,
      subject: true,
    },
  });
};

const findFirstScoped = ({ schoolId, id }) => {
  const prisma = getPrisma();
  return prisma.classSubject.findFirst({
    where: { id, ...scopedWhere(schoolId) },
    include: {
      class: true,
      subject: true,
    },
  });
};

const findByPair = ({ schoolId, classId, subjectId }) => {
  const prisma = getPrisma();
  return prisma.classSubject.findFirst({
    where: {
      class_id: classId,
      subject_id: subjectId,
      ...scopedWhere(schoolId),
    },
  });
};

const create = (data) => {
  const prisma = getPrisma();
  return prisma.classSubject.create({
    data,
    include: {
      class: true,
      subject: true,
    },
  });
};

const update = ({ id, data }) => {
  const prisma = getPrisma();
  return prisma.classSubject.update({
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
  return prisma.classSubject.delete({
    where: { id },
  });
};

const assertOwned = async ({ schoolId, id }) => {
  const row = await findFirstScoped({ schoolId, id });
  if (!row) {
    throw new AppError("Assignment not found", 404);
  }
  return row;
};

module.exports = {
  list,
  findFirstScoped,
  findByPair,
  create,
  update,
  remove,
  assertOwned,
};
