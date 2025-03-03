import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Minimum 6 characters"),
  rememberMe: z.boolean().optional(),
});

export const registerSchema = z.object({
  fullName: z.string().min(3, "Name is too short"),
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(6, "Minimum 6 characters")
    .regex(
      /^(?=.*[A-Z])(?=.*[0-9])/,
      "Must contain uppercase letters and numbers"
    ),
  terms: z.boolean().refine((val) => val, "You must accept the terms"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
