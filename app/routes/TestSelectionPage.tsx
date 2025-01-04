import type { Route } from "./+types/TestSelectionPage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Selección de Test" },
    { name: "description", content: "Elige el test que quieres realizar." },
  ];
}

export default function TestSelectionPage() {
  return <h1>Selecciona un Test</h1>;
}
