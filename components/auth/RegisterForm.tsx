"use client";

export default function RegisterForm() {
  return (
    <>
      <form action="" className="space-y-4">

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
            type="password_confirmation"
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
