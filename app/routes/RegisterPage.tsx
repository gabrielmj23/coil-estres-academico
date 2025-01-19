import type { Route } from "./+types/RegisterPage";
import SignUpForm from "~/components/SignUpForm/SignUpForm";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Registrarse" },
    { name: "description", content: "Página para registrarse." },
  ];
}

export default function RegisterPage() {
  return <SignUpForm />;
}
