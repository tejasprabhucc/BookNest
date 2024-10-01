import { z } from "zod";

export const MemberBaseSchema = z.object({
  name: z
    .string({ message: "Name must be a string." })
    .min(3, { message: "Name must be at least 3 characters long." }),
  age: z
    .number({ message: "Age must be a number." })
    .int()
    .max(100, { message: "Member cannot live that long." })
    .nullable(),
  email: z
    .string({ message: "Email must be a string." })
    .email({ message: "Invalid email address." }),
  password: z
    .string({ message: "Password must be a string." })
    .min(8, { message: "Password must be at least 8 characters long." }),
  role: z.enum(["user", "admin"]),
  phone: z
    .string()
    .min(10, { message: "Phone number should have atleast 10 digits" })
    .optional()
    .nullable(),
  address: z
    .string({ message: "Address must be a string." })
    .optional()
    .nullable(),
  image: z.string().optional().nullable(),
  walletBalance: z
    .number({ message: "Wallet amount must be a number." })
    .int()
    .optional()
    .nullable(),
});

export const MemberSchema = MemberBaseSchema.extend({
  id: z.number().int().min(1),
});

export type IMemberBase = z.infer<typeof MemberBaseSchema>;
export type IMember = z.infer<typeof MemberSchema>;

export const MemberTokensBase = z.object({
  memberId: z.number().int().min(1),
});

export const MemberTokens = MemberTokensBase.extend({
  id: z.number().int().min(1),
});
