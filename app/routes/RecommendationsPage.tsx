import React from "react";
import { Link } from "react-router";
import type { Route } from "./+types/RecommendationsPage";
import { getejercios } from "~/api/controllers/ejercicios";
import Card from "~/components/SelectorCuestionario/SelectorCuestionario";
import ArrowLeft from "~/icons/ArrowLeft";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Recomendaciones" },
    { name: "description", content: "Página de recomendaciones." },
  ];
}

export async function loader() {
  return getejercios();
}

export default function RecommendationsPage({
  loaderData,
}: Route.ComponentProps) {
  const { ejercicios } = loaderData;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/manual.pdf';
    link.download = 'manual.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    console.log("Botón de descarga presionado");
  };

  return (
    <div className="h-[100dvh]">
      <header className="questionnaire">
        <img src="/logo-light.svg" alt="Logo" className="logo" />
      </header>
      <Link
        to="/cuestionario-completado"
        className="absolute top-8 left-4 rounded-full border-solid border-[1px] p-1"
      >
        <ArrowLeft />
      </Link>
      <main className="flex flex-col gap-5 pb-12">
        <h1 className="text-3xl text-center">Ejercicios Recomendados</h1>
        <div className="flex justify-center">
        <button
      className="flex items-center gap-2 text-[var(--coilterracota)] text-lg font-semibold underline decoration-2 decoration-[var(--coilterracota)] hover:text-opacity-80 transition duration-300"
      onClick={handleDownload}
    >
      Descargar Manual
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          d="M12 3v12"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 15l3 3 3-3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5 20c0 1 1 2 2 2h10c1 0 2-1 2-2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
</button>
        </div>

        {!ejercicios.length && <p>No hay recomendaciones para mostrar.</p>}
        <div className="px-6 flex flex-col gap-5">
          {ejercicios.map((questionnaire) => (
            <Card
              key={questionnaire.id}
              title={questionnaire.nombre}
              description={questionnaire.descripcion}
              image={questionnaire.icono}
              selected={false}
              imageWidth="40%"
            />
          ))}
        </div>
      </main>
    </div>
  );
}