import { Budget } from "@/src/schemas";

export default function BudgetForm({ budget }: { budget?: Budget }) {
  return (
    <>
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
          defaultValue={budget?.name}
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
          defaultValue={budget?.amount}
        />
      </div>
    </>
  );
}
