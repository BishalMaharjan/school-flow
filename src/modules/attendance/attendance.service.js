const AppError = require("../../shared/errors/app-error");
const { listPagination, parseId } = require("../../shared/utils/http");
const classesRepository = require("../classes/classes.repository");
const studentsRepository = require("../students/students.repository");
const attendanceRepository = require("./attendance.repository");

const assertStudentAndClass = async (schoolId, studentId, classId) => {
  const student = await studentsRepository.assertOwned({ schoolId, id: studentId });
  await classesRepository.assertOwned({ schoolId, id: classId });
  if (Number(student.class_id) !== Number(classId)) {
    throw new AppError("Student is not enrolled in the selected class", 400);
  }
};

const list = async (schoolId, query) => {
  const { skip, take } = listPagination(query);
  return attendanceRepository.list({ schoolId, skip, take });
};

const getById = async (schoolId, id) => {
  return attendanceRepository.assertOwned({ schoolId, id: parseId(id) });
};

const create = async (schoolId, body, markerUserId) => {
  await assertStudentAndClass(schoolId, body.student_id, body.class_id);
  return attendanceRepository.create({
    school_id: schoolId,
    student_id: body.student_id,
    class_id: body.class_id,
    date: body.date,
    status: body.status,
    marked_by: markerUserId,
  });
};

const update = async (schoolId, id, body) => {
  const row = await attendanceRepository.assertOwned({ schoolId, id: parseId(id) });

  const studentId = body.student_id ?? row.student_id;
  const classId = body.class_id ?? row.class_id;
  if (body.student_id != null || body.class_id != null) {
    await assertStudentAndClass(schoolId, studentId, classId);
  }

  const data = {
    ...(body.student_id != null ? { student_id: body.student_id } : {}),
    ...(body.class_id != null ? { class_id: body.class_id } : {}),
    ...(body.date != null ? { date: body.date } : {}),
    ...(body.status != null ? { status: body.status } : {}),
  };

  if (Object.keys(data).length === 0) {
    throw new AppError("No fields to update", 400);
  }

  return attendanceRepository.update({
    id: row.id,
    data,
  });
};

const remove = async (schoolId, id) => {
  const row = await attendanceRepository.assertOwned({ schoolId, id: parseId(id) });
  return attendanceRepository.remove({ id: row.id });
};

module.exports = {
  list,
  getById,
  create,
  update,
  remove,
};
