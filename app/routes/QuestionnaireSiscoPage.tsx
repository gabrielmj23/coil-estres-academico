// route("cuestionario-sisco", "./routes/QuestionnaireSiscoPage.tsx")
import type { Route } from "./+types/QuestionnaireSiscoPage";
import { SurveyOption } from "~/components/SurveyOption/SurveyOption";
import PrimaryButton from "~/components/PrimaryButton/PrimaryButton";
import { useEffect, useState } from "react";
import ArrowRight from "~/icons/ArrowRight";
import { getPreguntasSISCO } from "~/api/controllers/preguntas";
import { calculatePointsSISCO } from "~/api/utils/utils";
import SectionPage from "~/components/SectionPage/SectionPage";
import ProgressBar from "../components/ProgressBar/ProgressBar";
import { useActionData, useFetcher, useNavigate } from "react-router";
import RestoreProgressModal from "~/components/RestoreProgressModal/RestoreProgressModal";
import { getSession } from "~/sessions.server";
import { saveHistorySISCO } from "~/api/controllers/cuestionario_historico";
import { Spinner } from "flowbite-react";
import ModalAlert from "~/components/ModalAlert/ModalAlert";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Cuestionario Estrés Académico" },
    {
      name: "description",
      content: "Responde al cuestionario de Estrés Académico.",
    },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const userId = session.get("userId");
  const preguntasSISCO = await getPreguntasSISCO();
  return { sections: preguntasSISCO, userId };
}

export async function action({ request }: Route.ActionArgs) {
  // Parse form data
  const formData = await request.formData();
  const userId = formData.get("userId");
  const idStress = formData.get("idStress");
  const scoreStress = formData.get("scoreStress");
  if (!userId || !idStress || !scoreStress) {
    return { redirect: "/seleccion-de-prueba" };
  }

  return saveHistorySISCO(
    Number(userId),
    Number(idStress),
    Number(scoreStress)
  );
}

export default function QuestionnaireSiscoPage({
  loaderData,
}: Route.ComponentProps) {
  // Questionnaire data
  const [sectionIndex, setSectionIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [globalIndex, setGlobalIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<StoredAnswer[]>([]);
  const [showInstructions, setShowInstructions] = useState(true);

  const navigate = useNavigate();

  // Modal
  const [openModal, setOpenModal] = useState(false);

  // Alert
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // Save history
  const fetcher = useFetcher<{ success: boolean; message: string }>();

  useEffect(function checkLocalProgress() {
    const storedSisco = localStorage.getItem("siscoProgress");
    if (storedSisco) {
      setOpenModal(true);
    }
  }, []);

  useEffect(
    function historySaved() {
      if (fetcher.data) {
        if (fetcher.data.success) {
          navigate("/cuestionario-completado");
        } else {
          setIsOpenAlert(true);
          setAlertMessage(fetcher.data.message);
          // Hide modal after 4 seconds
          setTimeout(() => {
            setIsOpenAlert(false);
          }, 4000);
        }
      }
    },
    [fetcher.data]
  );

  const cancelProgress = () => {
    localStorage.removeItem("siscoProgress");
    setOpenModal(false);
  };

  const restoreProgress = () => {
    const progress = localStorage.getItem("siscoProgress");
    if (progress) {
      const parsed = JSON.parse(progress);
      setSectionIndex(Number(parsed.sectionIndex));
      setQuestionIndex(Number(parsed.questionIndex));
      setGlobalIndex(Number(parsed.globalIndex));
      setAnswers(parsed.answers as StoredAnswer[]);
      setShowInstructions(Boolean(parsed.showInstructions));
      setOpenModal(false);
      localStorage.removeItem("siscoProgress");
    }
  };

  const sections = loaderData.sections;

  const currentSection = sections[sectionIndex];
  const currentQuestion = currentSection.preguntas[questionIndex];
  const TOTAL_QUESTIONS = 29;

  /**
   * Saves an answer and advances to next question/section
   * @author Gabriel
   */
  const saveAnswer = () => {
    // Store answer
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
        // Test has ended
        localStorage.setItem("testType", "SISCO");
        const totalSum = calculatePointsSISCO(newAnswers);
        localStorage.setItem("scoreStress", String(totalSum));

        // Save in database
        if (loaderData.userId) {
          const percentage = Math.round((totalSum / 116) * 100);
          fetcher.submit(
            {
              userId: loaderData.userId,
              idStress: currentQuestion.idIndicador,
              scoreStress: percentage,
            },
            { method: "post", action: "/cuestionario-sisco" }
          );
        } else {
          navigate("/cuestionario-completado");
        }
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

    // Save progress
    localStorage.setItem(
      "siscoProgress",
      JSON.stringify({
        sectionIndex: newSectionIndex,
        questionIndex: newQuestionIndex,
        globalIndex: newGlobalIndex,
        answers: newAnswers,
        showInstructions: newShowInstructions,
      })
    );
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
          {fetcher.state === "idle" && (
            <PrimaryButton
              label="Continuar"
              onClick={saveAnswer}
              disabled={selectedOption === null}
              icon={<ArrowRight className="w-6" />}
            />
          )}
          {fetcher.state !== "idle" && (
            <div className="flex w-full justify-center">
              <Spinner color="failure" />
            </div>
          )}

          <ProgressBar
            progress={(globalIndex * 100) / TOTAL_QUESTIONS}
          ></ProgressBar>
        </div>
        <ModalAlert
          type="error"
          isOpen={isOpenAlert}
          onClose={() => setIsOpenAlert(false)}
          message={alertMessage}
        />
      </main>
    </>
  );
}
