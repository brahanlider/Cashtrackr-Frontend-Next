import { DialogTitle } from "@headlessui/react";
import ExpenseForm from "./ExpenseForm";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { DraftExpense } from "@/src/schemas";
import { useFormState } from "react-dom";
import editExpense from "@/actions/expense/edit-expense-action";
import ErrorMessageForForm from "../ui/ErrorMessageForForm";
import { toast } from "react-toastify";

export default function EditExpenseForm({
  closeModal,
}: {
  closeModal: () => void;
}) {
  const [expense, setExpense] = useState<DraftExpense>();

  const { id: budgetId } = useParams();
  const searchParams = useSearchParams(); // showModal=true&editExpenseId=1
  const expenseId = searchParams.get("editExpenseId")!; // RETORNA el ID  de => editExpenseId  = 1

  const editExpenseWithBudgetId = editExpense.bind(null, {
    budgetId: +budgetId,
    expenseId: +expenseId,
  });
  const [state, dispatch] = useFormState(editExpenseWithBudgetId, {
    errors: [],
    success: "",
  });

  // ! EVITAR EL useEffect porque es lento hacelo con dependecia con react query
  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_URl}/admin/api/budgets/${budgetId}/expenses/${expenseId}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setExpense(data));
  }, [budgetId, expenseId]); // creo que van los 2

  useEffect(() => {
    if (state.success) {
      toast.success(state.success);
      closeModal();
    }
  }, [state, closeModal]); // closemodal creo

  return (
    <>
      <DialogTitle as="h3" className="font-black text-4xl text-purple-950 my-5">
        Editar Gasto
      </DialogTitle>
      <p className="text-xl font-bold">
        Edita los detalles de un {""}
        <span className="text-amber-500">gasto</span>
      </p>
      {state.errors.map((error) => (
        <ErrorMessageForForm key={error}>{error}</ErrorMessageForForm>
      ))}
      <form
        action={dispatch}
        className="bg-gray-100 shadow-lg rounded-lg p-10 mt-10 border"
        noValidate
      >
        <ExpenseForm expense={expense} />

        <input
          type="submit"
          className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
          value="Guardar Cambios"
        />
      </form>
    </>
  );
}
