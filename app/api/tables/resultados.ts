import { integer, pgTable, primaryKey } from "drizzle-orm/pg-core";
import { cuestionario_historico } from "./cuestionario_historico";
import { indicadores } from "./indicadores";

/**
 * Table `resultados`.
 * Saves the results of the indicators of the questionnaires that the user has completed.
 */
export const resultados = pgTable(
  "resultados",
  {
    idCuestionarioHistorico: integer()
      .notNull()
      .references(() => cuestionario_historico.id),
    idIndicador: integer()
      .notNull()
      .references(() => indicadores.id),
    resultado: integer().notNull(),
  },
  (table) => [
    {
      pk: primaryKey({
        columns: [table.idCuestionarioHistorico, table.idIndicador],
      }),
    },
  ]
);
