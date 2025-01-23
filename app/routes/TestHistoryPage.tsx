import Select from "~/components/Select/Select";
import type { Route } from "./+types/TestHistoryPage";
import HistoryCard from "~/components/HistoryCard/HistoryCard";
import { getResultadosCuestionario } from "~/api/controllers/cuestionario_historico";
import { useEffect, useState } from "react";
import { getSession } from "~/sessions.server";
import { redirect } from "react-router";
import Navbar from "~/components/Navbar/Navbar";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Historial" },
    { name: "description", content: "Tu histórico de resultados de pruebas" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  if (session.has("userId")) {
    const userID = session.get("userId");
    const userName = session.get("userName")!;
    const resultadosCuestionario = await getResultadosCuestionario(
      Number(userID)
    );
    return { ...resultadosCuestionario, userName };
  }
  return redirect("/iniciar-sesion");
}

export default function TestHistoryPage({ loaderData }: Route.ComponentProps) {
  const { resultados, userName } = loaderData;
  const [selectedYear, setSelectedYear] = useState<string>("2025");

  const handleYearChange: React.ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    setSelectedYear(event.target.value);
  };

  const filteredResultados = selectedYear
    ? resultados.filter(
        (item) => new Date(item.date).getFullYear().toString() === selectedYear
      )
    : resultados;

  return (
    <>
      <Navbar nombre={userName} />

      <main className="mt-3 mb-10">
        <h1 className="text-3xl text-center">Histórico de Pruebas</h1>
        <div className="px-4 mt-3">
          <Select
            options={[
              { value: "2024", label: "2024" },
              { value: "2025", label: "2025" },
            ]}
            selected={selectedYear}
            onChange={handleYearChange}
          />
        </div>
        <div className="px-4 mt-6 flex flex-col items-center gap-3">
          {filteredResultados.map((item) => (
            <HistoryCard key={item.id} item={item} />
          ))}
        </div>
      </main>
    </>
  );
}
