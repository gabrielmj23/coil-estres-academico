// route("cuestionario-sisco", "./routes/QuestionnaireSiscoPage.tsx")
import type { Route } from "./+types/QuestionnaireSiscoPage";
import { SurveyOption } from "~/components/SurveyOption/SurveyOption";
import PrimaryButton from "~/components/PrimaryButton/PrimaryButton";
import { useState } from "react";
import ArrowRight from "~/icons/ArrowRight";
import { getPreguntasSISCO } from "~/api/controllers/preguntas";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Cuestionario SISCO" },
    { name: "description", content: "Responde al cuestionario SISCO." },
  ];
}

export async function loader() {
  return getPreguntasSISCO();
}

export default function QuestionnaireSiscoPage({
  loaderData,
}: Route.ComponentProps) {
  const [sectionIndex, setSectionIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<StoredAnswer[]>([]);

  const sections = loaderData.sections;

  const currentQuestion = sections[sectionIndex].preguntas[questionIndex];

  /**
   * Saves an answer and advances to next question/section
   * @author Gabriel
   */
  const saveAnswer = () => {
    // Store answer
    setAnswers((prev) => [
      ...prev,
      {
        sectionId: sections[sectionIndex].idSeccion,
        questionId: currentQuestion.idPregunta,
        indicatorId: currentQuestion.idIndicador,
        optionId: selectedOption || 0,
        points:
          currentQuestion.opciones.find((op) => op.idOpcion === selectedOption)
            ?.puntaje ?? 0,
      },
    ]);

    // Clear selection
    setSelectedOption(null);

    // Continue
    if (questionIndex + 1 === sections[sectionIndex].preguntas.length) {
      if (sectionIndex + 1 === sections.length) {
        console.log("END");
        console.log(answers);
      } else {
        setSectionIndex((prev) => prev + 1);
        setQuestionIndex(0);
      }
    } else {
      setQuestionIndex((prev) => prev + 1);
    }
  };

  return (
    <>
      <header className="questionnaire"></header>
      <main>
        <div>
          <h2 className="text-center text-xl font-bold text-coilterracota px-3 py-5 pb-2">
            {currentQuestion.contenido}
          </h2>
          <SurveyOption
            options={currentQuestion.opciones}
            selectedOption={selectedOption}
            onChange={(option) => setSelectedOption(option.idOpcion)}
          />
          <PrimaryButton
            label="Continuar"
            onClick={saveAnswer}
            disabled={selectedOption === null}
            icon={<ArrowRight className="w-6" />}
          />
        </div>
      </main>
    </>
  );
}
