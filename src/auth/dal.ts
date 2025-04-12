// Data Access Layer => //* ( DAL ) Capa de acceso a datos
import "server-only"; //* => módulo solo se ejecute en el servidor

import { cache } from "react"; // asegura memorizar resultados y evitar llamadas redundantes

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { UserSchema } from "../schemas";

/**
 * Verifica la sesión del usuario actual
 * @returns {Promise<{user: User, isAuth: boolean}>} Objeto con datos del usuario y estado de autenticación
 * @throws Redirige a /auth/login si no hay token o la sesión es inválida
 */

export const verifySession = cache(async () => {
  //* 1. Obtener token de las cookies
  const token = cookies().get("CASHTRACKR_TOKEN")?.value;
  if (!token) {
    redirect("/auth/login"); // Redirige si no hay token
  }

  //* 2. Consultar información del usuario al backend
  const url = `${process.env.API_URL}/auth/user`;
  const req = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`, // Envía token en el header
    },
  });

  const session = await req.json();
  //* 3. Validar respuesta del servidor
  const result = UserSchema.safeParse(session);

  if (!result.success) {
    redirect("/auth/login"); // Redirige si los datos son inválidos
  }

  //* 4. Retornar datos validados
  return {
    user: result.data, // Datos del usuario validados
    isAuth: true, // Flag de autenticación
  };
});