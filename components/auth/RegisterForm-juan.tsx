"use client";

import { useFormState } from "react-dom";
import { register } from "@/actions/create-account-actions-juan";
import { useEffect, useRef } from "react";

export default function RegisterFormJuan() {
  const ref = useRef<HTMLFormElement>(null);

  const [state, formAction] = useFormState(register, {
    errors: [],
    success: "",
  });

  useEffect(() => {
    if (state.success) {
      ref.current?.reset();
    }
  }, [state]);

  console.log(state);
  return (
    <>
      <form ref={ref} action={formAction} className="space-y-4" noValidate>
        {state.success && <p className="bg-green-600 p-2">{state.success}</p>}

        {state.errors.map((error) => (
          <p key={error} className="bg-red-600 text-white p-2">
            {error}
          </p>
        ))}

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-bold text-2xl">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email de Registro"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-secondary"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="font-bold text-2xl">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Nombre de Registro"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-secondary"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="font-bold text-2xl">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password de Registro"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-secondary"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password_confirmation" className="font-bold text-2xl">
            Repetir Password
          </label>
          <input
            type="password"
            id="password_confirmation"
            name="password_confirmation"
            placeholder="Repetir Password de Registro"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-secondary"
          />
        </div>

        <button
          type="submit"
          className="bg-secondary w-full text-white font-bold py-2 px-4 rounded-md"
        >
          Registrarse
        </button>
      </form>
    </>
  );
}
