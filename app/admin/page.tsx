import BudgetMenu from "@/components/budgets/BudgetMenu";
import getToken from "@/src/auth/token";
import { BudgetsAPIResponseSchema } from "@/src/schemas";
import { formatCurrency, formatDate } from "@/src/utils";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metaData: Metadata = {
  title: "Cashtrackr - Panel de administración",
  description: "Cashtrackr - Panel de administración",
};

async function getAllBudgets() {
  const token = getToken();
  // Consultar información del usuario al backend
  const url = `${process.env.API_URL}/budgets`;
  const req = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`, // Envía token en el header
    },
    // para validateTag
    // next: {
    //   tags: ["all-budgets"],
    // },
  });

  const reqData = await req.json();
  const budgets = BudgetsAPIResponseSchema.parse(reqData);
  return budgets;
}

export default async function AdminPage() {
  const budgets = await getAllBudgets();
  return (
    <>
      <div className=" flex flex-col-reverse md:flex-row md:justify-between items-center">
        <div className="w-full md:w-auto">
          <h1 className="font-black sm:text-5xl text-4xl text-secondary">
            Mis Presupuestos
          </h1>
          <p className="text-xl font-bold ">
            maneja y administra tus{" "}
            <span className="text-tertiary">presupuesto</span>
          </p>
        </div>
        <Link
          href={"/admin/budgets/new"}
          className="bg-tertiary-claro p-2 rounded-lg text-white font-bold w-full md:w-auto text-center"
        >
          Crear Presupuesto
        </Link>
      </div>

      {budgets.length ? (
        <ul
          role="list"
          className="divide-y divide-gray-300 border shadow-lg mt-10"
        >
          {budgets.map((budget) => (
            <li key={budget.id} className="flex justify-between gap-x-6 p-5">
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto space-y-2">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    <Link
                      href={`/admin/budgets/${budget.id}`}
                      className="cursor-pointer hover:underline text-2xl font-bold"
                    >
                      {budget.name}
                    </Link>
                  </p>
                  <p className="text-xl font-bold text-amber-500">
                    {formatCurrency(+budget.amount)}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Última actualización: {""}
                    <span className="font-bold">
                      {formatDate(budget.updatedAt)}
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-x-6">
                <BudgetMenu budgetId={budget.id} />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <>
          <p>
            No hay presupuesto aun.....
            <Link
              href={"/admin/budgets/new"}
              className="text-secondary fontbol"
            >
              Comienza Creando uno
            </Link>
          </p>
        </>
      )}
    </>
  );
}
