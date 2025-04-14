import GetBudgets from "@/components/budgets/GetBudgets";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metaData: Metadata = {
  title: "Cashtrackr - Panel de administración",
  description: "Cashtrackr - Panel de administración",
};

export default async function AdminPage() {
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
      <GetBudgets />
    </>
  );
}
