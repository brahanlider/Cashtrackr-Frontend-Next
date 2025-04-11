"use client";

import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { confirmAccount } from "@/actions/confirm-account-actions";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";

export default function ConfirmAccountForm() {
  const router = useRouter();
  const [isComplete, setIsComplete] = useState(false); // Estado para controlar si el PIN está completo (6 dígitos)
  const [token, setToken] = useState("");
  const confirmAccountWithToken = confirmAccount.bind(null, token); // Prepara la acción de confirmación con el token actual
  // Maneja el estado del formulario y la acción de confirmación
  const [state, dispatch] = useFormState(confirmAccountWithToken, {
    errors: [],
    success: "",
  });

  // Ejecucion con exito (6 digitos)
  useEffect(() => {
    if (isComplete) {
      dispatch();
    }
  }, [isComplete, dispatch]); //=> CREO QUE SE AGREGA , dispatch

  // toast errores
  useEffect(() => {
    if (state.errors) {
      state.errors.forEach((error) => {
        toast.error(error);
      });
    }

    if (state.success) {
      toast.success(state.success, {
        onClose: () => {
          router.push("/auth/login");
        },
      });
    }
  }, [state, router]); //=> CREO QUE SE AGREGA , router

  const handleChange = (token: string) => {
    setIsComplete(false); // Resetea estado de completado
    setToken(token); // Actualiza el token
  };

  // Maneja cuando se completa el PIN (6 dígitos)
  const handleComplete = () => {
    setIsComplete(true);
  };
  return (
    <>
      {/* {state.errors.map((error) => (
        <p key={error} className="bg-red-600 text-white p-2">
          {error}
        </p>
      ))} */}

      {/* {state.success && <p className="bg-green-600 p-2">{state.success}</p>} */}

      <PinInput
        value={token}
        onChange={handleChange}
        onComplete={handleComplete}
      >
        <div className=" flex gap-3 justify-center items-center">
          <PinInputField className="p-1 w-10 text-center border border-orange-400 rounded-md focus:border-secondary focus:border-secondary/5 focus:border-secondary/2 outline-none transition-all placeholder-white" />
          <PinInputField className="p-1 w-10 text-center border border-orange-400 rounded-md focus:border-secondary focus:border-secondary/5 focus:border-secondary/2 outline-none transition-all placeholder-white" />
          <PinInputField className="p-1 w-10 text-center border border-orange-400 rounded-md focus:border-secondary focus:border-secondary/5 focus:border-secondary/2 outline-none transition-all placeholder-white" />
          <PinInputField className="p-1 w-10 text-center border border-orange-400 rounded-md focus:border-secondary focus:border-secondary/5 focus:border-secondary/2 outline-none transition-all placeholder-white" />
          <PinInputField className="p-1 w-10 text-center border border-orange-400 rounded-md focus:border-secondary focus:border-secondary/5 focus:border-secondary/2 outline-none transition-all placeholder-white" />
          <PinInputField className="p-1 w-10 text-center border border-orange-400 rounded-md focus:border-secondary focus:border-secondary/5 focus:border-secondary/2 outline-none transition-all placeholder-white" />
        </div>
      </PinInput>
    </>
  );
}
