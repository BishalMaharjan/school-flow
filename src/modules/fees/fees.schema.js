const { z } = require("zod");

const numToDecimalString = (value) => String(value);

const decimalField = z.union([z.number(), z.string()]).transform(numToDecimalString);

const createFeeSchema = z
  .object({
    name: z.string().trim().min(1),
    amount: decimalField,
    class_id: z.coerce.number().int().positive(),
    frequency: z.enum(["MONTHLY", "TERMLY", "YEARLY"]),
  })
  .strict();

const updateFeeSchema = createFeeSchema.partial().strict();

module.exports = {
  createFeeSchema,
  updateFeeSchema,
};
