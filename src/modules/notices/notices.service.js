const AppError = require("../../shared/errors/app-error");
const { listPagination, parseId } = require("../../shared/utils/http");
const noticesRepository = require("./notices.repository");

const list = async (schoolId, query) => {
  const { skip, take } = listPagination(query);
  return noticesRepository.list({ schoolId, skip, take });
};

const getById = async (schoolId, id) => {
  return noticesRepository.assertOwned({ schoolId, id: parseId(id) });
};

const create = async (schoolId, body) => {
  return noticesRepository.create({
    school_id: schoolId,
    title: body.title,
    body: body.body,
    ...(body.published_at != null ? { published_at: body.published_at } : {}),
  });
};

const update = async (schoolId, id, body) => {
  const row = await noticesRepository.assertOwned({ schoolId, id: parseId(id) });

  const data = {
    ...(body.title != null ? { title: body.title } : {}),
    ...(body.body != null ? { body: body.body } : {}),
    ...(body.published_at != null ? { published_at: body.published_at } : {}),
  };

  if (Object.keys(data).length === 0) {
    throw new AppError("No fields to update", 400);
  }

  return noticesRepository.update({
    id: row.id,
    data,
  });
};

const remove = async (schoolId, id) => {
  const row = await noticesRepository.assertOwned({ schoolId, id: parseId(id) });
  return noticesRepository.remove({ id: row.id });
};

module.exports = {
  list,
  getById,
  create,
  update,
  remove,
};
