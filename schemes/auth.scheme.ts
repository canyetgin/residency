import { z } from "zod";

const email = z
  .string()
  .trim()
  .toLowerCase()
  .pipe(z.email("Geçerli bir e-posta adresi girin."));

const password = z
  .string({ error: "Şifre gerekli" })
  .min(8, { error: "Şifre en az 8 karakter olmalı" })
  .max(128, { error: "Şifre en fazla 128 karakter olabilir" })
  .regex(/[A-Za-z]/, { error: "Şifre en az bir harf içermeli" })
  .regex(/\d/, { error: "Şifre en az bir rakam içermeli" });

export const signInSchema = z.object({
  email,
  password: z.string().min(1, { error: "Şifre gerekli" }),
});

export const signUpSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, { error: "Ad en az 2 karakter olmalı" })
      .max(80, { error: "Ad en fazla 80 karakter olabilir" }),
    email,
    password,
    confirmPassword: z.string().min(1, { error: "Şifreyi tekrar girin" }),
  })
  .refine((v) => v.password === v.confirmPassword, {
    path: ["confirmPassword"],
    error: "Şifreler eşleşmiyor",
  });

export const forgotPasswordSchema = z.object({ email });

export const resetPasswordSchema = z
  .object({
    password,
    confirmPassword: z.string().min(1, { error: "Şifreyi tekrar girin" }),
  })
  .refine((v) => v.password === v.confirmPassword, {
    path: ["confirmPassword"],
    error: "Şifreler eşleşmiyor",
  });

export type signInValues = z.infer<typeof signInSchema>;
export type signUpValues = z.infer<typeof signUpSchema>;
export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;
