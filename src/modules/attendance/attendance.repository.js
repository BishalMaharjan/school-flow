const AppError = require("../../shared/errors/app-error");
const { getPrisma } = require("../../shared/utils/db");

const list = ({ schoolId, skip, take }) => {
  const prisma = getPrisma();
  return prisma.attendance.findMany({
    where: { school_id: schoolId },
    orderBy: [{ date: "desc" }, { id: "desc" }],
    skip,
    take,
    include: {
      student: true,
      class: true,
      marker: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
};

const findFirst = ({ schoolId, id }) => {
  const prisma = getPrisma();
  return prisma.attendance.findFirst({
    where: { id, school_id: schoolId },
    include: {
      student: true,
      class: true,
      marker: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
};

const create = (data) => {
  const prisma = getPrisma();
  return prisma.attendance.create({
    data,
    include: {
      student: true,
      class: true,
      marker: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
};

const update = ({ id, data }) => {
  const prisma = getPrisma();
  return prisma.attendance.update({
    where: { id },
    data,
    include: {
      student: true,
      class: true,
      marker: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
};

const remove = ({ id }) => {
  const prisma = getPrisma();
  return prisma.attendance.delete({
    where: { id },
  });
};

const assertOwned = async ({ schoolId, id }) => {
  const row = await findFirst({ schoolId, id });
  if (!row) {
    throw new AppError("Attendance record not found", 404);
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
