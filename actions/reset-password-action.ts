"use server";

import {
  ErrorResponseSchema,
  ResetPasswordSchema,
  SuccessSchema,
} from "@/src/schemas";

type ActionStateType = {
  errors: string[];
  success: string;
};

export async function resetPassword(
  token: string, //=> para ResetPasswordForm
  prevState: ActionStateType,
  formData: FormData
): Promise<ActionStateType> {
  const resetPasswordInput = {
    password: formData.get("password"),
    password_confirmation: formData.get("password_confirmation"),
  };

  //validate
  const resetPasswordData = ResetPasswordSchema.safeParse(resetPasswordInput);
  if (!resetPasswordData.success) {
    return {
      errors: resetPasswordData.error.issues.map((issue) => issue.message),
      success: "",
    };
  }

  //api
  const url = `${process.env.API_URL}/auth/reset-password/${token}`;
  const req = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      password: resetPasswordData.data.password,
    }),
  });

  // error en api
  const reqData = await req.json();
  if (!req.ok) {
    const errors = ErrorResponseSchema.parse(reqData);
    return {
      errors: [errors.error],
      success: "",
    };
  }

  //traemos el string o nombre del errors de la api
  const success = SuccessSchema.parse(reqData);

  return {
    errors: [],
    success: success,
  };
}
