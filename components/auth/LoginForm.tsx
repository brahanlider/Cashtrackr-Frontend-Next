"use client";

export default function LoginForm() {
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
