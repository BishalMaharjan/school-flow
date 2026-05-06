const { z } = require("zod");

const createSectionSchema = z
  .object({
    class_id: z.coerce.number().int().positive(),
    name: z.string().trim().min(1, "Name is required"),
  })
  .strict();

const updateSectionSchema = createSectionSchema.partial().strict();

module.exports = {
  createSectionSchema,
  updateSectionSchema,
};
