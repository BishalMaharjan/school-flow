const AppError = require("../../shared/errors/app-error");
const bcrypt = require("bcryptjs");
const { getPrisma } = require("../../shared/utils/db");

const list = ({ schoolId, skip, take }) => {
  const prisma = getPrisma();
  return prisma.student.findMany({
    where: { school_id: schoolId },
    orderBy: { id: "asc" },
    skip,
    take,
    include: {
      class: true,
      section: true,
      guardian: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          status: true,
        },
      },
    },
  });
};

const findFirst = ({ schoolId, id }) => {
  const prisma = getPrisma();
  return prisma.student.findFirst({
    where: { id, school_id: schoolId },
    include: {
      class: true,
      section: true,
      guardian: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          status: true,
        },
      },
    },
  });
};

const createWithUser = async (data) => {
  const prisma = getPrisma();
  const passwordHash = await bcrypt.hash(data.password, 12);

  try {
    return await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          school_id: data.school_id,
          name: `${data.first_name} ${data.last_name}`.trim(),
          email: data.email,
          password: passwordHash,
          role: "STUDENT",
        },
      });

      return tx.student.create({
        data: {
          school_id: data.school_id,
          user_id: user.id,
          admission_no: data.admission_no,
          first_name: data.first_name,
          last_name: data.last_name,
          dob: data.dob,
          class_id: data.class_id,
          section_id: data.section_id,
          guardian_id: data.guardian_id,
        },
        include: {
          class: true,
          section: true,
          guardian: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
            },
          },
          user: {
            select: {
              id: true,
              name: true,
              email: true,
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
      throw new AppError("Admission number or email already exists", 409);
    }
    throw error;
  }
};

const update = ({ id, data }) => {
  const prisma = getPrisma();
  return prisma.student.update({
    where: { id },
    data,
    include: {
      class: true,
      section: true,
      guardian: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          status: true,
        },
      },
    },
  });
};

const remove = async ({ id }) => {
  const prisma = getPrisma();
  return prisma.$transaction(async (tx) => {
    const row = await tx.student.findUnique({
      where: { id },
      select: { user_id: true },
    });

    const deletedStudent = await tx.student.delete({
      where: { id },
    });

    if (row?.user_id) {
      await tx.user.delete({
        where: { id: row.user_id },
      });
    }

    return deletedStudent;
  });
};

const assertOwned = async ({ schoolId, id }) => {
  const row = await findFirst({ schoolId, id });
  if (!row) {
    throw new AppError("Student not found", 404);
  }
  return row;
};

module.exports = {
  list,
  findFirst,
  createWithUser,
  update,
  remove,
  assertOwned,
};
