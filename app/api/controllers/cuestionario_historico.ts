import { eq } from "drizzle-orm";
import db from "../db"
import { cuestionario_historico } from "../tables/cuestionario_historico"
import { resultados } from "../tables/Resultados";
import { cuestionarios } from "../tables/cuestionarios";
import { indicadores } from "../tables/indicadores";

export const getResultadosCuestionario = async (idUsuario: number) => {
    try {
        //Obtener los cuestionarios históricos del usuario
        const cuestionariosHistoricos = await db
        .select()
        .from(cuestionario_historico)
        .where(eq(cuestionario_historico.idUsuario, idUsuario));

        const resultadosFinales: (SiscoHistoryItem | GoldbergHistoryItem)[] = [];

        for (const cuestionarioHistorico of cuestionariosHistoricos) {
            // Obtener los resultados del cuestionario histórico
            const resultadosList = await db
                .select()
                .from(resultados)
                .where(eq(resultados.idCuestionarioHistorico, cuestionarioHistorico.IdCuestionarioHistorico));
            
            // Obtener información del cuestionario
            
                const cuestionarioInfo = await db
                .select()
                .from(cuestionarios)
                .where(eq(cuestionarios.id, cuestionarioHistorico.idCuestionario!))
                .limit(1);

            // Obtener nombres de los indicadores
            const indicadoresList = await db
            .select()
            .from(indicadores)
            
            // Formatear la respuesta
            let response: SiscoHistoryItem | GoldbergHistoryItem;
            if (cuestionarioInfo[0].nombre === "Estrés Académico") {
                response = {
                id: cuestionarioHistorico.IdCuestionarioHistorico,
                questionnaireId: cuestionarioInfo[0].id,
                questionnaireName: cuestionarioInfo[0].nombre,
                date: cuestionarioHistorico.fecha,
                scoreStress: resultadosList.find(r => r.idIndicador === indicadoresList.find(i => i.nombre === "Estrés Academico")?.id)?.resultado || 0,
                } as SiscoHistoryItem;
            } else if (cuestionarioInfo[0].nombre === "Salud Mental") {
                response = {
                id: cuestionarioHistorico.IdCuestionarioHistorico,
                questionnaireId: cuestionarioInfo[0].id,
                questionnaireName: cuestionarioInfo[0].nombre,
                date: cuestionarioHistorico.fecha,
                scoreAnxiety: resultadosList.find(r => r.idIndicador === indicadoresList.find(i => i.nombre === "Ansiedad/Depresión")?.id)?.resultado || 0,
                scoreSocial: resultadosList.find(r => r.idIndicador === indicadoresList.find(i => i.nombre === "Disfunción Social")?.id)?.resultado || 0,
                } as GoldbergHistoryItem;
            } else {
                throw new Error("Tipo de cuestionario desconocido");
            }

            resultadosFinales.push(response);

            }
            console.log(resultadosFinales)
            return resultadosFinales;

    } catch (error) {
        console.error("Error al obtener los resultados del cuestionario:", error);
        throw new Error("Error al obtener los resultados del cuestionario.");
    }
}