import type { Route } from "./+types/landing";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Página de Inicio" },
    { name: "description", content: "Bienvenido a la página de inicio." },
  ];
}

export default function LandingPage() {
  return <h1>Bienvenido a la Página de Inicio</h1>;
}
