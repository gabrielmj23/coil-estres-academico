// route("cuestionario-sisco", "./routes/QuestionnaireSiscoPage.tsx")
import type { Route } from "./+types/QuestionnaireSiscoPage";
import { SurveyOption } from "~/components/SurveyOption/SurveyOption";
import PrimaryButton from "~/components/PrimaryButton/PrimaryButton";
import { useState } from "react";
import ArrowRight from "~/icons/ArrowRight";
import { getPreguntasSISCO } from "~/api/controllers/preguntas";
import { calculatePointsSISCO } from "~/api/utils/utils";
import SectionPage from "~/components/SectionPage/SectionPage";
import ProgressBar from "../components/ProgressBar/ProgressBar";
import { useNavigate } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Cuestionario Estrés Académico" },
    { name: "description", content: "Responde al cuestionario de Estrés Académico." },
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
  const [globalIndex, setGlobalIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<StoredAnswer[]>([]);
  const [showInstructions, setShowInstructions] = useState(true);

  const navigate = useNavigate();

  const sections = loaderData.sections;

  const currentSection = sections[sectionIndex];
  const currentQuestion = currentSection.preguntas[questionIndex];
  const TOTAL_QUESTIONS = 29;
  console.log(calculatePointsSISCO(answers))
  /**
   * Saves an answer and advances to next question/section
   * @author Gabriel
   */
  const saveAnswer = () => {
    setGlobalIndex(globalIndex + 1);
    // Store answer
    const newAnswers = [
      ...answers, 
      {
        sectionId: currentSection.idSeccion,
        questionId: currentQuestion.idPregunta,
        indicatorId: currentQuestion.idIndicador,
        indicatorName: currentQuestion.nombreIndicador,
        optionId: selectedOption || 0,
        points:
          currentQuestion.opciones.find((op) => op.idOpcion === selectedOption)
            ?.puntaje ?? 0,
      },
    ]
    setAnswers(newAnswers);

    // Clear selection
    setSelectedOption(null);

    // Continue
    if (questionIndex + 1 === currentSection.preguntas.length) {
      if (sectionIndex + 1 === sections.length) {
        // Test has ended
        localStorage.setItem("testType", "SISCO");
        localStorage.setItem(
          "scoreStress",
          String(calculatePointsSISCO(newAnswers))
        );
        navigate("/cuestionario-completado");
      } else {
        // Go to next section
        setSectionIndex((prev) => prev + 1);
        setQuestionIndex(0);
        setShowInstructions(true);
      }
    } else {
      setQuestionIndex((prev) => prev + 1);
    }
  };

  if (showInstructions) {
    return (
      <SectionPage
        image={currentSection.imagen}
        instruction={currentSection.instruccion}
        onContinue={() => setShowInstructions(false)}
      />
    );
  }

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

          <ProgressBar
            progress={(globalIndex * 100) / TOTAL_QUESTIONS}
          ></ProgressBar>
        </div>
      </main>
    </>
  );
}
