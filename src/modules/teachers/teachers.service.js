const AppError = require("../../shared/errors/app-error");
const { listPagination, parseId } = require("../../shared/utils/http");
const teachersRepository = require("./teachers.repository");

const list = async (schoolId, query) => {
  const { skip, take } = listPagination(query);
  return teachersRepository.list({ schoolId, skip, take });
};

const getById = async (schoolId, id) => {
  return teachersRepository.assertOwned({ schoolId, id: parseId(id) });
};

const create = async (schoolId, body) => {
  return teachersRepository.createWithUser({
    schoolId,
    name: body.name,
    email: body.email,
    phone: body.phone,
    password: body.password,
  });
};

const update = async (schoolId, id, body) => {
  const row = await teachersRepository.assertOwned({ schoolId, id: parseId(id) });

  const teacherData = {
    ...(body.name != null ? { name: body.name } : {}),
    ...(body.email != null ? { email: body.email } : {}),
    ...(body.phone != null ? { phone: body.phone } : {}),
  };

  const userData = {
    ...(body.name != null ? { name: body.name } : {}),
    ...(body.email != null ? { email: body.email } : {}),
  };

  if (Object.keys(teacherData).length === 0) {
    throw new AppError("No fields to update", 400);
  }

  try {
    return await teachersRepository.updateTeacher({
      id: row.id,
      teacherData,
      userData,
    });
  } catch (error) {
    const code = error && error.code;
    if (code === "P2002") {
      throw new AppError("Email already in use", 409);
    }
    throw error;
  }
};

const remove = async (schoolId, id) => {
  const row = await teachersRepository.assertOwned({ schoolId, id: parseId(id) });
  return teachersRepository.removeTeacher({ id: row.id });
};

module.exports = {
  list,
  getById,
  create,
  update,
  remove,
};
