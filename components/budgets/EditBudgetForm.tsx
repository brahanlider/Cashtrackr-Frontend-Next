"use client";

import { useFormState } from "react-dom";
import { Budget } from "@/src/schemas";
import BudgetForm from "./BudgetForm";
import { editBudget } from "@/actions/budget/edit-budget-action";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function EditBudgetForm({ budget }: { budget: Budget }) {
  const router = useRouter();

  const editBudgetWithBudgetId = editBudget.bind(null, budget.id);
  const [state, dispatch] = useFormState(editBudgetWithBudgetId, {
    errors: [],
    success: "",
  });

  useEffect(() => {
    if (state.success) {
      toast.success(state.success);
      router.push("/admin");
    }
  }, [state, router]);
  return (
    <>
      <form action={dispatch} noValidate className="space-y-4">
        {state.errors.map((error) => (
          <p className="bg-red-600" key={error}>
            {error}
          </p>
        ))}

        <BudgetForm budget={budget} />

        <button
          type="submit"
          className="bg-secondary w-full text-white font-bold py-2 px-4 rounded-md"
        >
          Editar
        </button>
      </form>
    </>
  );
}
