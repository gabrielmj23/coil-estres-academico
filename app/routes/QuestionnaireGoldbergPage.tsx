import type { Route } from "./+types/QuestionnaireGoldbergPage";
import { SurveyOption } from "~/components/SurveyOption/SurveyOption";
import PrimaryButton from "~/components/PrimaryButton/PrimaryButton";
import { useEffect, useState } from "react";
import ArrowRight from "~/icons/ArrowRight";
import { getPreguntasGoldBerg } from "~/api/controllers/preguntas";
import { calculatePointsGoldberg } from "~/api/utils/utils";
import SectionPage from "~/components/SectionPage/SectionPage";
import ProgressBar from "../components/ProgressBar/ProgressBar";
import { useFetcher, useNavigate } from "react-router";
import RestoreProgressModal from "~/components/RestoreProgressModal/RestoreProgressModal";
import { getSession } from "~/sessions.server";
import ModalAlert from "~/components/ModalAlert/ModalAlert";
import { Spinner } from "flowbite-react";
import { saveHistoryGoldberg } from "~/api/controllers/cuestionario_historico";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Cuestionario Salud Mental" },
    {
      name: "description",
      content: "Responde al cuestionario de Salud Mental.",
    },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const userId = session.get("userId");
  const sections = await getPreguntasGoldBerg();
  return { sections, userId };
}

export async function action({ request }: Route.ActionArgs) {
  // Parse form data
  const formData = await request.formData();
  const userId = formData.get("userId");
  const idAnxiety = formData.get("idAnxiety");
  const idSocial = formData.get("idSocial");
  const scoreAnxiety = formData.get("scoreAnxiety");
  const scoreSocial = formData.get("scoreSocial");
  if (!userId || !idAnxiety || !idSocial || !scoreAnxiety || !scoreSocial) {
    return { redirect: "/seleccion-de-prueba" };
  }

  return saveHistoryGoldberg(
    Number(userId),
    Number(idAnxiety),
    Number(idSocial),
    Number(scoreAnxiety),
    Number(scoreSocial)
  );
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

  // Save history
  const fetcher = useFetcher<{ success: boolean; message: string }>();

  // Modal
  const [openModal, setOpenModal] = useState(false);

  // Alert
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(function checkLocalProgress() {
    const storedGoldberg = localStorage.getItem("goldbergProgress");
    if (storedGoldberg) {
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
    localStorage.removeItem("goldbergProgress");
    setOpenModal(false);
  };

  const restoreProgress = () => {
    const progress = localStorage.getItem("goldbergProgress");
    if (progress) {
      const parsed = JSON.parse(progress);
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
        const results = calculatePointsGoldberg(newAnswers);
        localStorage.setItem("testType", "Goldberg");
        localStorage.setItem(
          "scoreAnxiety",
          String(results["Ansiedad/Depresión"])
        );
        localStorage.setItem(
          "scoreSocial",
          String(results["Disfunción Social"])
        );

        // Save history in db
        if (loaderData.userId) {
          const anxietyId = currentSection.preguntas.find(
            (p) => p.nombreIndicador === "Ansiedad/Depresión"
          )?.idIndicador!;
          const socialId = currentSection.preguntas.find(
            (p) => p.nombreIndicador === "Disfunción Social"
          )?.idIndicador!;

          fetcher.submit(
            {
              userId: loaderData.userId,
              idAnxiety: anxietyId,
              idSocial: socialId,
              scoreAnxiety: results["Ansiedad/Depresión"],
              scoreSocial: results["Disfunción Social"],
            },
            { method: "post", action: "/cuestionario-goldberg" }
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
