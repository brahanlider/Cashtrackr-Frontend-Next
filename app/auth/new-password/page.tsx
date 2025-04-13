import PasswordResetHandler from "@/components/auth/PasswordResetHandler";

export default function NewPaswordPage() {
  return (
    <>
      <h1 className="font-black text-6xl text-secondary">
        Reestablece tu Contraseña
      </h1>
      <p className="text-3xl font-bold mb-10">
        Ingresa el código que recibiste{" "}
        <span className="text-amber-500">por email</span>
      </p>
      <PasswordResetHandler />
    </>
  );
}
