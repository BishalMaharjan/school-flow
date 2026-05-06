const AppError = require("../../shared/errors/app-error");
const { listPagination, parseId } = require("../../shared/utils/http");
const classesRepository = require("../classes/classes.repository");
const sectionsRepository = require("./sections.repository");

const assertClassInSchool = async (schoolId, classId) => {
  const cls = await classesRepository.findFirst({ schoolId, id: classId });
  if (!cls) {
    throw new AppError("Class not found for this school", 400);
  }
  return cls;
};

const list = async (schoolId, query) => {
  const { skip, take } = listPagination(query);
  return sectionsRepository.list({ schoolId, skip, take });
};

const getById = async (schoolId, id) => {
  return sectionsRepository.assertOwned({ schoolId, id: parseId(id) });
};

const create = async (schoolId, body) => {
  await assertClassInSchool(schoolId, body.class_id);
  return sectionsRepository.create({
    school_id: schoolId,
    class_id: body.class_id,
    name: body.name,
  });
};

const update = async (schoolId, id, body) => {
  const row = await sectionsRepository.assertOwned({ schoolId, id: parseId(id) });

  let nextClassId = row.class_id;
  if (body.class_id != null) {
    await assertClassInSchool(schoolId, body.class_id);
    nextClassId = body.class_id;
  }

  const data = {
    ...(body.class_id != null ? { class_id: nextClassId } : {}),
    ...(body.name != null ? { name: body.name } : {}),
  };
  if (Object.keys(data).length === 0) {
    throw new AppError("No fields to update", 400);
  }
  return sectionsRepository.update({
    id: row.id,
    data,
  });
};

const remove = async (schoolId, id) => {
  const row = await sectionsRepository.assertOwned({ schoolId, id: parseId(id) });
  return sectionsRepository.remove({ id: row.id });
};

module.exports = {
  list,
  getById,
  create,
  update,
  remove,
};
