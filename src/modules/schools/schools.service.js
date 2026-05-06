const AppError = require("../../shared/errors/app-error");
const { parseId } = require("../../shared/utils/http");
const schoolsRepository = require("./schools.repository");

const assertSchoolScope = (schoolId, resourceId) => {
  if (Number(resourceId) !== Number(schoolId)) {
    throw new AppError("School not found", 404);
  }
};

const list = async (schoolId) => {
  const school = await schoolsRepository.findById(schoolId);
  if (!school) {
    throw new AppError("School not found", 404);
  }
  return [school];
};

const getById = async (schoolId, id) => {
  assertSchoolScope(schoolId, id);
  const school = await schoolsRepository.findById(parseId(id));
  if (!school) {
    throw new AppError("School not found", 404);
  }
  return school;
};

const update = async (schoolId, id, body) => {
  await getById(schoolId, id);
  const data = {
    ...(body.name != null ? { name: body.name } : {}),
    ...(body.email != null ? { email: body.email } : {}),
    ...(body.phone != null ? { phone: body.phone } : {}),
    ...(body.logo_url !== undefined ? { logo_url: body.logo_url === "" ? null : body.logo_url } : {}),
    ...(body.status != null ? { status: body.status } : {}),
  };

  return schoolsRepository.updateById(parseId(id), data);
};

module.exports = {
  list,
  getById,
  update,
};
