//* es para el new password
"use client";
import { useState } from "react";
import ValidateTokenForm from "./ValidateTokenForm";
import ResetPasswordForm from "./ResetPasswordForm";

export default function PasswordResetHandler() {
  const [isValidToken, setIsValidToken] = useState(false);
  //* LOGICA pasar token a ambos
  const [token, setToken] = useState("");

  return (
    <>
      {!isValidToken ? (
        <ValidateTokenForm
          token={token}
          setToken={setToken}
          setIsValidToken={setIsValidToken}
        />
      ) : (
        <ResetPasswordForm token={token} />
      )}
    </>
  );
}

