import { Link } from "react-router";
import type { Route } from "./+types/LoginPage";
import ArrowLeft from "~/icons/ArrowLeft";
import Field from "~/components/Field/Field";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Iniciar Sesión" },
    { name: "description", content: "Página de inicio de sesión." },
  ];
}

export default function LoginPage() {
  return (
    <div className="h-[100dvh]">
      <header className="questionnaire"></header>
      <Link
        to="/"
        className="absolute top-8 left-4 rounded-full border-solid border-[1px] p-1"
      >
        <ArrowLeft />
      </Link>
      <main className="flex flex-col gap-5">
        <h1 className="text-3xl text-center">Iniciar Sesión</h1>

        <Field />
      </main>
    </div>
  );
}
