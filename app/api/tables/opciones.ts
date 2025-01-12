import {
  pgTable,
  serial,
  varchar,
  integer,
  primaryKey,
  foreignKey,
  check,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { preguntas } from "./preguntas";
import { cuestionarios } from "./cuestionarios";
import { secciones } from "./secciones";

export const opciones = pgTable(
  "opciones",
  {
    idCuestionario: integer("id_cuestionario")
      .notNull()
      .references(() => cuestionarios.id),
    idSeccion: integer("id_seccion").notNull(),
    idPregunta: integer("id_pregunta").notNull(),
    id: serial("id").notNull(),
    contenido: varchar("contenido", { length: 50 }).notNull(),
    puntaje: integer("puntaje").notNull(),
    posicion: integer("posicion").notNull(),
  },
  (table) => [
    {
      // Clave primaria compuesta
      pk: primaryKey({
        columns: [
          table.idCuestionario,
          table.idSeccion,
          table.idPregunta,
          table.id,
        ],
      }),
      seccionForeignKey: foreignKey({
        columns: [table.idCuestionario, table.idSeccion],
        foreignColumns: [secciones.idCuestionario, secciones.id],
        name: "seccion_fk",
      }),
      preguntaForeignKey: foreignKey({
        columns: [table.idCuestionario, table.idSeccion, table.idPregunta],
        foreignColumns: [
          preguntas.idCuestionario,
          preguntas.idSeccion,
          preguntas.id,
        ],
        name: "pregunta_fk",
      }),
      posicionCheck: check("opcion_posicion_check", sql`${table.posicion} > 0`),
    },
  ]
);
