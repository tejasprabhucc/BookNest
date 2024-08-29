import { z } from "zod";

export const MemberBaseSchema = z.object({
  name: z
    .string({ message: "Name must be a string." })
    .min(3, { message: "Name must be at least 3 characters long." }),
  age: z
    .number({ message: "Age must be a number." })
    .int()
    .min(5, { message: "Member must be at least 5 years old." })
    .max(100, { message: "Member cannot live that long." }),
  email: z
    .string({ message: "Email must be a string." })
    .email({ message: "Invalid email address." }),
  password: z
    .string({ message: "Password must be a string." })
    .min(8, { message: "Password must be at least 8 characters long." }),
  role: z.enum(["user", "admin"]).optional(),
  refreshToken: z.string().optional(),
});

export const MemberSchema = MemberBaseSchema.extend({
  id: z.number().int().min(1),
});

export type IMemberBase = z.infer<typeof MemberBaseSchema>;
export type IMember = z.infer<typeof MemberSchema>;

export const MemberTokensBase = z.object({
  memberId: z.number().int().min(1),
  refreshToken: z.string(),
});

export const MemberTokens = MemberTokensBase.extend({
  id: z.number().int().min(1),
});
