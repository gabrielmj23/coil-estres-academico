import type { Route } from "./+types/QuestionnaireCompletionPage";
import StressLevel from "../components/StressLevel/StressLevel";
import ResultScreen from "../components/ResultScreen/ResultScreen";
import { useNavigate } from "react-router";
import PrimaryButton from "~/components/PrimaryButton/PrimaryButton";
import SecondaryButton from "~/components/SecondaryButton/SecondaryButton";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Completado del Cuestionario" },
    {
      name: "description",
      content: "Página de finalización del cuestionario.",
    },
  ];
}

export async function clientLoader() {
  const testType = localStorage.getItem("testType") as
    | "SISCO"
    | "Goldberg"
    | undefined;
  const scoreStress = localStorage.getItem("scoreStress") as string | undefined;
  const scoreAnxiety = localStorage.getItem("scoreAnxiety") as
    | string
    | undefined;
  const scoreSocial = localStorage.getItem("scoreSocial") as string | undefined;

  if (testType === "SISCO") {
    return { testType, scoreStress };
  }
  if (testType === "Goldberg") {
    return { testType, scoreAnxiety, scoreSocial };
  }
  return null;
}

// HydrateFallback is rendered while the client loader is running
export function HydrateFallback() {
  return <div>Cargando...</div>;
}

export default function QuestionnaireCompletionPage({
  loaderData,
}: Route.ComponentProps) {
  const navigate = useNavigate();
  if (loaderData === null) {
    return navigate("/seleccion-de-prueba");
  }

  const { testType } = loaderData;

  if (testType === "SISCO") {
    return (
      <>
        <header className="questionnaire"></header>
        <main className="flex flex-col h-[75dvh] justify-between">
          <StressLevel percentage={Number(loaderData.scoreStress)/116} />
          <div className="flex flex-col gap-3 items-center">
            <PrimaryButton label="Recomendaciones" linkTo="/recomendaciones" />
            <SecondaryButton label="Volver a Inicio" linkTo="/" />
          </div>
        </main>
      </>
    );
  }

  if (testType === "Goldberg") {
    return (
      <>
        <header className="questionnaire"></header>
        <main className="flex flex-col h-[75dvh] justify-between">
          <ResultScreen
            hasSymptoms={
              Number(loaderData.scoreAnxiety) > 9 ||
              Number(loaderData.scoreSocial) > 9
            }
          />
          <div className="flex flex-col gap-3 items-center">
            <PrimaryButton label="Recomendaciones" linkTo="/recomendaciones" />
            <SecondaryButton label="Volver a Inicio" linkTo="/" />
          </div>
        </main>
      </>
    );
  }

  return navigate("/seleccion-de-prueba");
}
