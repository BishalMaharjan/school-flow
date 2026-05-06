const { z } = require("zod");

const updateSchoolSchema = z
  .object({
    name: z.string().trim().min(1).optional(),
    email: z.string().trim().email().optional(),
    phone: z.string().trim().min(1).optional(),
    logo_url: z.union([z.string().url(), z.literal("")]).optional(),
    status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
  })
  .strict();

module.exports = {
  updateSchoolSchema,
};
