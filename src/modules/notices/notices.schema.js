const { z } = require("zod");

const createNoticeSchema = z
  .object({
    title: z.string().trim().min(1),
    body: z.string().trim().min(1),
    published_at: z.coerce.date().optional(),
  })
  .strict();

const updateNoticeSchema = createNoticeSchema.partial().strict();

module.exports = {
  createNoticeSchema,
  updateNoticeSchema,
};
