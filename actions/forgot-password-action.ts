"use server";

import {
  ErrorResponseSchema,
  ForgotPasswordSchema,
  SuccessSchema,
} from "@/src/schemas";

type ActionStateType = {
  errors: string[];
  success: string;
};

export async function forgotPassword(
  prevState: ActionStateType,
  formData: FormData
): Promise<ActionStateType> {
  const forgotPasswordForm = {
    email: formData.get("email"),
  };

  const forgotData = ForgotPasswordSchema.safeParse(forgotPasswordForm);
  if (!forgotData.success) {
    return {
      errors: forgotData.error.errors.map((err) => err.message),
      success: "",
    };
  }

  const url = `${process.env.API_URL}/auth/forgot-password`;
  const req = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: forgotData.data.email,
    }),
  });

  const reqData = await req.json();

  //* 5 - Si el API retorna error, parsear y mostrar
  if (!req.ok) {
    const error = ErrorResponseSchema.parse(reqData);
    return {
      errors: [error.error],
      success: "",
    };
  }

  const success = SuccessSchema.parse(reqData);

  return {
    errors: [],
    success: success,
  };
}
