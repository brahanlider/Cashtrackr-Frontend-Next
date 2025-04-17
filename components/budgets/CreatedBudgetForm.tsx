"use client";

import { createBudget } from "@/actions/budget/create-budget-action";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import BudgetForm from "./BudgetForm";

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
      toast.success(state.success);
      // REEMPLAZO
      router.push("/admin");
      //   ,  {
      // onClose: () => {
      //   router.push("/admin");
      // },
      // onClick: () => {
      //   router.push("/admin");
      // },
      // }
      // );
    }
  }, [state, router]);

  return (
    <>
      <form action={dispatch} noValidate className="space-y-4">
        <BudgetForm />

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

