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

export const PasswordValidationSchema = z
  .string()
  .min(1, { message: "Password no válido" });

//* Schema de -api/budgets/13- => expenses": []
export const ExpenseAPIResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  amount: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  budgetId: z.number(),
});

// Schema para un solo presupuesto
export const BudgetAPIResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  amount: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  userId: z.number(),
  //Schema de -api/budgets/13- => expenses": []
  expenses: z.array(ExpenseAPIResponseSchema),
});

export type Budget = z.infer<typeof BudgetAPIResponseSchema>;

// Schema para la respuesta completa
export const BudgetsAPIResponseSchema = z.array(
  BudgetAPIResponseSchema.omit({ expenses: true })
);

//* VALIDACIONES =
export const SuccessSchema = z.string();
// Controller => Error 409 de createAccount
export const ErrorResponseSchema = z.object({
  error: z.string(),
});

//* Expense:
//Draft Expense schema ===> NOSE PORQUE
export const CreateExpenseSchema = z.object({
  name: z
    .string()
    .min(1, { message: "El Nombre del presupuesto es obligatorio" }),

  amount: z.coerce.number().min(1, {
    message: "Cantidad no válida",
  }),
});

export type Expense = z.infer<typeof ExpenseAPIResponseSchema>;
export type DraftExpense = z.infer<typeof CreateExpenseSchema>;

export const UpdatePasswordSchema = z
  .object({
    current_password: z
      .string()
      .min(1, { message: "El Password no puede ir vacio" }),
    password: z.string().min(8, {
      message: "El Nuevo Password debe ser de al menos 8 caracteres",
    }),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Los Passwords no son iguales",
    path: ["password_confirmation"],
  });

export const UpdateUserSchema = z.object({
  name: z.string().min(1, { message: "El Nombre es incorrecto" }),
  email: z
    .string()
    .min(1, { message: "El Email es obligatorio" })
    .email({ message: "E-mail no válido" }),
});
