import RegisterForm from "@/components/auth/RegisterForm";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Regitro de cuenta",
  description: "Regitro de cuenta",
};

export default function RegisterPage() {
  console.log("RegisterPage");
  return (
    <>
      <h1 className="font-black sm:text-6xl text-5xl text-secondary">
        Crear una cuenta
      </h1>
      <p className="sm:text-4xl text-3xl font-bold mb-10">
        y controla tus <span className="text-amber-500">finanzas</span>
      </p>

      <RegisterForm />

      <nav className="flex flex-col mt-5 text-center gap-3">
        <Link href="/auth/login" className="text-secondary">
          ¿Ya tienes cuenta? Iniciar Sesión
        </Link>
        <Link href="/auth/forgot-password" className="text-secondary">
          ¿Olvidaste tu cuenta? Recupera tu cuenta
        </Link>
      </nav>
    </>
  );
}
