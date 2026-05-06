const { z } = require("zod");

const createSubjectSchema = z
  .object({
    name: z.string().trim().min(1, "Name is required"),
    code: z.string().trim().min(1).optional(),
  })
  .strict();

const updateSubjectSchema = createSubjectSchema.partial().strict();

module.exports = {
  createSubjectSchema,
  updateSubjectSchema,
};
