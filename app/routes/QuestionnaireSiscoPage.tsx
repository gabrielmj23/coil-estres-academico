import type { Route } from "./+types/questionnaire-sisco";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Cuestionario Sisco" },
    { name: "description", content: "Responde al cuestionario Sisco." },
  ];
}

export default function QuestionnaireSiscoPage() {
  return <h1>Cuestionario Sisco</h1>;
}
