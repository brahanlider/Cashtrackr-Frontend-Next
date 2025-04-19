import { DialogTitle } from "@headlessui/react";
import ExpenseForm from "./ExpenseForm";
import { useFormState } from "react-dom";
import createExpense from "@/actions/expense/create-expense-action";
import { useParams } from "next/navigation";
import ErrorMessageForForm from "../ui/ErrorMessageForForm";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function AddExpenseForm({
  closeModal,
}: {
  closeModal: () => void;
}) {
  const { id } = useParams(); // traemos el id

  const createExpenseWithBudgetId = createExpense.bind(null, +id);

  const [state, dispatch] = useFormState(createExpenseWithBudgetId, {
    errors: [],
    success: "",
  });

  // console.log(state);

  useEffect(() => {
    if (state.success) {
      toast.success(state.success);
      closeModal();
    }
  }, [state, closeModal]);

  return (
    <>
      <DialogTitle as="h3" className="font-black text-4xl text-purple-950 my-5">
        Agregar Gasto
      </DialogTitle>

      <p className="text-xl font-bold">
        Llena el formulario y crea un {""}
        <span className="text-amber-500">gasto</span>
      </p>
      <form
        action={dispatch}
        className="bg-gray-100 shadow-lg rounded-lg p-10 mt-10 border"
        noValidate
      >
        {state.errors.map((error) => (
          <ErrorMessageForForm key={error}>{error}</ErrorMessageForForm>
        ))}
        <ExpenseForm />
        <input
          type="submit"
          className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
          value="Registrar Gasto"
        />
      </form>
    </>
  );
}
