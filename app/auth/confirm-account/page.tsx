import ConfirmAccountForm from "@/components/auth/ConfirmAccountForm";

export default function ConfirmAccount() {
  return (
    <>
      <h1 className="font-black sm:text-6xl text-5xl text-secondary">
        Confirma tu cuenta
      </h1>
      <p className="sm:text-4xl text-3xl font-bold mb-10">
        Ingresa el código que recibiste{" "}
        <span className="text-amber-500">por email</span>
      </p>

      <ConfirmAccountForm />
    </>
  );
}
