import { z } from "zod";

export const PaymentBaseSchema = z.object({
  memberId: z.number().int().positive({
    message: "Member ID must be a positive integer",
  }),
  transactionId: z.string({
    required_error: "Transaction ID is required",
    invalid_type_error: "Transaction ID must be a string",
  }),
  orderId: z.string({
    required_error: "Order ID is required",
    invalid_type_error: "Order ID must be a string",
  }),
  amount: z.number().positive({
    message: "Amount must be a positive number",
  }),
});

export const PaymentSchema = PaymentBaseSchema.extend({
  id: z.number().int().positive({
    message: "ID must be a positive integer",
  }),
});

// Type inference (optional, if you want the type to be inferred from the schema)
export type IPaymentBase = z.infer<typeof PaymentBaseSchema>;
export type IPayment = z.infer<typeof PaymentSchema>;
