import { z } from "zod";

export const signUPSchema = z.object({
  email: z.string().email(),
  fullName: z.string().min(2),
  password: z.string().min(3),
  confirmPassword: z.string().min(3),

});

export const signINSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
});