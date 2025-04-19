"use server";

import getToken from "@/src/auth/token";
import {
  Budget,
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

export default async function deleteExpense(
  { budgetId, expenseId }: BudgetAndExpenseIdType,
  prevState: ActionStateType
) {
  const token = getToken();
  const url = `${process.env.API_URL}/budgets/${budgetId}/expenses/${expenseId}`;
  const req = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
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
  revalidatePath(`/adming/budgets/${budgetId}`);
  console.log(prevState) //ELIMINAR eslint

  return {
    errors: [],
    success: success,
  };
}
