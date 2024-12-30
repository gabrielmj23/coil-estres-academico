import type { Route } from "./+types/register";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Registrarse" },
    { name: "description", content: "Página para registrarse." },
  ];
}

export default function RegisterPage() {
  return <h1>Registrarse</h1>;
}
