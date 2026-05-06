const { z } = require("zod");

const createAttendanceSchema = z
  .object({
    student_id: z.coerce.number().int().positive(),
    class_id: z.coerce.number().int().positive(),
    date: z.coerce.date(),
    status: z.enum(["PRESENT", "ABSENT", "LATE"]),
  })
  .strict();

const updateAttendanceSchema = createAttendanceSchema.partial().strict();

module.exports = {
  createAttendanceSchema,
  updateAttendanceSchema,
};
