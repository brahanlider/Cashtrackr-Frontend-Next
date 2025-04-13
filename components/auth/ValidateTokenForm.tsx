//*Sirve para el new-password
import { validateToken } from "@/actions/validate-token-action";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";

type ValidateTokemFormProps = {
  setIsValidToken: Dispatch<SetStateAction<boolean>>;
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
};

export default function ValidateTokenForm({
  setIsValidToken,
  token,
  setToken,
}: ValidateTokemFormProps) {
  const [isComplete, setIsComplete] = useState(false);

  const validateTokenInput = validateToken.bind(null, token); // lo pasamos el token al validateToken en useFormState

  const [state, dispatch] = useFormState(validateTokenInput, {
    errors: [],
    success: "",
  });

  useEffect(() => {
    if (isComplete) {
      dispatch();
    }
  }, [isComplete, dispatch]); //CUANDO ESTE completo el los PinInputField se enviara

  useEffect(() => {
    if (state.errors) {
      state.errors.forEach((error) => {
        toast.error(error);
      });
    }

    if (state.success) {
      toast.success(state.success);
      setIsValidToken(true); // ==> cambiara a otro componente ResetPasswordForm
    }
  }, [state, setIsValidToken]);

  const handleChange = (token: string) => {
    setToken(token);
    setIsComplete(false); // antes tomaba 5 valores a hora toma todo =6 valores
  };

  const handleComplete = () => {
    setIsComplete(true);
  };

  return (
    <div className="flex justify-center gap-5 my-10">
      <PinInput
        value={token}
        onChange={handleChange}
        onComplete={handleComplete}
      >
        <PinInputField className="h-10 w-10 text-center border  border-tertiary shadow rounded-lg focus:border-secondary focus:border-secondary/5 focus:border-secondary/2 outline-none transition-all placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border  border-tertiary shadow rounded-lg focus:border-secondary focus:border-secondary/5 focus:border-secondary/2 outline-none transition-all placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border  border-tertiary shadow rounded-lg focus:border-secondary focus:border-secondary/5 focus:border-secondary/2 outline-none transition-all placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border  border-tertiary shadow rounded-lg focus:border-secondary focus:border-secondary/5 focus:border-secondary/2 outline-none transition-all placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border  border-tertiary shadow rounded-lg focus:border-secondary focus:border-secondary/5 focus:border-secondary/2 outline-none transition-all placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border  border-tertiary shadow rounded-lg focus:border-secondary focus:border-secondary/5 focus:border-secondary/2 outline-none transition-all placeholder-white" />
      </PinInput>
    </div>
  );
}
