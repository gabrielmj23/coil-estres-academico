import {
  pgTable,
  serial,
  text,
  integer,
  primaryKey,
  varchar,
} from "drizzle-orm/pg-core";
import { cuestionarios } from "./cuestionarios";
import { indicadores } from "./indicadores";

export const preguntas = pgTable(
  "preguntas",
  {
    id: serial("id").notNull().unique(), // Not auto-incrementing since part of composite key
    idCuestionario: integer("id_cuestionario")
      .notNull()
      .references(() => cuestionarios.id),
    contenido: varchar("contenido", { length: 120 }).notNull(),
    posicion: integer("posicion").notNull(),
    idIndicador: integer("id_indicador").references(() => indicadores.id),
  },
  (table) => ({
    compositePk: primaryKey(table.id, table.idCuestionario), // Composite primary key
  })
);
