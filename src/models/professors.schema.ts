import { z } from "zod";

export const professorSchema = z.object({
  id: z.number().optional(),
  name: z
    .string()
    .min(1, "Name is required")
    .max(35, "Name cannot exceed 35 characters"),
  email: z
    .string()
    .email("Invalid email format")
    .max(255, "Email cannot exceed 255 characters"),
  department: z
    .string()
    .min(1, "Department is required")
    .max(255, "Department cannot exceed 255 characters"),
  shortBio: z
    .string()
    .max(255, "Short bio cannot exceed 255 characters")
    .optional(),
  calendlyLink: z
    .string()
    .url("Invalid Calendly URL")
    .max(255, "Calendly link cannot exceed 255 characters"),
});
