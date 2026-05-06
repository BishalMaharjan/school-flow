const AppError = require("../../shared/errors/app-error");
const { listPagination, parseId } = require("../../shared/utils/http");
const feesRepository = require("../fees/fees.repository");
const studentsRepository = require("../students/students.repository");
const invoicesRepository = require("./invoices.repository");

const assertStudentFeeClass = async (schoolId, studentId, feeId) => {
  const student = await studentsRepository.assertOwned({ schoolId, id: studentId });
  const fee = await feesRepository.assertOwned({ schoolId, id: feeId });
  if (Number(student.class_id) !== Number(fee.class_id)) {
    throw new AppError("Fee does not apply to the student's class", 400);
  }
};

const list = async (schoolId, query) => {
  const { skip, take } = listPagination(query);
  return invoicesRepository.list({ schoolId, skip, take });
};

const getById = async (schoolId, id) => {
  return invoicesRepository.assertOwned({ schoolId, id: parseId(id) });
};

const create = async (schoolId, body) => {
  await assertStudentFeeClass(schoolId, body.student_id, body.fee_id);
  return invoicesRepository.create({
    school_id: schoolId,
    student_id: body.student_id,
    fee_id: body.fee_id,
    amount: body.amount,
    due_date: body.due_date,
    status: body.status,
  });
};

const update = async (schoolId, id, body) => {
  const row = await invoicesRepository.assertOwned({ schoolId, id: parseId(id) });

  const studentId = body.student_id ?? row.student_id;
  const feeId = body.fee_id ?? row.fee_id;
  if (body.student_id != null || body.fee_id != null) {
    await assertStudentFeeClass(schoolId, studentId, feeId);
  }

  const data = {
    ...(body.student_id != null ? { student_id: body.student_id } : {}),
    ...(body.fee_id != null ? { fee_id: body.fee_id } : {}),
    ...(body.amount != null ? { amount: body.amount } : {}),
    ...(body.due_date != null ? { due_date: body.due_date } : {}),
    ...(body.status != null ? { status: body.status } : {}),
  };

  if (Object.keys(data).length === 0) {
    throw new AppError("No fields to update", 400);
  }

  return invoicesRepository.update({
    id: row.id,
    data,
  });
};

const remove = async (schoolId, id) => {
  const row = await invoicesRepository.assertOwned({ schoolId, id: parseId(id) });
  return invoicesRepository.remove({ id: row.id });
};

module.exports = {
  list,
  getById,
  create,
  update,
  remove,
};
