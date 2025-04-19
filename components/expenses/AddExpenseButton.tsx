"use client";

import { useRouter } from "next/navigation";

export default function AddExpenseButton() {
  const router = useRouter();
  // console.log(location.pathname); // * /admin/budgets/13
  return (
    <button
      type="button"
      className="bg-tertiary px-10 py-2 rounded-lg text-white font-bold cursor-pointer"
      onClick={() =>
        router.push(location.pathname + "?addExpense=true&showModal=true")
      } //* url => SIN / CON  location.pathname
    >
      Agregar Gasto
    </button>
  );
}
