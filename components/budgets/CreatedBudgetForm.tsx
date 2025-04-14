"use client";

import { createBudget } from "@/actions/budget/create-budget-action";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";

export default function CreatedBudgetForm() {
  const router = useRouter();

  const [state, dispatch] = useFormState(createBudget, {
    errors: [],
    success: "",
  });

  useEffect(() => {
    if (state.errors) {
      state.errors.forEach((issue) => {
        toast.error(issue);
      });
    }

    if (state.success) {
      toast.success(state.success, {
        onClose: () => {
          router.push("/admin");
        },
        onClick: () => {
          router.push("/admin");
        },
      });
    }
  }, [state, router]);


  return (
    <>
      <form action={dispatch} noValidate className="space-y-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="font-bold text-2xl">
            Nombre del Presupuesto:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Presupuesto, ejemplo: ahorros del mes, etc."
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-secondary"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="amount" className="font-bold text-2xl">
            Monto del presupuesto
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            placeholder="Dinero, ejemplo: 5000."
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-secondary"
          />
        </div>

        <button
          type="submit"
          className="bg-secondary w-full text-white font-bold py-2 px-4 rounded-md"
        >
          Crear
        </button>
      </form>
    </>
  );
}
