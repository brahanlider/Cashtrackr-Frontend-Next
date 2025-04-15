"use server";

import getToken from "@/src/auth/token";
import {
  CreateBudgetSchema,
  ErrorResponseSchema,
  SuccessSchema,
} from "@/src/schemas";
import { revalidatePath } from "next/cache";

type ActionStateType = {
  errors: string[];
  success: string;
};

export async function editBudget(
  budgetId: number,
  prevState: ActionStateType,
  formData: FormData
) {
  const editBudgetForm = CreateBudgetSchema.safeParse({
    name: formData.get("name"),
    amount: formData.get("amount"),
  });

  if (!editBudgetForm.success) {
    return {
      errors: editBudgetForm.error.issues.map((issue) => issue.message),
      success: "",
    };
  }

  const token = getToken();
  const url = `${process.env.API_URL}/budgets/${budgetId}`;
  const req = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: editBudgetForm.data.name,
      amount: editBudgetForm.data.amount,
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

  revalidatePath("/admin"); // Router - invalida y regenera una ruta específica (URL) en el caché de Next.js.
  // revalidateTag("all-budgets"); //Solo peticiones - invalida específicamente los datos asociados a un tag de caché particular.
  const success = SuccessSchema.parse(reqData);

  return {
    errors: [],
    success: success,
  };
}
