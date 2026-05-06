const AppError = require("../../shared/errors/app-error");
const bcrypt = require("bcryptjs");
const { getPrisma } = require("../../shared/utils/db");

const list = ({ schoolId, skip, take }) => {
  const prisma = getPrisma();
  return prisma.teacher.findMany({
    where: { school_id: schoolId },
    orderBy: { id: "asc" },
    skip,
    take,
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          status: true,
        },
      },
    },
  });
};

const findFirst = ({ schoolId, id }) => {
  const prisma = getPrisma();
  return prisma.teacher.findFirst({
    where: { id, school_id: schoolId },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          status: true,
        },
      },
    },
  });
};

const assertOwned = async ({ schoolId, id }) => {
  const row = await findFirst({ schoolId, id });
  if (!row) {
    throw new AppError("Teacher not found", 404);
  }
  return row;
};

const createWithUser = async ({ schoolId, name, email, phone, password }) => {
  const prisma = getPrisma();
  const passwordHash = await bcrypt.hash(password, 12);

  try {
    return prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          school_id: schoolId,
          name,
          email,
          password: passwordHash,
          role: "TEACHER",
        },
      });

      return tx.teacher.create({
        data: {
          school_id: schoolId,
          user_id: user.id,
          name,
          email,
          phone,
        },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              name: true,
              role: true,
              status: true,
            },
          },
        },
      });
    });
  } catch (error) {
    const code = error && error.code;
    if (code === "P2002") {
      throw new AppError("Email already in use", 409);
    }
    throw error;
  }
};

const updateTeacher = ({ id, teacherData, userData }) => {
  const prisma = getPrisma();
  return prisma.$transaction(async (tx) => {
    if (userData && Object.keys(userData).length > 0) {
      const teacherRow = await tx.teacher.findUnique({
        where: { id },
        select: { user_id: true },
      });
      await tx.user.update({
        where: { id: teacherRow.user_id },
        data: userData,
      });
    }

    return tx.teacher.update({
      where: { id },
      data: teacherData,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
            status: true,
          },
        },
      },
    });
  });
};

const removeTeacher = ({ id }) => {
  const prisma = getPrisma();
  return prisma.teacher.delete({
    where: { id },
  });
};

module.exports = {
  list,
  findFirst,
  assertOwned,
  createWithUser,
  updateTeacher,
  removeTeacher,
};
