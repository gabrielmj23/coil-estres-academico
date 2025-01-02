import { eq } from "drizzle-orm";
import db from "../db";
import { opciones } from "../tables/opciones";
import { data } from "react-router";

/**
 * Gets question options from a questionnaire
 * @param id Questionnaire ID
 * @author Karim
 * @author Gabriel
 */
export const getOpcionesPorCuestionario = async (id: number) => {
  try {
    // Realizar la consulta para obtener las opciones asociadas al cuestionario con el ID proporcionado
    const opcionesList = await db
      .select()
      .from(opciones)
      .where(eq(opciones.idCuestionario, id)) // Filtrar las opciones por el idCuestionario
      .orderBy(opciones.posicion); // Ordenar las opciones por la posición (si es necesario)

    // Responder con las opciones encontradas
    return data({ options: opcionesList }, { status: 200 });
  } catch (error) {
    // En caso de error, responder con un mensaje de error
    console.error("Error al obtener las opciones del cuestionario:", error);
    throw data(
      { message: "Error al obtener las opciones del cuestionario." },
      { status: 500 }
    );
  }
};
