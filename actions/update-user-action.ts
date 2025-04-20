"use server";

import getToken from "@/src/auth/token";
import {
  ErrorResponseSchema,
  SuccessSchema,
  UpdateUserSchema,
} from "@/src/schemas";
import { revalidatePath } from "next/cache";

type ActionStateType = {
  errors: string[];
  success: string;
};

export default async function updateExpense(
  prevState: ActionStateType,
  formData: FormData
) {
  const updateUserData = UpdateUserSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
  });

  if (!updateUserData.success) {
    return {
      errors: updateUserData.error.issues.map((issue) => issue.message),
      success: "",
    };
  }

  const token = getToken();
  const url = `${process.env.API_URL}/auth/update-user`;
  const req = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: updateUserData.data.name,
      email: updateUserData.data.email,
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

  revalidatePath("/admin/profile/settings");
  const success = SuccessSchema.parse(reqData);

  return {
    errors: [],
    success: success,
  };
}
