const AppError = require("../../shared/errors/app-error");
const { listPagination, parseId } = require("../../shared/utils/http");
const classesRepository = require("../classes/classes.repository");
const feesRepository = require("./fees.repository");

const list = async (schoolId, query) => {
  const { skip, take } = listPagination(query);
  return feesRepository.list({ schoolId, skip, take });
};

const getById = async (schoolId, id) => {
  return feesRepository.assertOwned({ schoolId, id: parseId(id) });
};

const create = async (schoolId, body) => {
  await classesRepository.assertOwned({ schoolId, id: body.class_id });
  return feesRepository.create({
    school_id: schoolId,
    name: body.name,
    amount: body.amount,
    class_id: body.class_id,
    frequency: body.frequency,
  });
};

const update = async (schoolId, id, body) => {
  const row = await feesRepository.assertOwned({ schoolId, id: parseId(id) });

  if (body.class_id != null) {
    await classesRepository.assertOwned({ schoolId, id: body.class_id });
  }

  const data = {
    ...(body.name != null ? { name: body.name } : {}),
    ...(body.amount != null ? { amount: body.amount } : {}),
    ...(body.class_id != null ? { class_id: body.class_id } : {}),
    ...(body.frequency != null ? { frequency: body.frequency } : {}),
  };

  if (Object.keys(data).length === 0) {
    throw new AppError("No fields to update", 400);
  }

  return feesRepository.update({
    id: row.id,
    data,
  });
};

const remove = async (schoolId, id) => {
  const row = await feesRepository.assertOwned({ schoolId, id: parseId(id) });
  try {
    return await feesRepository.remove({ id: row.id });
  } catch (error) {
    const code = error && error.code;
    if (code === "P2003" || code === "P2014") {
      throw new AppError("Cannot delete fee because invoices reference it", 409);
    }
    throw error;
  }
};

module.exports = {
  list,
  getById,
  create,
  update,
  remove,
};
