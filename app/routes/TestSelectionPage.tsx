import { getCuestionarios } from "~/api/controllers/cuestionarios";
import type { Route } from "./+types/TestSelectionPage";
import Card from "~/components/SelectorCuestionario/SelectorCuestionario";
import { useState } from "react";
import PrimaryButton from "~/components/PrimaryButton/PrimaryButton";
import ArrowRight from "~/icons/ArrowRight";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Selección de Cuestionario" },
    {
      name: "description",
      content: "Elige el cuestionario que quieres realizar.",
    },
  ];
}

export async function loader() {
  return getCuestionarios();
}

export default function TestSelectionPage({
  loaderData,
}: Route.ComponentProps) {
  const { questionnaires } = loaderData;
  const [selectedId, setSelectedId] = useState(0);

  const selectedTest = questionnaires.find((test) => test.id === selectedId);
  const url = selectedTest
    ? selectedTest.nombre === "SISCO"
      ? "/cuestionario-sisco"
      : "/cuestionario-goldberg"
    : "";

  return (
    <div className="h-[100dvh]">
      <header className="primary rounded-b-[32px] mb-12"></header>
      <main className="flex flex-col gap-5">
        <h1 className="text-3xl text-center">Pruebas Disponibles</h1>
        {!questionnaires.length && <p>No hay pruebas disponibles</p>}
        <div className="px-6 flex flex-col gap-5">
          {questionnaires.map((questionnaire) => (
            <Card
              key={questionnaire.id}
              title={questionnaire.nombre}
              description={questionnaire.resumen}
              image={questionnaire.icono}
              selected={selectedId === questionnaire.id}
              onClick={() => setSelectedId(questionnaire.id)}
            />
          ))}
        </div>
        <PrimaryButton
          label="Continuar"
          icon={<ArrowRight />}
          linkTo={url}
          disabled={!url.length}
        />
      </main>
    </div>
  );
}
