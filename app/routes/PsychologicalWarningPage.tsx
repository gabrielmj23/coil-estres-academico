import type { Route } from "./+types/PsychologicalWarningPage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Aviso Psicológico" },
    { name: "description", content: "Página de aviso psicológico." },
  ];
}

export default function PsychologicalWarningPage() {
  return <h1>Aviso Psicológico</h1>;
}
