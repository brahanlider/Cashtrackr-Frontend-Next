import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Recuperar cuenta",
  description: "Recuperar cuenta",
};

export default function ForgotPasswordPage() {
  console.log("RegisterPage");
  return (
    <>
      <h1 className="font-black text-6xl text-secondary">
        ¿Olvidaste tu Contraseña?
      </h1>
      <p className="text-3xl font-bold mb-10">
        aquí puedes <span className="text-amber-500">reestablecerla</span>
      </p>

      <ForgotPasswordForm />

      <nav className="flex flex-col mt-5 text-center gap-3">
        <Link href="/auth/login" className="text-secondary">
          ¿Ya tienes cuenta? Iniciar Sesión
        </Link>
        <Link href="/auth/register" className="text-secondary">
          ¿No tienes cuenta? Crea tu cuenta
        </Link>
      </nav>
    </>
  );
}
