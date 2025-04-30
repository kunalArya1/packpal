import { PassThrough } from "stream";
import { z } from "zod";

/**
 * Shema Validation for sign in
 * where we are expecting email and passord
 */
export const signInSchema = z.object({
  email: z.string().email({ message: "Email is not valid" }),
  Password: z
    .string()
    .min(6, { message: "Password should be at least 6 character long" })
    .max(17, { message: "Password must not be more than 17 character" }),
});

/**
 * Schema Validation for sing up
 */
export const signUpSchema = z.object({
  fullname: z.string(),
  email: z.string().email({ message: "Email is not valid" }),
  Password: z
    .string()
    .min(6, { message: "Password should be at least 6 character long" })
    .max(17, { message: "Password must not be more than 17 character" }),
  Address: z
    .string()
    .max(150, { message: "Address must not exceed 150 character" }),
  CountryCode: z
    .string()
    .length(3, { message: "Conutery code should be 3 character long" }),
  phone: z
    .string()
    .length(10, { message: "Phone number should be 10 character long only" }),
  preferance: z
    .string()
    .length(50, { message: "Preferance should not exceed 50 character" }),
});

/**
 * Schema Validation for forgot password
 */
export const forgotPasswordShema = z.object({
  email: z.string().email({ message: "Email is not valid" }),
});

/**
 * Schema Validation for Reset password
 */
export const resetPasswrodSchema = z.object({
  oldPassword: z
    .string()
    .min(6, { message: "Password should be at least 6 character long" })
    .max(17, { message: "Password must not be more than 17 character" }),
  newPassword: z
    .string()
    .min(6, { message: "Password should be at least 6 character long" })
    .max(17, { message: "Password must not be more than 17 character" }),
  confirmPassword: z
    .string()
    .min(6, { message: "Password should be at least 6 character long" })
    .max(17, { message: "Password must not be more than 17 character" }),
});
