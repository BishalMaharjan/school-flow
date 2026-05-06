const { z } = require("zod");

const createClassSchema = z
  .object({
    name: z.string().trim().min(1, "Name is required"),
  })
  .strict();

const updateClassSchema = createClassSchema.partial().strict();

module.exports = {
  createClassSchema,
  updateClassSchema,
};
