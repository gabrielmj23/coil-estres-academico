// route("cuestionario-sisco", "./routes/QuestionnaireSiscoPage.tsx")
import type { Route } from "./+types/QuestionnaireSiscoPage";
import { useQuestionIndex } from "~/hooks/useQuestionIndex";
import { SurveyOption } from "~/components/SurveyOption/SurveyOption";
import { redirect } from "react-router";
import PrimaryButton from "~/components/PrimaryButton/PrimaryButton";
import { useState } from "react";
import ArrowRight from "~/icons/ArrowRight";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Cuestionario SISCO" },
    { name: "description", content: "Responde al cuestionario SISCO." },
  ];
}

export async function loader() {
  const siscoQuestions = [
    {
      id: 1,
      content: "La competencia con los compañeros del grupo",
      options: [
        { id: 1, content: "Nunca", points: 1 },
        { id: 2, content: "Rara vez", points: 2 },
        { id: 3, content: "Algunas veces", points: 3 },
        { id: 4, content: "Casi siempre", points: 4 },
        { id: 5, content: "Siempre", points: 5 },
      ],
    },
    {
      id: 2,
      content: "Sobrecarga de tareas y trabajos escolares",
      options: [
        { id: 1, content: "Nunca", points: 1 },
        { id: 2, content: "Rara vez", points: 2 },
        { id: 3, content: "Algunas veces", points: 3 },
        { id: 4, content: "Casi siempre", points: 4 },
        { id: 5, content: "Siempre", points: 5 },
      ],
    },
  ];
  return siscoQuestions;
}

export default function QuestionnaireSiscoPage({
  loaderData,
}: Route.ComponentProps) {
  const [questionIndex, nextQuestion, goBack] = useQuestionIndex();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  if (questionIndex < 0 || questionIndex >= loaderData.length) {
    return redirect("/");
  }

  const currentQuestion = loaderData[questionIndex];

  return (
    <>
      <header className="questionnaire"></header>
      <main>
        <div>
          <h2 className="text-center text-xl font-bold text-coilterracota px-3 py-5 pb-2">
            {currentQuestion.content}
          </h2>
          <SurveyOption
            options={currentQuestion.options.map((option) => option.content)}
            selectedOption={selectedOption}
            onChange={(option) => setSelectedOption(option)}
          />
          <PrimaryButton
            label="Continuar"
            onClick={() => {
              console.log(selectedOption);
              setSelectedOption(null);
              nextQuestion();
            }}
            disabled={selectedOption === null}
            icon={<ArrowRight className="w-6" />}
          />
        </div>
      </main>
    </>
  );
}
