import Select from "~/components/Select/Select";
import type { Route } from "./+types/TestHistoryPage";
import HistoryCard from "~/components/HistoryCard/HistoryCard";
import { getResultadosCuestionario } from "~/api/controllers/cuestionario_historico";
import { useEffect, useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Historial" },
    { name: "description", content: "Tu histórico de resultados de pruebas" },
  ];
}

export async function loader() {
  const userID = 1; //Reemplazar con la id del usuario
  return getResultadosCuestionario(userID);
}

export default function TestHistoryPage({
  loaderData,
} : Route.ComponentProps) {
  /*const history = [
    {
      id: 1,
      questionnaireId: 1,
      questionnaireName: "Estrés Académico",
      date: new Date().toDateString(),
      scoreStress: 74,
    },
    {
      id: 2,
      questionnaireId: 2,
      questionnaireName: "Salud Mental",
      date: new Date().toDateString(),
      scoreAnxiety: 8,
      scoreSocial: 10,
    },
    {
      id: 3,
      questionnaireId: 2,
      questionnaireName: "Salud Mental",
      date: new Date().toDateString(),
      scoreAnxiety: 12,
      scoreSocial: 10,
    },
  ];*/

  
  
  const {resultados} = loaderData;
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  const handleYearChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    setSelectedYear(event.target.value || null);
  };

  console.log(resultados)
  const filteredResultados = selectedYear
  ? resultados.filter((item) => new Date(item.date).getFullYear().toString() === selectedYear)
  : resultados;
  console.log("Rendering component..."); // Agregar un log para verificar el renderizado
  return (
    <>
      <header className="questionnaire"></header>

      <main className="mt-3">
        <h1 className="text-3xl text-center">Histórico de Pruebas</h1>
        <div className="px-4 mt-3">
          <Select 
            options={[
              { value: "2024", label: "2024" },
              { value: "2025", label: "2025"}]}
            onChange={handleYearChange}    
          />
        </div>
        <div className="px-4 mt-6 flex flex-col items-center gap-3">
          { 
          filteredResultados.map((item) => (
            <HistoryCard key={item.id} item={item} />
          ))
          
          }
        </div>
      </main>
    </>
  );
}
