const { z } = require("zod");

const createAssignmentSchema = z
  .object({
    class_id: z.coerce.number().int().positive(),
    subject_id: z.coerce.number().int().positive(),
  })
  .strict();

const updateAssignmentSchema = createAssignmentSchema.partial().strict();

module.exports = {
  createAssignmentSchema,
  updateAssignmentSchema,
};
