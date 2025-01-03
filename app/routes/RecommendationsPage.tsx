import type { Route } from "./+types/recommendations";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Recomendaciones" },
    { name: "description", content: "Página de recomendaciones." },
  ];
}

export default function RecommendationsPage() {
  return <h1>Recomendaciones</h1>;
}
