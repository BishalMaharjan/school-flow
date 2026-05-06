const AppError = require("../../shared/errors/app-error");
const { listPagination, parseId } = require("../../shared/utils/http");
const classesRepository = require("../classes/classes.repository");
const subjectsRepository = require("../subjects/subjects.repository");
const assignmentsRepository = require("./assignments.repository");

const assertClassSubject = async (schoolId, classId, subjectId) => {
  await classesRepository.assertOwned({ schoolId, id: classId });
  await subjectsRepository.assertOwned({ schoolId, id: subjectId });
};

const list = async (schoolId, query) => {
  const { skip, take } = listPagination(query);
  return assignmentsRepository.list({ schoolId, skip, take });
};

const getById = async (schoolId, id) => {
  return assignmentsRepository.assertOwned({ schoolId, id: parseId(id) });
};

const create = async (schoolId, body) => {
  await assertClassSubject(schoolId, body.class_id, body.subject_id);
  const existing = await assignmentsRepository.findByPair({
    schoolId,
    classId: body.class_id,
    subjectId: body.subject_id,
  });
  if (existing) {
    throw new AppError("This subject is already assigned to the class", 409);
  }
  return assignmentsRepository.create({
    class_id: body.class_id,
    subject_id: body.subject_id,
  });
};

const update = async (schoolId, id, body) => {
  const row = await assignmentsRepository.assertOwned({ schoolId, id: parseId(id) });

  const nextClassId = body.class_id;
  const nextSubjectId = body.subject_id;
  if (nextClassId == null && nextSubjectId == null) {
    throw new AppError("No fields to update", 400);
  }
  const classId = nextClassId ?? row.class_id;
  const subjectId = nextSubjectId ?? row.subject_id;

  await assertClassSubject(schoolId, classId, subjectId);

  const duplicate = await assignmentsRepository.findByPair({
    schoolId,
    classId,
    subjectId,
  });
  if (duplicate && duplicate.id !== row.id) {
    throw new AppError("This subject is already assigned to the class", 409);
  }

  return assignmentsRepository.update({
    id: row.id,
    data: {
      ...(nextClassId != null ? { class_id: nextClassId } : {}),
      ...(nextSubjectId != null ? { subject_id: nextSubjectId } : {}),
    },
  });
};

const remove = async (schoolId, id) => {
  const row = await assignmentsRepository.assertOwned({ schoolId, id: parseId(id) });
  return assignmentsRepository.remove({ id: row.id });
};

module.exports = {
  list,
  getById,
  create,
  update,
  remove,
};
