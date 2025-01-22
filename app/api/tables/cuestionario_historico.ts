import { date, integer, pgTable, serial } from "drizzle-orm/pg-core";
import { cuestionarios } from "./cuestionarios";
import { usuarios } from "./usuarios";

/**
 * Table `cuestionario_historico`.
 * Saves the history of the questionnaires that the user has completed.
 */
export const cuestionario_historico = pgTable("cuestionario_historico", {
  id: serial("id").primaryKey(),
  fecha: date("fecha").notNull().defaultNow(),
  idCuestionario: integer("idCuestionario")
    .notNull()
    .references(() => cuestionarios.id),
  idUsuario: integer("idUsuario")
    .notNull()
    .references(() => usuarios.id),
});
