const { z } = require("zod");

const createTeacherSchema = z
  .object({
    name: z.string().trim().min(1),
    email: z.string().trim().email(),
    phone: z.string().trim().min(1),
    password: z.string().min(8),
  })
  .strict();

const updateTeacherSchema = z
  .object({
    name: z.string().trim().min(1).optional(),
    email: z.string().trim().email().optional(),
    phone: z.string().trim().min(1).optional(),
  })
  .strict();

module.exports = {
  createTeacherSchema,
  updateTeacherSchema,
};
