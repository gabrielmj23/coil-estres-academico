import type { Route } from "./+types/login";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Iniciar Sesión" },
    { name: "description", content: "Página de inicio de sesión." },
  ];
}

export default function LoginPage() {
  return <h1>Iniciar sesión</h1>;
}
