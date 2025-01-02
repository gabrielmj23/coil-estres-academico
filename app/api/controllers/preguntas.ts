import { data } from "react-router";
import db from "../db";
import { preguntas } from "../tables/preguntas";
import { eq } from "drizzle-orm";

/**
 * Get full list of questions from a questionnaire
 * @param id Questionnaire ID
 * @author Karim
 * @author Gabriel
 */
export const getPreguntasPorCuestionario = async (id: number) => {
  try {
    // Realizar la consulta para obtener las preguntas asociadas al cuestionario con el ID proporcionado
    const preguntasList = await db
      .select()
      .from(preguntas)
      .where(eq(preguntas.idCuestionario, id)); // Asumiendo que el campo en la tabla de preguntas es 'id_cuestionario'

    // Responder con las preguntas encontradas
    return data({ questions: preguntasList }, { status: 200 });
  } catch (error) {
    // En caso de error, responder con un mensaje de error
    console.error("Error al obtener las preguntas del cuestionario:", error);
    throw data(
      { message: "Error al obtener las preguntas del cuestionario." },
      { status: 500 }
    );
  }
};
