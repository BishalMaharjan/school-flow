const { z } = require("zod");

const numToDecimalString = (value) => String(value);

const decimalField = z.union([z.number(), z.string()]).transform(numToDecimalString);

const createResultSchema = z
  .object({
    exam_id: z.coerce.number().int().positive(),
    student_id: z.coerce.number().int().positive(),
    marks_obtained: decimalField.optional().nullable(),
    max_marks: decimalField,
    grade: z.string().trim().min(1).optional().nullable(),
  })
  .strict();

const updateResultSchema = createResultSchema.partial().strict();

module.exports = {
  createResultSchema,
  updateResultSchema,
};
