import CreatedBudgetForm from "@/components/budgets/CreatedBudgetForm";
import Link from "next/link";
import React from "react";

export default function CreateBudgetsPage() {
  return (
    <>
      <div className=" flex flex-col-reverse md:flex-row md:justify-between items-center">
        <div className="w-full md:w-auto ">
          <h1 className="font-black sm:text-5xl text-4xl text-secondary">
            Nuevo Presupuesto
          </h1>
          <p className="text-xl font-bold ">
            Llena el formulario y crea un nuevo{" "}
            <span className="text-tertiary">presupuesto</span>
          </p>
        </div>
        <Link
          href={"/admin/"}
          className="mb-5 bg-tertiary-claro p-2 rounded-lg text-white font-bold w-full md:w-auto text-center"
        >
          Volver
        </Link>
      </div>

      <div className=" mt-10 shadow-lg border">
        <CreatedBudgetForm />
      </div>
    </>
  );
}
