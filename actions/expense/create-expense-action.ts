"use server";

import getToken from "@/src/auth/token";
import {
  CreateExpenseSchema,
  ErrorResponseSchema,
  SuccessSchema,
} from "@/src/schemas";

type ActionStateType = {
  errors: string[];
  success: string;
};

export default async function createExpense(
  budgetId: number,
  prevState: ActionStateType,
  formData: FormData
): Promise<ActionStateType> {
  const createExpenseData = CreateExpenseSchema.safeParse({
    name: formData.get("name"),
    amount: formData.get("amount"),
  });

  if (!createExpenseData.success) {
    return {
      errors: createExpenseData.error.issues.map((issue) => issue.message),
      success: "",
    };
  }

  const token = getToken();
  const url = `${process.env.API_URL}/budgets/${budgetId}/expenses`;
  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: createExpenseData.data.name,
      amount: createExpenseData.data.amount,
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

  const success = SuccessSchema.parse(reqData);

  return {
    errors: [],
    success: success,
  };
}
