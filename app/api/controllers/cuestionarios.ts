import { cuestionarios } from "../tables/cuestionarios";
import db from "../db";
import { data } from "react-router";

/**
 * Get full list of questionnaires
 * @author Karim
 * @author Gabriel
 */
export const getCuestionarios = async () => {
  try {
    // Realizar la consulta para obtener todos los cuestionarios
    const cuestionariosList = await db.select().from(cuestionarios);

    return data({ questionnaires: cuestionariosList }, { status: 200 });
  } catch (error) {
    // En caso de error, responder con un mensaje de error
    console.error("Error al obtener los cuestionarios:", error);
    throw data(
      { message: "Error al obtener los cuestionarios." },
      { status: 500 }
    );
  }
};
