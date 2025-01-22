import { getCuestionarios } from "~/api/controllers/cuestionarios";
import type { Route } from "./+types/TestSelectionPage";
import Card from "~/components/SelectorCuestionario/SelectorCuestionario";
import { useState } from "react";
import PrimaryButton from "~/components/PrimaryButton/PrimaryButton";
import ArrowRight from "~/icons/ArrowRight";
import Navbar from "~/components/Navbar/Navbar";
import { getSession } from "~/sessions.server";
import { Link } from "react-router";
import ArrowLeft from "~/icons/ArrowLeft";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Selección de Cuestionario" },
    {
      name: "description",
      content: "Elige el cuestionario que quieres realizar.",
    },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const cuestionarios = await getCuestionarios();
  return {
    userName: session.get("userName"),
    questionnaires: cuestionarios,
  };
}

export default function TestSelectionPage({
  loaderData,
}: Route.ComponentProps) {
  const { userName, questionnaires } = loaderData;
  const [selectedId, setSelectedId] = useState(0);

  const selectedTest = questionnaires.find((test) => test.id === selectedId);
  const url = selectedTest
    ? selectedTest.nombre === "Estrés Académico"
      ? "/cuestionario-sisco"
      : "/cuestionario-goldberg"
    : "";

  return (
    <div className="h-[100dvh]">
      {userName ? (
        <Navbar nombre={userName ? userName.split(" ")[0] : ""} />
      ) : (
        <>
          <header className="primary"></header>
          <Link
            to="/"
            className="absolute top-8 left-4 rounded-full border-solid border-[1px] p-1"
            viewTransition
          >
            <ArrowLeft />
          </Link>
        </>
      )}
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
              imageWidth="40%"
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
