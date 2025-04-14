"use server";

import {
  CreateBudgetSchema,
  SuccessSchema,
} from "@/src/schemas";
import { cookies } from "next/headers";

type ActionStateType = {
  errors: string[];
  success: string;
};

export async function createBudget(
  prevState: ActionStateType,
  formData: FormData
): Promise<ActionStateType> {
  //validate zod with data of formData
  const createBudgetForm = CreateBudgetSchema.safeParse({
    name: formData.get("name"),
    amount: formData.get("amount"),
  });

  if (!createBudgetForm.success) {
    return {
      errors: createBudgetForm.error.issues.map((issue) => issue.message),
      success: "",
    };
  }

  // extraer el token de la Cookies
  const token = cookies().get("CASHTRACKR_TOKEN")?.value;

  // extraer la api
  const url = `${process.env.API_URl}/budgets`;
  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: createBudgetForm.data.name,
      amount: createBudgetForm.data.amount,
    }),
  });

  const reqData = await req.json();

  // // Validamos errores desde la api
  // if (!req.ok) {
  //   const errors = ErrorResponseSchema.parse(reqData);
  //   return {
  //     errors: [errors.error],
  //     success: "",
  //   };
  // }

  const success = SuccessSchema.parse(reqData);

  return {
    errors: [],
    success: success,
  };
}
