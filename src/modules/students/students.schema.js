const { z } = require("zod");

const createStudentSchema = z
  .object({
    admission_no: z.string().trim().min(1),
    first_name: z.string().trim().min(1),
    last_name: z.string().trim().min(1),
    dob: z.coerce.date(),
    class_id: z.coerce.number().int().positive(),
    section_id: z.coerce.number().int().positive(),
    guardian_id: z.coerce.number().int().positive(),
    email: z.string().trim().email(),
    password: z.string().min(8),
  })
  .strict();

const updateStudentSchema = z
  .object({
    admission_no: z.string().trim().min(1).optional(),
    first_name: z.string().trim().min(1).optional(),
    last_name: z.string().trim().min(1).optional(),
    dob: z.coerce.date().optional(),
    class_id: z.coerce.number().int().positive().optional(),
    section_id: z.coerce.number().int().positive().optional(),
    guardian_id: z.coerce.number().int().positive().optional(),
  })
  .strict();

module.exports = {
  createStudentSchema,
  updateStudentSchema,
};
