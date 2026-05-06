const AppError = require("../../shared/errors/app-error");
const { listPagination, parseId } = require("../../shared/utils/http");
const classesRepository = require("../classes/classes.repository");
const sectionsRepository = require("../sections/sections.repository");
const { getPrisma } = require("../../shared/utils/db");
const studentsRepository = require("./students.repository");

const assertGuardian = async (schoolId, guardianId) => {
  const prisma = getPrisma();
  const guardian = await prisma.user.findFirst({
    where: {
      id: guardianId,
      school_id: schoolId,
    },
  });
  if (!guardian) {
    throw new AppError("Guardian user not found for this school", 400);
  }
  return guardian;
};

const assertClassSection = async (schoolId, classId, sectionId) => {
  await classesRepository.assertOwned({ schoolId, id: classId });
  const section = await sectionsRepository.findFirst({ schoolId, id: sectionId });
  if (!section) {
    throw new AppError("Section not found for this school", 400);
  }
  if (Number(section.class_id) !== Number(classId)) {
    throw new AppError("Section does not belong to the selected class", 400);
  }
};

const list = async (schoolId, query) => {
  const { skip, take } = listPagination(query);
  return studentsRepository.list({ schoolId, skip, take });
};

const getById = async (schoolId, id) => {
  return studentsRepository.assertOwned({ schoolId, id: parseId(id) });
};

const create = async (schoolId, body) => {
  await assertClassSection(schoolId, body.class_id, body.section_id);
  await assertGuardian(schoolId, body.guardian_id);

  try {
    return await studentsRepository.createWithUser({
      school_id: schoolId,
      admission_no: body.admission_no,
      first_name: body.first_name,
      last_name: body.last_name,
      dob: body.dob,
      class_id: body.class_id,
      section_id: body.section_id,
      guardian_id: body.guardian_id,
      email: body.email,
      password: body.password,
    });
  } catch (error) {
    const code = error && error.code;
    if (code === "P2002") {
      throw new AppError("Admission number or email already exists", 409);
    }
    throw error;
  }
};

const update = async (schoolId, id, body) => {
  const row = await studentsRepository.assertOwned({ schoolId, id: parseId(id) });

  const classId = body.class_id ?? row.class_id;
  const sectionId = body.section_id ?? row.section_id;
  if (body.class_id != null || body.section_id != null) {
    await assertClassSection(schoolId, classId, sectionId);
  }

  if (body.guardian_id != null) {
    await assertGuardian(schoolId, body.guardian_id);
  }

  const data = {
    ...(body.admission_no != null ? { admission_no: body.admission_no } : {}),
    ...(body.first_name != null ? { first_name: body.first_name } : {}),
    ...(body.last_name != null ? { last_name: body.last_name } : {}),
    ...(body.dob != null ? { dob: body.dob } : {}),
    ...(body.class_id != null ? { class_id: body.class_id } : {}),
    ...(body.section_id != null ? { section_id: body.section_id } : {}),
    ...(body.guardian_id != null ? { guardian_id: body.guardian_id } : {}),
  };

  if (Object.keys(data).length === 0) {
    throw new AppError("No fields to update", 400);
  }

  try {
    return await studentsRepository.update({
      id: row.id,
      data,
    });
  } catch (error) {
    const code = error && error.code;
    if (code === "P2002") {
      throw new AppError("Admission number already exists", 409);
    }
    throw error;
  }
};

const remove = async (schoolId, id) => {
  const row = await studentsRepository.assertOwned({ schoolId, id: parseId(id) });
  try {
    return await studentsRepository.remove({ id: row.id });
  } catch (error) {
    const code = error && error.code;
    if (code === "P2003" || code === "P2014") {
      throw new AppError("Cannot delete student because related records exist", 409);
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
