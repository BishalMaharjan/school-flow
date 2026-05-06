const AppError = require("../../shared/errors/app-error");
const { listPagination, parseId } = require("../../shared/utils/http");
const examsRepository = require("../exams/exams.repository");
const studentsRepository = require("../students/students.repository");
const resultsRepository = require("./results.repository");

const assertExamStudent = async (schoolId, examId, studentId) => {
  const exam = await examsRepository.assertOwned({ schoolId, id: examId });
  const student = await studentsRepository.assertOwned({ schoolId, id: studentId });
  if (Number(student.class_id) !== Number(exam.class_id)) {
    throw new AppError("Student is not in the class for this exam", 400);
  }
};

const list = async (schoolId, query) => {
  const { skip, take } = listPagination(query);
  return resultsRepository.list({ schoolId, skip, take });
};

const getById = async (schoolId, id) => {
  return resultsRepository.assertOwned({ schoolId, id: parseId(id) });
};

const create = async (schoolId, body) => {
  await assertExamStudent(schoolId, body.exam_id, body.student_id);

  const createData = {
    school_id: schoolId,
    exam_id: body.exam_id,
    student_id: body.student_id,
    marks_obtained: body.marks_obtained ?? null,
    max_marks: body.max_marks,
    grade: body.grade ?? null,
  };

  const updateData = {
    marks_obtained: body.marks_obtained ?? null,
    max_marks: body.max_marks,
    grade: body.grade ?? null,
  };

  return resultsRepository.upsert({
    create: createData,
    update: updateData,
  });
};

const update = async (schoolId, id, body) => {
  const row = await resultsRepository.assertOwned({ schoolId, id: parseId(id) });

  const examId = body.exam_id ?? row.exam_id;
  const studentId = body.student_id ?? row.student_id;
  if (body.exam_id != null || body.student_id != null) {
    await assertExamStudent(schoolId, examId, studentId);
  }

  const data = {
    ...(body.exam_id != null ? { exam_id: body.exam_id } : {}),
    ...(body.student_id != null ? { student_id: body.student_id } : {}),
    ...(body.marks_obtained !== undefined ? { marks_obtained: body.marks_obtained } : {}),
    ...(body.max_marks != null ? { max_marks: body.max_marks } : {}),
    ...(body.grade !== undefined ? { grade: body.grade } : {}),
  };

  if (Object.keys(data).length === 0) {
    throw new AppError("No fields to update", 400);
  }

  try {
    return await resultsRepository.update({
      id: row.id,
      data,
    });
  } catch (error) {
    const code = error && error.code;
    if (code === "P2002") {
      throw new AppError("A result already exists for this exam and student", 409);
    }
    throw error;
  }
};

const remove = async (schoolId, id) => {
  const row = await resultsRepository.assertOwned({ schoolId, id: parseId(id) });
  return resultsRepository.remove({ id: row.id });
};

module.exports = {
  list,
  getById,
  create,
  update,
  remove,
};
