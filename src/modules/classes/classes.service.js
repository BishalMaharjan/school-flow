const AppError = require("../../shared/errors/app-error");
const { listPagination, parseId } = require("../../shared/utils/http");
const classesRepository = require("./classes.repository");

const list = async (schoolId, query) => {
  const { skip, take } = listPagination(query);
  return classesRepository.list({ schoolId, skip, take });
};

const getById = async (schoolId, id) => {
  return classesRepository.assertOwned({ schoolId, id: parseId(id) });
};

const create = async (schoolId, body) => {
  return classesRepository.create({
    school_id: schoolId,
    name: body.name,
  });
};

const update = async (schoolId, id, body) => {
  const row = await classesRepository.assertOwned({ schoolId, id: parseId(id) });
  if (body == null || Object.keys(body).length === 0) {
    throw new AppError("No fields to update", 400);
  }
  return classesRepository.update({
    id: row.id,
    data: body,
  });
};

const remove = async (schoolId, id) => {
  const row = await classesRepository.assertOwned({ schoolId, id: parseId(id) });
  return classesRepository.remove({ id: row.id });
};

module.exports = {
  list,
  getById,
  create,
  update,
  remove,
};
