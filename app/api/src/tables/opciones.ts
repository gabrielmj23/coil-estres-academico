import {
  pgTable,
  serial,
  varchar,
  integer,
  primaryKey,
} from "drizzle-orm/pg-core";
import { preguntas } from "./preguntas";
import { cuestionarios } from "./cuestionarios";

export const opciones = pgTable(
  "opciones",
  {
    id: serial("id").notNull(),
    idCuestionario: integer("id_cuestionario")
      .notNull()
      .references(() => cuestionarios.id),
    idPregunta: integer("id_pregunta")
      .notNull()
      .references(() => preguntas.id),
    contenido: varchar("contenido", { length: 50 }).notNull(),
    puntaje: integer("puntaje").notNull(),
    posicion: integer("posicion").notNull(),
  },
  (table) => ({
    compositePk: primaryKey(table.idCuestionario, table.idPregunta, table.id), // Clave primaria compuesta
  })
);
