"use client";

import { forgotPassword } from "@/actions/forgot-password-action";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";

export default function ForgotPasswordForm() {
  const [state, dispatch] = useFormState(forgotPassword, {
    errors: [],
    success: "",
  });

  useEffect(() => {
    if (state.errors) {
      state.errors.forEach((err) => {
        toast.error(err);
      });
    }

    if (state.success) {
      toast.success(state.success);
    }
  }, [state]);

  return (
    <>
      <form action={dispatch} noValidate className="space-y-4">
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

        <button
          type="submit"
          className="bg-secondary w-full text-white font-bold py-2 px-4 rounded-md"
        >
          Enviar Instrucciones
        </button>
      </form>
    </>
  );
}
