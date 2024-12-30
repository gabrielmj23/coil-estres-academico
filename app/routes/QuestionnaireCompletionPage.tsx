import type { Route } from "./+types/questionnaire-completion";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Completado del Cuestionario" },
    { name: "description", content: "Página de finalización del cuestionario." },
  ];
}

export default function QuestionnaireCompletionPage() {
  return <h1>Completado del Cuestionario</h1>;
}
