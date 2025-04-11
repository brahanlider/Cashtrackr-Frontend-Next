"use server";

import {
  ErrorResponseSchema,
  RegisterSchema,
  SuccessSchema,
} from "@/src/schemas";

export type ActionStateType = {
  errors: string[];
  success: string;
};

export async function register(
  prevState: ActionStateType,
  formData: FormData
): Promise<ActionStateType> {
  //
  const registerFormData = {
    email: formData.get("email"),
    name: formData.get("name"),
    password: formData.get("password"),
    password_confirmation: formData.get("password_confirmation"),
  };

  // revalidate cache - VALIDATE
  const register = RegisterSchema.safeParse(registerFormData);
  if (!register.success) {
    const errors = register.error.errors.map((error) => error.message); //devuelve array con strings,
    return {
      errors,
      success: "",
    };
  }

  // Mutate data
  const url = `${process.env.API_URL}/auth/create-account`;
  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // body: JSON.stringify(userData),
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
