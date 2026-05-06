const { getPrisma } = require("../../shared/utils/db");

const schoolSummaryCounts = async (schoolId) => {
  const prisma = getPrisma();

  const [
    students,
    teachers,
    classes,
    sections,
    subjects,
    attendanceRecords,
    exams,
    invoices,
    notices,
    fees,
  ] = await Promise.all([
    prisma.student.count({ where: { school_id: schoolId } }),
    prisma.teacher.count({ where: { school_id: schoolId } }),
    prisma.class.count({ where: { school_id: schoolId } }),
    prisma.section.count({ where: { school_id: schoolId } }),
    prisma.subject.count({ where: { school_id: schoolId } }),
    prisma.attendance.count({ where: { school_id: schoolId } }),
    prisma.exam.count({ where: { school_id: schoolId } }),
    prisma.invoice.count({ where: { school_id: schoolId } }),
    prisma.notice.count({ where: { school_id: schoolId } }),
    prisma.fee.count({ where: { school_id: schoolId } }),
  ]);

  const invoiceStatusCounts = await prisma.invoice.groupBy({
    by: ["status"],
    where: { school_id: schoolId },
    _count: { _all: true },
  });

  return {
    counts: {
      students,
      teachers,
      classes,
      sections,
      subjects,
      attendance_records: attendanceRecords,
      exams,
      invoices,
      notices,
      fees,
      class_subject_assignments: await prisma.classSubject.count({
        where: {
          class: { school_id: schoolId },
          subject: { school_id: schoolId },
        },
      }),
      results: await prisma.result.count({ where: { school_id: schoolId } }),
    },
    invoice_status_breakdown: invoiceStatusCounts.reduce((acc, row) => {
      acc[row.status] = row._count._all;
      return acc;
    }, {}),
  };
};

module.exports = {
  schoolSummaryCounts,
};
