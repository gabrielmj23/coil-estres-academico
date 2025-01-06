import {
  check,
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
  varchar,
} from "drizzle-orm/pg-core";
import { cuestionarios } from "./cuestionarios";
import { sql } from "drizzle-orm";

export const secciones = pgTable(
  "secciones",
  {
    idCuestionario: integer("id_cuestionario")
      .notNull()
      .references(() => cuestionarios.id),
    id: serial("id").notNull(),
    instruccion: varchar("instruccion", { length: 250 }).notNull(),
    posicion: integer("posicion").notNull(),
    imagen: text("imagen").notNull(),
  },
  (table) => [
    {
      pk: primaryKey({ columns: [table.idCuestionario, table.id] }),
    },
    {
      checkConstraint: check(
        "seccion_posicion_check",
        sql`${table.posicion} > 0`
      ),
    },
  ]
);
