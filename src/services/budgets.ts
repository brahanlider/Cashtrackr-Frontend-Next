import { cache } from "react";
import getToken from "../auth/token";
import { notFound } from "next/navigation";
import { BudgetAPIResponseSchema } from "../schemas";

export const getBudgetById = cache(async (budgetId: string) => {
  const token = getToken();
  const url = `${process.env.API_URL}/budgets/${budgetId}`;
  const req = await fetch(url, {
    method: "GET", ///primero traemos
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const reqData = await req.json();

  // console.log(reqData)

  if (!req.ok) {
    notFound();
  }

  const budget = BudgetAPIResponseSchema.parse(reqData);
  return budget;
});
