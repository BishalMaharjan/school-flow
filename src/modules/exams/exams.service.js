const AppError = require("../../shared/errors/app-error");
const { listPagination, parseId } = require("../../shared/utils/http");
const classesRepository = require("../classes/classes.repository");
const subjectsRepository = require("../subjects/subjects.repository");
const examsRepository = require("./exams.repository");

const assertClassSubject = async (schoolId, classId, subjectId) => {
  await classesRepository.assertOwned({ schoolId, id: classId });
  await subjectsRepository.assertOwned({ schoolId, id: subjectId });
};

const list = async (schoolId, query) => {
  const { skip, take } = listPagination(query);
  return examsRepository.list({ schoolId, skip, take });
};

const getById = async (schoolId, id) => {
  return examsRepository.assertOwned({ schoolId, id: parseId(id) });
};

const create = async (schoolId, body) => {
  await assertClassSubject(schoolId, body.class_id, body.subject_id);
  return examsRepository.create({
    school_id: schoolId,
    class_id: body.class_id,
    subject_id: body.subject_id,
    title: body.title,
    term: body.term ?? null,
    exam_date: body.exam_date ?? null,
  });
};

const update = async (schoolId, id, body) => {
  const row = await examsRepository.assertOwned({ schoolId, id: parseId(id) });

  const classId = body.class_id ?? row.class_id;
  const subjectId = body.subject_id ?? row.subject_id;
  if (body.class_id != null || body.subject_id != null) {
    await assertClassSubject(schoolId, classId, subjectId);
  }

  const data = {
    ...(body.class_id != null ? { class_id: body.class_id } : {}),
    ...(body.subject_id != null ? { subject_id: body.subject_id } : {}),
    ...(body.title != null ? { title: body.title } : {}),
    ...(body.term !== undefined ? { term: body.term } : {}),
    ...(body.exam_date !== undefined ? { exam_date: body.exam_date } : {}),
  };

  if (Object.keys(data).length === 0) {
    throw new AppError("No fields to update", 400);
  }

  return examsRepository.update({
    id: row.id,
    data,
  });
};

const remove = async (schoolId, id) => {
  const row = await examsRepository.assertOwned({ schoolId, id: parseId(id) });
  try {
    return await examsRepository.remove({ id: row.id });
  } catch (error) {
    const code = error && error.code;
    if (code === "P2003" || code === "P2014") {
      throw new AppError("Cannot delete exam because related results exist", 409);
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
