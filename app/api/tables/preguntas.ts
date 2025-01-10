import {
  pgTable,
  serial,
  integer,
  primaryKey,
  varchar,
  foreignKey,
  check,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { cuestionarios } from "./cuestionarios";
import { indicadores } from "./indicadores";
import { secciones } from "./secciones";

export const preguntas = pgTable(
  "preguntas",
  {
    idCuestionario: integer("id_cuestionario")
      .notNull()
      .references(() => cuestionarios.id),
    idSeccion: integer("id_seccion").notNull(),
    id: serial("id").notNull(), // Not auto-incrementing since part of composite key
    contenido: varchar("contenido", { length: 160 }).notNull(),
    posicion: integer("posicion").notNull(),
    idIndicador: integer("id_indicador").references(() => indicadores.id),
  },
  (table) => [
    {
      // Composite primary key
      pk: primaryKey({
        columns: [table.idCuestionario, table.idSeccion, table.id],
      }),
      seccionForeignKey: foreignKey({
        columns: [table.idCuestionario, table.idSeccion],
        foreignColumns: [secciones.idCuestionario, secciones.id],
        name: "seccion_fk",
      }),
      checkConstraint: check(
        "pregunta_posicion_check",
        sql`${table.posicion} > 0`
      ),
    },
  ]
);
