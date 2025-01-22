import { desc, eq } from "drizzle-orm";
import db from "../db";
import { cuestionario_historico } from "../tables/cuestionario_historico";
import { resultados } from "../tables/resultados";
import { cuestionarios } from "../tables/cuestionarios";
import { indicadores } from "../tables/indicadores";
import { data } from "react-router";

/**
 * Obtiene los resultados de un cuestionario
 * @param idUsuario
 * @author Andres
 */
export const getResultadosCuestionario = async (idUsuario: number) => {
  try {
    //Obtener los cuestionarios históricos del usuario
    const cuestionariosHistoricos = await db
      .select()
      .from(cuestionario_historico)
      .where(eq(cuestionario_historico.idUsuario, idUsuario))
      .orderBy(desc(cuestionario_historico.id));

    const resultadosFinales: (SiscoHistoryItem | GoldbergHistoryItem)[] = [];

    for (const cuestionarioHistorico of cuestionariosHistoricos) {
      // Obtener los resultados del cuestionario histórico
      const resultadosList = await db
        .select()
        .from(resultados)
        .where(
          eq(resultados.idCuestionarioHistorico, cuestionarioHistorico.id)
        );

      // Obtener información del cuestionario
      const cuestionarioInfo = await db
        .select()
        .from(cuestionarios)
        .where(eq(cuestionarios.id, cuestionarioHistorico.idCuestionario!))
        .limit(1);

      // Obtener nombres de los indicadores
      const indicadoresList = await db.select().from(indicadores);

      // Formatear la respuesta
      let response: SiscoHistoryItem | GoldbergHistoryItem;
      if (cuestionarioInfo[0].nombre === "Estrés Académico") {
        response = {
          id: cuestionarioHistorico.id,
          questionnaireId: cuestionarioInfo[0].id,
          questionnaireName: cuestionarioInfo[0].nombre,
          date: cuestionarioHistorico.fecha,
          scoreStress:
            resultadosList.find(
              (r) =>
                r.idIndicador ===
                indicadoresList.find((i) => i.nombre === "Estrés Academico")?.id
            )?.resultado || 0,
        } as SiscoHistoryItem;
      } else if (cuestionarioInfo[0].nombre === "Salud Mental") {
        response = {
          id: cuestionarioHistorico.id,
          questionnaireId: cuestionarioInfo[0].id,
          questionnaireName: cuestionarioInfo[0].nombre,
          date: cuestionarioHistorico.fecha,
          scoreAnxiety:
            resultadosList.find(
              (r) =>
                r.idIndicador ===
                indicadoresList.find((i) => i.nombre === "Ansiedad/Depresión")
                  ?.id
            )?.resultado || 0,
          scoreSocial:
            resultadosList.find(
              (r) =>
                r.idIndicador ===
                indicadoresList.find((i) => i.nombre === "Disfunción Social")
                  ?.id
            )?.resultado || 0,
        } as GoldbergHistoryItem;
      } else {
        throw new Error("Tipo de cuestionario desconocido");
      }

      resultadosFinales.push(response);
    }
    return { resultados: resultadosFinales };
  } catch (error) {
    console.error("Error al obtener los resultados del cuestionario:", error);
    throw new Error("Error al obtener los resultados del cuestionario.");
  }
};

/**
 * Guarda el historial de una prueba SISCO
 * @param idUsuario
 * @param idStress
 * @param scoreStress
 * @author Gabriel
 */
export const saveHistorySISCO = async (
  idUsuario: number,
  idStress: number,
  scoreStress: number
) => {
  try {
    const idSISCO = await db
      .select({ id: cuestionarios.id })
      .from(cuestionarios)
      .where(eq(cuestionarios.nombre, "Estrés Académico"))
      .limit(1);

    // Guardar el historial del cuestionario
    await db.transaction(async (tx) => {
      const cuestionarioHistoricoId = await tx
        .insert(cuestionario_historico)
        .values([
          {
            idUsuario,
            idCuestionario: idSISCO[0].id,
          },
        ])
        .returning({ id: cuestionario_historico.id });

      await tx.insert(resultados).values([
        {
          idCuestionarioHistorico: cuestionarioHistoricoId[0].id,
          idIndicador: idStress,
          resultado: Number(scoreStress),
        },
      ]);
    });

    return data(
      { success: true, message: "Historial guardado correctamente" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error al guardar el historial del cuestionario:", error);
    return data(
      {
        success: false,
        message: "Error al guardar el historial del cuestionario",
      },
      { status: 500 }
    );
  }
};

/**
 * Guarda el historial de una prueba Goldberg
 * @param idUsuario
 * @param idAnxiety
 * @param idSocial
 * @param scoreAnxiety
 * @param scoreSocial
 * @author Gabriel
 */
export const saveHistoryGoldberg = async (
  idUsuario: number,
  idAnxiety: number,
  idSocial: number,
  scoreAnxiety: number,
  scoreSocial: number
) => {
  try {
    const idGoldberg = await db
      .select({ id: cuestionarios.id })
      .from(cuestionarios)
      .where(eq(cuestionarios.nombre, "Salud Mental"))
      .limit(1);

    // Guardar el historial del cuestionario
    await db.transaction(async (tx) => {
      const cuestionarioHistoricoId = await tx
        .insert(cuestionario_historico)
        .values([
          {
            idUsuario,
            idCuestionario: idGoldberg[0].id,
          },
        ])
        .returning({ id: cuestionario_historico.id });

      await tx.insert(resultados).values([
        {
          idCuestionarioHistorico: cuestionarioHistoricoId[0].id,
          idIndicador: idAnxiety,
          resultado: Number(scoreAnxiety),
        },
        {
          idCuestionarioHistorico: cuestionarioHistoricoId[0].id,
          idIndicador: idSocial,
          resultado: Number(scoreSocial),
        },
      ]);
    });

    return data(
      { success: true, message: "Historial guardado correctamente" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error al guardar el historial del cuestionario:", error);
    return data(
      {
        success: false,
        message: "Error al guardar el historial del cuestionario",
      },
      { status: 500 }
    );
  }
};
