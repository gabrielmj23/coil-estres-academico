import { Link } from "react-router";
import type { Route } from "./+types/RecommendationsPage";
import { getejercios } from "~/api/controllers/ejercicios";
import Card from "~/components/SelectorCuestionario/SelectorCuestionario";
import ArrowLeft from "~/icons/ArrowLeft";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Recomendaciones" },
    { name: "description", content: "Página de recomendaciones." },
  ];
}

export async function loader() {
  return getejercios();
}

export default function RecommendationsPage({
  loaderData,
}: Route.ComponentProps) {
  const { ejercicios } = loaderData;

  return (
    <div className="h-[100dvh]">
      <header className="questionnaire"></header>
      <Link
        to="/cuestionario-completado"
        className="absolute top-8 left-4 rounded-full border-solid border-[1px] p-1"
      >
        <ArrowLeft />
      </Link>
      <main className="flex flex-col gap-5 pb-12">
        <h1 className="text-3xl text-center">Ejercicios Recomendados</h1>
        {!ejercicios.length && <p>No hay recomendaciones para mostrar.</p>}
        <div className="px-6 flex flex-col gap-5">
          {ejercicios.map((questionnaire) => (
            <Card
              key={questionnaire.id}
              title={questionnaire.nombre}
              description={questionnaire.descripcion}
              image={questionnaire.icono}
              selected={false}
              imageWidth="40%"
            />
          ))}
        </div>
      </main>
    </div>
  );
}
