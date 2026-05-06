const { z } = require("zod");

const promptSchema = z
  .object({
    prompt: z.string().trim().min(1, "Prompt is required"),
  })
  .strict();

module.exports = {
  promptSchema,
};
