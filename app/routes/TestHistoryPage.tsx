import Select from "~/components/Select/Select";
import type { Route } from "./+types/TestHistoryPage";
import HistoryCard from "~/components/HistoryCard/HistoryCard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Historial" },
    { name: "description", content: "Tu histórico de resultados de pruebas" },
  ];
}

export default function TestHistoryPage() {
  const history = [
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
  ];
  return (
    <>
      <header className="questionnaire"></header>

      <main className="mt-3">
        <h1 className="text-3xl text-center">Histórico de Pruebas</h1>
        <div className="px-4 mt-3">
          <Select options={[{ value: "2024", label: "2024" }]} />
        </div>
        <div className="px-4 mt-6 flex flex-col items-center gap-3">
          {history.map((item) => (
            <HistoryCard key={item.id} item={item} />
          ))}
        </div>
      </main>
    </>
  );
}
