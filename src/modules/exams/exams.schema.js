const { z } = require("zod");

const createExamSchema = z
  .object({
    class_id: z.coerce.number().int().positive(),
    subject_id: z.coerce.number().int().positive(),
    title: z.string().trim().min(1),
    term: z.string().trim().min(1).optional().nullable(),
    exam_date: z.coerce.date().optional().nullable(),
  })
  .strict();

const updateExamSchema = createExamSchema.partial().strict();

module.exports = {
  createExamSchema,
  updateExamSchema,
};
