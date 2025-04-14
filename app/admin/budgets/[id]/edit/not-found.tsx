import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
      {/* Ilustración */}
      <div className="mb-8 w-full max-w-md">
        <Image
          src="/404.webp" // Reemplaza con tu imagen o usa una de estas URLs:
          // src="https://illustrations.popsy.co/amber/meditating.svg"
          // src="https://illustrations.popsy.co/gray/timed-out-error.svg"
          alt="Página no encontrada"
          width={400}
          height={300}
          className="mx-auto"
          priority
        />
      </div>

      {/* Contenido */}
      <div className="space-y-5 max-w-2xl">
        <h1 className="font-black text-5xl text-secondary mb-2">
          ¡Ups! Página no encontrada
        </h1>
        
        <p className="text-xl font-semibold text-gray-600">
          El presupuesto que intentas acceder{" "}
          <span className="text-tertiary font-bold">no existe o fue eliminado</span>
        </p>
        
        <p className="text-gray-500">
          Revisa la URL o regresa al listado de presupuestos
        </p>

        {/* Botón con animación */}
        <Link
          href="/admin"
          className="bg-tertiary hover:bg-tertiary-dark px-10 py-3 rounded-lg text-white font-bold cursor-pointer inline-block transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-tertiary/30"
        >
          ← Volver a Presupuestos
        </Link>

        {/* Opción adicional */}
        <div className="pt-6">
          <Link 
            href="/" 
            className="text-tertiary hover:underline font-medium"
          >
            ¿Prefieres ir al inicio?
          </Link>
        </div>
      </div>

      {/* Efecto visual decorativo */}
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-tertiary/10 rounded-full -z-10"></div>
      <div className="absolute top-20 left-10 w-24 h-24 bg-secondary/10 rounded-full -z-10"></div>
    </div>
  );
}