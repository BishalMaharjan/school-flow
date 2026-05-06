const AppError = require("../../shared/errors/app-error");
const { listPagination, parseId } = require("../../shared/utils/http");
const subjectsRepository = require("./subjects.repository");

const list = async (schoolId, query) => {
  const { skip, take } = listPagination(query);
  return subjectsRepository.list({ schoolId, skip, take });
};

const getById = async (schoolId, id) => {
  return subjectsRepository.assertOwned({ schoolId, id: parseId(id) });
};

const create = async (schoolId, body) => {
  return subjectsRepository.create({
    school_id: schoolId,
    name: body.name,
    code: body.code ?? null,
  });
};

const update = async (schoolId, id, body) => {
  const row = await subjectsRepository.assertOwned({ schoolId, id: parseId(id) });
  const data = {
    ...(body.name != null ? { name: body.name } : {}),
    ...(body.code !== undefined ? { code: body.code } : {}),
  };
  if (Object.keys(data).length === 0) {
    throw new AppError("No fields to update", 400);
  }
  return subjectsRepository.update({
    id: row.id,
    data,
  });
};

const remove = async (schoolId, id) => {
  const row = await subjectsRepository.assertOwned({ schoolId, id: parseId(id) });
  return subjectsRepository.remove({ id: row.id });
};

module.exports = {
  list,
  getById,
  create,
  update,
  remove,
};
