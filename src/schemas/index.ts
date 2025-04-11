import { z } from "zod";

export const RegisterSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "El Email es obligatorio" })
      .email({ message: "E-mail no válido" }),
    name: z.string().nonempty({ message: "El nombre no puede ir vacio" }),
    password: z
      .string()
      .min(8, { message: "El password es muy corto, mínimo 8 caracteres" }),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Las contraseñas no coinciden",
    path: ["password_confirmation"],
  });

export const SuccessSchema = z.string();

// Controller => Error 409 de createAccount
export const ErrorResponseSchema = z.object({
  error: z.string(),
});

//token
export const tokenSchema = z
  .string({ message: "Token no válido" })
  .length(6, { message: "Token no válido" });
