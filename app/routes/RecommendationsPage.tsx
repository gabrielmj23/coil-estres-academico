import type { Route } from "./+types/RecommendationsPage";
import { getejercios } from "~/api/controllers/ejercicios";
import Card from "~/components/SelectorCuestionario/SelectorCuestionario";
import { useState } from "react";
import PrimaryButton from "~/components/PrimaryButton/PrimaryButton";
import ArrowRight from "~/icons/ArrowRight";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Recomendaciones" },
    { name: "description", content: "Página de recomendaciones." },
  ];
}

export async function loader() {
  return getejercios();
}


export default function RecommendationsPage({loaderData}:Route.ComponentProps) {
  const { ejercicios } = loaderData;
  const [selectedId, setSelectedId] = useState(0);
  const selectedTest = ejercicios.find((ejercicio) => ejercicio.id === selectedId);
  const url = selectedTest
  return <div className="h-[100dvh]">
          <header className="primary rounded-b-[32px] mb-12"></header>
            <main className="flex flex-col gap-5">
            <h1 className="text-3xl text-center">Ejercicios Recomendados</h1>
        {!ejercicios.length && <p>No hay recomendaciones para mostrar.</p>}
        <div className="px-6 flex flex-col gap-5">
          {ejercicios.map((questionnaire) => (
            <Card
              key={questionnaire.id}
              title={questionnaire.nombre}
              description={questionnaire.descripcion}
              image={questionnaire.icono}
              selected={selectedId === questionnaire.id}
              onClick={() => setSelectedId(questionnaire.id)}
              imageWidth="40%"
            />
          ))}
        </div>
            </main>
        </div>;
}
