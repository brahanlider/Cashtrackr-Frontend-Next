import LoginForm from "@/components/auth/LoginForm";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login",
  description: "Login",
};

export default function LoginPage() {
  console.log("RegisterPage");
  return (
    <>
      <h1 className="font-black text-6xl text-secondary">Iniciar Sesión</h1>
      <p className="text-3xl font-bold mb-10">
        y controla tus <span className="text-amber-500">finanzas</span>
      </p>

      <LoginForm />

      <nav className="flex flex-col mt-5 text-center gap-3">
        <Link href="/auth/register" className="text-secondary">
          ¿No tienes cuenta? Crea tu cuenta
        </Link>
        <Link href="/auth/forgot-password" className="text-secondary">
          ¿Olvidaste tu cuenta? Recupera tu cuenta
        </Link>
      </nav>
    </>
  );
}
