"use server";

import getToken from "@/src/auth/token";
// Trabajando con REST de NEXT

import {
  Budget,
  CreateExpenseSchema,
  ErrorResponseSchema,
  Expense,
  SuccessSchema,
} from "@/src/schemas";
import { revalidatePath } from "next/cache";

type BudgetAndExpenseIdType = {
  budgetId: Budget["id"];
  expenseId: Expense["id"];
};

type ActionStateType = {
  errors: string[];
  success: string;
};

export default async function editExpense(
  { budgetId, expenseId }: BudgetAndExpenseIdType,
  prevState: ActionStateType,
  formData: FormData
) {
  const editExpenseData = CreateExpenseSchema.safeParse({
    name: formData.get("name"),
    amount: formData.get("amount"),
  });

  if (!editExpenseData.success) {
    return {
      errors: editExpenseData.error.errors.map((issue) => issue.message),
      success: "",
    };
  }

  // Actualizar gasto
  const token = getToken();
  const url = `${process.env.API_URL}/budgets/${budgetId}/expenses/${expenseId}`;
  const req = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: editExpenseData.data.name,
      amount: editExpenseData.data.amount,
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

  revalidatePath(`/admin/budgets/${budgetId}`);

  return {
    errors: [],
    success: success,
  };
}
