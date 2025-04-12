"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ErrorResponseSchema, loginSchema } from "@/src/schemas";

type ActionStateType = {
  errors: string[];
};

/**
 * Autentica un usuario y maneja el proceso de login.
 * @param prevState - Estado previo del formulario (manejado por useFormState).
 * @param formData - Datos del formulario (email y password).
 * @returns {ActionStateType} - Estado con errores (si los hay).
 */

// ! : Promise<ActionStateType>
//! HACE que tome el state en LoginForm.tsx defrente
export async function authenticate(
  prevState: ActionStateType,
  formData: FormData
): Promise<ActionStateType> {
  //* 1 - Extrae credenciales del formulario
  const loginCredentials = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  //* 2 - Validar estructura con Zod
  const auth = loginSchema.safeParse(loginCredentials);

  //* 3 - Si la validación falla, retorna errores
  if (!auth.success) {
    return {
      errors: auth.error.errors.map((issue) => issue.message),
    };
  }

  //* 4 - Enviar credenciales al API
  const url = `${process.env.API_URL}/auth/login`;
  const req = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: auth.data.email,
      password: auth.data.password,
    }),
  });

  const reqData = await req.json();

  //* 5 - Si el API retorna error, parsear y mostrar
  if (!req.ok) {
    const error = ErrorResponseSchema.parse(reqData);
    return {
      errors: [error.error],
    };
  }

  //* 6 - Guardar token en cookies (HttpOnly para seguridad)
  cookies().set({
    name: "CASHTRACKR_TOKEN",
    value: reqData, // Asume que reqData es el token (ajustar si es un objeto)
    httpOnly: true, // true=> solo el servidor esta permitido & Previene acceso desde JS (XSS)
    path: "/", // Accesible en todas las rutas
    // secure: "licencia SSL" &  IMPORTANTE: Habilitar en producción (HTTPS)
  });

  //usuario authenticado lo lleva =>
  redirect("/admin");

  // return {
  //   errors: [],
  // };
}
