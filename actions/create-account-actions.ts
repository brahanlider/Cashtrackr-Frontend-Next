"use server";

import {
  ErrorResponseSchema,
  RegisterSchema,
  SuccessSchema,
} from "@/src/schemas";

/**
 * Acción del servidor para procesar el registro de usuarios
 *
 * @param prevState - Estado anterior del formulario (usado por useFormState)
 * @param formData - Datos del formulario enviados desde el cliente
 * @re
 *
 * */

export type ActionStateType = {
  errors?: {
    email?: string[];
    name?: string[];
    password?: string[];
    password_confirmation?: string[];
  };
  success?: string;
};

export async function register(
  prevState: ActionStateType,
  formData: FormData
): Promise<ActionStateType> {
  //1 EXTRACCIÓN DE DATOS DEL FORMULARIO => FormData
  const registerFormData = {
    email: formData.get("email"),
    name: formData.get("name"),
    password: formData.get("password"),
    password_confirmation: formData.get("password_confirmation"),
  };

  // 2 VALIDACIÓN DE DATOS CON ZOD
  const register = RegisterSchema.safeParse(registerFormData);
  if (!register.success) {
    const errors = register.error.flatten().fieldErrors;
    return {
      success: "",
      errors,
    };
  }

  // 3. REGISTRO EN LA API EXTERNA
  const url = `${process.env.API_URL}/auth/create-account`;
  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: register.data.email,
      name: register.data.name,
      password: register.data.password,
    }),
  });

  const reqData = await req.json();

  if (req.status === 409) {
    const error = ErrorResponseSchema.parse(reqData);

    return {
      errors: { email: [error.error] },
      success: "",
    };
  }

  const success = SuccessSchema.parse(reqData);

  return {
    errors: {},
    success: success,
  };
}
