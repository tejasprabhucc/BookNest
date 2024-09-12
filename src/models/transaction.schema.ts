import { z } from "zod";

const bigintValidation = z
  .any()
  .refine((val) => typeof val === "bigint" || typeof val === "number", {
    message: "Value must be a bigint or number.",
  })
  .transform((val) => BigInt(val));

export const TransactionBaseSchema = z.object({
  memberId: bigintValidation,
  bookId: bigintValidation,
});

export const TransactionSchema = TransactionBaseSchema.extend({
  id: z
    .number({ message: "ID should be a number" })
    .int({ message: "ID cannot be a decimal number." }),
  bookStatus: z.enum(["pending", "rejected", "issued", "returned"]),
  dateOfIssue: z.string().nullable(),
});

export type ITransactionBase = z.input<typeof TransactionBaseSchema>;
export type ITransaction = z.input<typeof TransactionSchema>;
