import type { Route } from "./+types/QuestionnaireGoldbergPage";
import { SurveyOption } from "~/components/SurveyOption/SurveyOption";
import PrimaryButton from "~/components/PrimaryButton/PrimaryButton";
import { useEffect, useState } from "react";
import ArrowRight from "~/icons/ArrowRight";
import { getPreguntasGoldBerg } from "~/api/controllers/preguntas";
import { calculatePointsGoldberg } from "~/api/utils/utils";
import SectionPage from "~/components/SectionPage/SectionPage";
import ProgressBar from "../components/ProgressBar/ProgressBar";
import { useNavigate } from "react-router";
import RestoreProgressModal from "~/components/RestoreProgressModal/RestoreProgressModal";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Cuestionario Salud Mental" },
    {
      name: "description",
      content: "Responde al cuestionario de Salud Mental.",
    },
  ];
}

export async function loader() {
  return getPreguntasGoldBerg();
}

export default function QuestionnaireGoldbergPage({
  loaderData,
}: Route.ComponentProps) {
  // For questionnaire
  const [sectionIndex, setSectionIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [globalIndex, setGlobalIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<StoredAnswer[]>([]);
  const [showInstructions, setShowInstructions] = useState(true);

  const navigate = useNavigate();

  // Modal
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const storedGoldberg = localStorage.getItem("goldbergProgress");
    if (storedGoldberg) {
      setOpenModal(true);
    }
  }, []);

  const cancelProgress = () => {
    localStorage.removeItem("goldbergProgress");
    setOpenModal(false);
  };

  const restoreProgress = () => {
    const progress = localStorage.getItem("goldbergProgress");
    if (progress) {
      const parsed = JSON.parse(progress);
      console.log(parsed);
      setSectionIndex(Number(parsed.sectionIndex));
      setQuestionIndex(Number(parsed.questionIndex));
      setGlobalIndex(Number(parsed.globalIndex));
      setAnswers(parsed.answers as StoredAnswer[]);
      setShowInstructions(Boolean(parsed.showInstructions));
      setOpenModal(false);
      localStorage.removeItem("goldbergProgress");
    }
  };

  // Extract data
  const sections = loaderData.sections;
  const currentSection = sections[sectionIndex];
  const currentQuestion = currentSection.preguntas[questionIndex];

  const TOTAL_QUESTIONS = 12;

  /**
   * Saves an answer and advances to next question/section
   * @author Gabriel
   */
  const saveAnswer = () => {
    const newGlobalIndex = globalIndex + 1;
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
    ];

    // Store answer
    setGlobalIndex(newGlobalIndex);
    setAnswers(newAnswers);

    // Clear selection
    setSelectedOption(null);

    // Continue
    let newSectionIndex = sectionIndex;
    let newQuestionIndex = questionIndex + 1;
    let newShowInstructions = false;

    if (questionIndex + 1 === currentSection.preguntas.length) {
      if (sectionIndex + 1 === sections.length) {
        // Test has finished
        const results = calculatePointsGoldberg(answers);
        localStorage.setItem("testType", "Goldberg");
        localStorage.setItem(
          "scoreAnxiety",
          String(results["Ansiedad/Depresión"])
        );
        localStorage.setItem(
          "scoreSocial",
          String(results["Disfunción Social"])
        );
        localStorage.removeItem("goldbergProgress");
        navigate("/cuestionario-completado");
      } else {
        // Go to next section
        newSectionIndex += 1;
        setSectionIndex(newSectionIndex);
        newQuestionIndex = 0;
        setQuestionIndex(newQuestionIndex);
        newShowInstructions = true;
        setShowInstructions(newShowInstructions);
      }
    } else {
      setQuestionIndex(newQuestionIndex);
    }

    // Save in local storage
    const progress = {
      sectionIndex: newSectionIndex,
      questionIndex: newQuestionIndex,
      globalIndex: newGlobalIndex,
      answers: newAnswers,
      showInstructions: newShowInstructions,
    };
    localStorage.setItem("goldbergProgress", JSON.stringify(progress));
  };

  if (showInstructions) {
    return (
      <>
        <SectionPage
          image={currentSection.imagen}
          instruction={currentSection.instruccion}
          onContinue={() => setShowInstructions(false)}
        />
        <RestoreProgressModal
          isOpen={openModal}
          onClose={cancelProgress}
          onContinue={restoreProgress}
        />
      </>
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
