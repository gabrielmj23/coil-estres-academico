import type { Route } from "./+types/questionnaire-goldberg";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Cuestionario Goldberg" },
    { name: "description", content: "Responde al cuestionario Goldberg." },
  ];
}

export default function QuestionnaireGoldbergPage() {
  return <h1>Cuestionario Goldberg</h1>;
}
