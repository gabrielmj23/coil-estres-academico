/**
 * Option returned from backend
 */
type OpcionesReturn = {
  idOpcion: number;
  contenido: string;
  posicion: number;
  puntaje: number;
};

/**
 * Question returned from backend
 */
type PreguntasReturn = {
  idPregunta: number;
  idIndicador: number;
  nombreIndicador: string;
  contenido: string;
  posicion: number;
  opciones: OpcionesReturn[];
};

/**
 * Section returned from backend
 */
type SeccionesReturn = {
  idSeccion: number;
  instruccion: string;
  imagen: string;
  posicion: number;
  preguntas: PreguntasReturn[];
};

/**
 * Answer stored in state when responding questionnaire
 */
type StoredAnswer = {
  sectionId: number;
  questionId: number;
  optionId: number;
  indicatorId: number;
  indicatorName: string;
  points: number;
};

/**
 * Questionnaire history item from backend
 */
interface HistoryItem {
  id: number;
  questionnaireId: number;
  questionnaireName: string;
  date: string;
}

interface SiscoHistoryItem extends HistoryItem {
  scoreStress: number;
}

interface GoldbergHistoryItem extends HistoryItem {
  scoreAnxiety: number;
  scoreSocial: number;
}
