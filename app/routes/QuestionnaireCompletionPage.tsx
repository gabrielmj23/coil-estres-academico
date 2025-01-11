import type { Route } from "./+types/QuestionnaireCompletionPage";
import StressLevel from "../components/StressLevel/StressLevel";
import ResultScreen from "../components/ResultScreen/ResultScreen";
import { useNavigate } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Completado del Cuestionario" },
    { name: "description", content: "Página de finalización del cuestionario." },
  ];
}

export default function QuestionnaireCompletionPage() {
  const navigate = useNavigate();

  const testType = localStorage.getItem("testType") as "SISCO" | "Goldberg" | undefined;
  const scoreStress = localStorage.getItem("scoreStress") as string | undefined;
  const scoreAnxiety = localStorage.getItem("scoreAnxiety") as string | undefined;
  const scoreSocial = localStorage.getItem("scoreSocial") as string | undefined;

  if (testType === "SISCO") {
    return <StressLevel percentage={Number(scoreStress)} />
  }

  if (testType === "Goldberg") {
    return <ResultScreen hasSymptoms={Number(scoreAnxiety) > 9 || Number(scoreSocial) > 9} />
  }

  return navigate("/seleccion-de-prueba");
}
