import { PassThrough } from "stream";
import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email({ message: "Email is not valid" }),
  Password: z
    .string()
    .min(6, { message: "Password should be at least 6 character long" })
    .max(17, { message: "Password must not be more than 17 character" }),
});

export const signUpSchema = z.object({
  name: z.string(),
  email: z.string().email({ message: "Email is not valid" }),
});
