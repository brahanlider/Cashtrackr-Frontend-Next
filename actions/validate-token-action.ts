"use server";

import { ErrorResponseSchema, SuccessSchema, TokenSchema } from "@/src/schemas";

type ActionStateType = {
  errors: string[];
  success: string;
};

export async function validateToken(
  token: string,
  prevState: ActionStateType
): Promise<ActionStateType> {
  //1 validamos
  const resetPasswordToken = TokenSchema.safeParse(token);
  if (!resetPasswordToken.success) {
    return {
      errors: resetPasswordToken.error.issues.map((issue) => issue.message),
      success: "",
    };
  }

  const url = `${process.env.API_URL}/auth/validate-token`;
  const req = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token: resetPasswordToken.data,
    }),
  });

  const reqData = await req.json();
  if (!req.ok) {
    const error = ErrorResponseSchema.parse(reqData);
    return {
      errors: [error.error],
      success: "",
    };
  }

  //Validar el json => reqData
  const successs = SuccessSchema.parse(reqData);

  console.log(prevState); //! ELIMINAR

  return {
    errors: [],
    success: successs,
  };
}
