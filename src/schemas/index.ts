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

//token
export const TokenSchema = z
  .string({ message: "Token no válido" })
  .length(6, { message: "Token no válido" });

//login
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "El Email es obligatorio" })
    .email({ message: "E-mail no válido" }),
  password: z.string().min(1, { message: "El password no puede ir vacio" }),
});

//user
export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
});

// user componente client
export type User = z.infer<typeof UserSchema>;

export const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: "El Email es obligatorio" })
    .email({ message: "Email no válido" }),
});

export const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "El password es muy corto, mínimo 8 caracteres" }),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Las contraseñas no coinciden",
    path: ["password_confirmation"],
  });

//Draft budget schema ===> NOSE PORQUE
export const CreateBudgetSchema = z.object({
  name: z
    .string()
    .min(1, { message: "El Nombre del presupuesto es obligatorio" }),
  amount: z.coerce.number({ message: "Cantidad no válida" }).min(1, {
    message: "Cantidad no válida",
  }),
});



//*VALIDACIONES =
export const SuccessSchema = z.string();
// Controller => Error 409 de createAccount
export const ErrorResponseSchema = z.object({
  error: z.string(),
});
