import { data } from "react-router";
import db from "../db";
import { preguntas } from "../tables/preguntas";
import { and, asc, eq } from "drizzle-orm";
import { opciones } from "../tables/opciones";
import { secciones } from "../tables/secciones";
import { cuestionarios } from "../tables/cuestionarios";

/**
 * Get full list of questions, with their options, from a questionnaire
 * @param id Questionnaire ID
 * @author Karim
 * @author Gabriel
 */
export const getPreguntasPorCuestionario = async (id: number) => {
  try {
    const seccionesList = await db
      .select({
        idCuestionario: secciones.idCuestionario,
        idSeccion: secciones.id,
        idPregunta: preguntas.id,
        idOpcion: opciones.id,
        instruccionSeccion: secciones.instruccion,
        imagenSeccion: secciones.imagen,
        contenidoPregunta: preguntas.contenido,
        indicadorPregunta: preguntas.idIndicador,
        contenidoOpcion: opciones.contenido,
        puntajeOpcion: opciones.puntaje,
        posicionSeccion: secciones.posicion,
        posicionPregunta: preguntas.posicion,
        posicionOpcion: opciones.posicion,
      })
      .from(secciones)
      .innerJoin(
        preguntas,
        and(
          eq(secciones.idCuestionario, preguntas.idCuestionario),
          eq(secciones.id, preguntas.idSeccion)
        )
      )
      .innerJoin(
        opciones,
        and(
          eq(preguntas.idCuestionario, opciones.idCuestionario),
          eq(preguntas.idSeccion, opciones.idSeccion),
          eq(preguntas.id, opciones.idPregunta)
        )
      )
      .where(eq(secciones.idCuestionario, id))
      .orderBy(
        asc(secciones.posicion),
        asc(preguntas.posicion),
        asc(opciones.posicion)
      );

    // Group questions by section, and options by question
    const parsedSections: SeccionesReturn[] = [];

    for (const seccion of seccionesList) {
      // Check if seccion is already in parsedSections
      const seccionIndex = parsedSections.findIndex(
        (sec) => sec.idSeccion === seccion.idSeccion
      );
      if (seccionIndex === -1) {
        parsedSections.push({
          idSeccion: seccion.idSeccion,
          imagen: seccion.imagenSeccion,
          instruccion: seccion.instruccionSeccion,
          posicion: seccion.posicionSeccion,
          preguntas: [
            {
              idPregunta: seccion.idPregunta,
              idIndicador: seccion.indicadorPregunta || 0,
              contenido: seccion.contenidoPregunta,
              posicion: seccion.posicionPregunta,
              opciones: [
                {
                  idOpcion: seccion.idOpcion,
                  contenido: seccion.contenidoOpcion,
                  posicion: seccion.posicionOpcion,
                  puntaje: seccion.puntajeOpcion,
                },
              ],
            },
          ],
        });
      } else {
        // Check if question is already in this section
        const preguntaIndex = parsedSections[seccionIndex].preguntas.findIndex(
          (preg) => preg.idPregunta === seccion.idPregunta
        );
        if (preguntaIndex === -1) {
          parsedSections[seccionIndex].preguntas.push({
            idPregunta: seccion.idPregunta,
            idIndicador: seccion.indicadorPregunta || 0,
            contenido: seccion.contenidoPregunta,
            posicion: seccion.posicionPregunta,
            opciones: [
              {
                idOpcion: seccion.idOpcion,
                contenido: seccion.contenidoOpcion,
                posicion: seccion.posicionOpcion,
                puntaje: seccion.puntajeOpcion,
              },
            ],
          });
        } else {
          parsedSections[seccionIndex].preguntas[preguntaIndex].opciones.push({
            idOpcion: seccion.idOpcion,
            contenido: seccion.contenidoOpcion,
            posicion: seccion.posicionOpcion,
            puntaje: seccion.puntajeOpcion,
          });
        }
      }
    }

    // Responder con las preguntas encontradas
    return data({ sections: parsedSections }, { status: 200 });
  } catch (error) {
    // En caso de error, responder con un mensaje de error
    console.error("Error al obtener las preguntas del cuestionario:", error);
    throw data(
      { message: "Error al obtener las preguntas del cuestionario." },
      { status: 500 }
    );
  }
};

/**
 * Get questions from SISCO questionnaire
 * @author Gabriel
 */
export const getPreguntasSISCO = async () => {
  try {
    const siscoId = await db
      .select({ id: cuestionarios.id })
      .from(cuestionarios)
      .where(eq(cuestionarios.nombre, "SISCO"));
    return await getPreguntasPorCuestionario(siscoId[0].id);
  } catch (error) {
    // En caso de error, responder con un mensaje de error
    console.error("Error al obtener las preguntas del cuestionario:", error);
    throw data(
      { message: "Error al obtener las preguntas del cuestionario." },
      { status: 500 }
    );
  }
};
