const { z } = require("zod");

const numToDecimalString = (value) => String(value);

const decimalField = z.union([z.number(), z.string()]).transform(numToDecimalString);

const createInvoiceSchema = z
  .object({
    student_id: z.coerce.number().int().positive(),
    fee_id: z.coerce.number().int().positive(),
    amount: decimalField,
    due_date: z.coerce.date(),
    status: z.enum(["UNPAID", "PARTIAL", "PAID"]),
  })
  .strict();

const updateInvoiceSchema = createInvoiceSchema.partial().strict();

module.exports = {
  createInvoiceSchema,
  updateInvoiceSchema,
};
