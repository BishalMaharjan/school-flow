const bcrypt = require("bcryptjs");
const { getPrisma } = require("../../shared/utils/db");

const findUserByEmail = async (email) => {
  const prisma = getPrisma();
  return prisma.user.findUnique({ where: { email } });
};

const createSchoolWithAdmin = async ({ schoolName, adminName, email, password }) => {
  const prisma = getPrisma();
  const slug = schoolName.toLowerCase().replace(/\s+/g, "-");
  const passwordHash = await bcrypt.hash(password, 12);

  return prisma.school.create({
    data: {
      name: schoolName,
      slug,
      email,
      phone: "N/A",
      users: {
        create: {
          name: adminName,
          email,
          password: passwordHash,
          role: "SCHOOL_ADMIN",
        },
      },
    },
    include: {
      users: true,
    },
  });
};

module.exports = {
  findUserByEmail,
  createSchoolWithAdmin,
};
