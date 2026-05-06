const bcrypt = require("bcryptjs");
const AppError = require("../../shared/errors/app-error");
const { signAccessToken } = require("../../shared/utils/jwt");
const authRepository = require("./auth.repository");

const login = async ({ email, password }) => {
  const user = await authRepository.findUserByEmail(email);
  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const passwordOk = await bcrypt.compare(password, user.password);
  if (!passwordOk) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = signAccessToken({
    sub: user.id,
    schoolId: user.school_id,
    role: user.role,
  });

  return {
    user: {
      id: user.id,
      schoolId: user.school_id,
      role: user.role,
      name: user.name,
      email: user.email,
    },
    token,
  };
};

const registerSchool = async (payload) => {
  const school = await authRepository.createSchoolWithAdmin(payload);
  const admin = school.users.find((u) => u.role === "SCHOOL_ADMIN");
  if (!admin) {
    throw new AppError("School was created but admin user was not found", 500);
  }

  const token = signAccessToken({
    sub: admin.id,
    schoolId: admin.school_id,
    role: admin.role,
  });

  return {
    school: {
      id: school.id,
      name: school.name,
      slug: school.slug,
      email: school.email,
      status: school.status,
    },
    admin: {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    },
    token,
  };
};

const forgotPassword = async (email) => {
  return {
    message: `Password reset flow not implemented yet for ${email}`,
  };
};

const resetPassword = async ({ token }) => {
  return {
    message: `Password reset flow not implemented yet for token ${token}`,
  };
};

module.exports = {
  login,
  registerSchool,
  forgotPassword,
  resetPassword,
};
