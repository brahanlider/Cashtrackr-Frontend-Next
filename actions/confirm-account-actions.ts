"use server";

import { ErrorResponseSchema, SuccessSchema, TokenSchema } from "@/src/schemas";

type ActionStateType = {
  errors: string[];
  success: string;
};

/**
 * Acción para confirmar una cuenta con un token
 * @param token - Token de confirmación (6 dígitos)
 * @param prevState - Estado previo del formulario
 * @returns Estado con errores o éxito
 */

export async function confirmAccount(
  token: string,
  prevState: ActionStateType
) {
  const confirmToken = TokenSchema.safeParse(token);

  if (!confirmToken.success) {
    return {
      errors: confirmToken.error.issues.map((issue) => issue.message),
      success: "",
    };
  }

  // URL de la API externa para confirmar cuenta
  const url = `${process.env.API_URL}/auth/confirm-account`;
  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: confirmToken.data,
    }),
  });

  const reqData = await req.json();

  // Si hay error en la petición, retorna el mensaje de error
  if (!req.ok) {
    const { error } = ErrorResponseSchema.parse(reqData);
    return {
      errors: [error],
      success: "",
    };
  }

  // Si todo sale bien, retorna mensaje de éxito
  const success = SuccessSchema.parse(reqData);

  console.log(prevState + "__________________________________");
  return {
    errors: [],
    success: success,
  };
}
