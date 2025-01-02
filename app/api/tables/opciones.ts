import {
  pgTable,
  serial,
  varchar,
  integer,
  primaryKey,
} from "drizzle-orm/pg-core";
import db from "../db";
import { eq } from "drizzle-orm";
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

// Inicializador de opciones para el cuestionario "Goldberg"
export const initOpcionesGoldberg = async () => {
     // Verificar si ya hay registros en la tabla de preguntas
     const opcionesExistentes = await db.select().from(opciones).where(eq(opciones.idCuestionario, 2));

     if (opcionesExistentes.length > 0) {
       console.log("Las opciones ya han sido inicializadas.");
       return;  // No hacer nada si ya existen registros
     }

     // Verificar si ya hay registros en la tabla de preguntas
     const preguntasExistentes = await db.select().from(opciones).where(eq(opciones.idCuestionario, 2));

     if (preguntasExistentes.length > 0) {
       console.log("No se encontraron preguntas para asociar.");
       return;  // No hacer nada si ya existen registros
     }

  // Reiniciar la secuencia del ID para que comience desde 1
  await db.execute(`ALTER SEQUENCE opciones_id_seq RESTART WITH 1`);

  const opcionesPorPregunta = [
    { idPregunta: 1, opciones: [
        { contenido: "Mejor que lo habitual", puntaje: 4, posicion: 1 },
        { contenido: "Igual que lo habitual", puntaje: 3, posicion: 2 },
        { contenido: "Menos que lo habitual", puntaje: 2, posicion: 3 },
        { contenido: "Mucho menos que lo habitual", puntaje: 1, posicion: 4 },
      ]
    },
    { idPregunta: 2, opciones: [
        { contenido: "No, en absoluto", puntaje: 4, posicion: 1 },
        { contenido: "No más que lo habitual", puntaje: 3, posicion: 2 },
        { contenido: "Bastante más que lo habitual", puntaje: 2, posicion: 3 },
        { contenido: "Mucho más", puntaje: 1, posicion: 4 },
      ]
    },
    { idPregunta: 3, opciones: [
        { contenido: "Más que lo habitual", puntaje: 4, posicion: 1 },
        { contenido: "Igual que lo habitual", puntaje: 3, posicion: 2 },
        { contenido: "Menos útil que lo habitual", puntaje: 2, posicion: 3 },
        { contenido: "Mucho menos", puntaje: 1, posicion: 4 },
      ]
    },
    { idPregunta: 4, opciones: [
        { contenido: "Más capaz que lo habitual", puntaje: 4, posicion: 1 },
        { contenido: "Igual que lo habitual", puntaje: 3, posicion: 2 },
        { contenido: "Menos capaz que lo habitual", puntaje: 2, posicion: 3 },
        { contenido: "Mucho menos", puntaje: 1, posicion: 4 },
      ]
    },
    { idPregunta: 5, opciones: [
        { contenido: "No, en absoluto", puntaje: 4, posicion: 1 },
        { contenido: "No más que lo habitual", puntaje: 3, posicion: 2 },
        { contenido: "Bastante más que lo habitual", puntaje: 2, posicion: 3 },
        { contenido: "Mucho más", puntaje: 1, posicion: 4 },
      ]
    },
    { idPregunta: 6, opciones: [
        { contenido: "No, en absoluto", puntaje: 4, posicion: 1 },
        { contenido: "No más que lo habitual", puntaje: 3, posicion: 2 },
        { contenido: "Bastante más que lo habitual", puntaje: 2, posicion: 3 },
        { contenido: "Mucho más", puntaje: 1, posicion: 4 },
      ]
    },
    { idPregunta: 7, opciones: [
        { contenido: "Más que lo habitual", puntaje: 4, posicion: 1 },
        { contenido: "Igual que lo habitual", puntaje: 3, posicion: 2 },
        { contenido: "Menos que lo habitual", puntaje: 2, posicion: 3 },
        { contenido: "Mucho menos", puntaje: 1, posicion: 4 },
      ]
    },
    { idPregunta: 8, opciones: [
        { contenido: "Más capaz que lo habitual", puntaje: 4, posicion: 1 },
        { contenido: "Igual que lo habitual", puntaje: 3, posicion: 2 },
        { contenido: "Menos capaz que lo habitual", puntaje: 2, posicion: 3 },
        { contenido: "Mucho menos", puntaje: 1, posicion: 4 },
      ]
    },
    { idPregunta: 9, opciones: [
        { contenido: "No, en absoluto", puntaje: 4, posicion: 1 },
        { contenido: "No más que lo habitual", puntaje: 3, posicion: 2 },
        { contenido: "Bastante más que lo habitual", puntaje: 2, posicion: 3 },
        { contenido: "Mucho más", puntaje: 1, posicion: 4 },
      ]
    },
    { idPregunta: 10, opciones: [
        { contenido: "No, en absoluto", puntaje: 4, posicion: 1 },
        { contenido: "No más que lo habitual", puntaje: 3, posicion: 2 },
        { contenido: "Bastante más que lo habitual", puntaje: 2, posicion: 3 },
        { contenido: "Mucho Más", puntaje: 1, posicion: 4 },
      ]
    },
    { idPregunta: 11, opciones: [
        { contenido: "No, en absoluto", puntaje: 4, posicion: 1 },
        { contenido: "No más que lo habitual", puntaje: 3, posicion: 2 },
        { contenido: "Bastante más que lo habitual", puntaje: 2, posicion: 3 },
        { contenido: "Mucho más", puntaje: 1, posicion: 4 },
      ]
    },
    { idPregunta: 12, opciones: [
        { contenido: "Más feliz que lo habitual", puntaje: 4, posicion: 1 },
        { contenido: "Aproximadamente lo mismo que lo habitual", puntaje: 3, posicion: 2 },
        { contenido: "Menos feliz que lo habitual", puntaje: 2, posicion: 3 },
        { contenido: "Mucho menos que lo habitual", puntaje: 1, posicion: 4 },
      ]
    }
  ];
  
  try {
        // Obtener IDs de los cuestionarios e indicadores relacionados
        const goldberg = await db
        .select({ id: cuestionarios.id })
        .from(cuestionarios)
        .where(eq(cuestionarios.nombre, "Goldberg"))
        .limit(1);
  
      if (!goldberg.length) {
        console.error("Faltan datos iniciales (Goldberg).");
        return;
      }
  
    const idCuestionarioGoldberg = goldberg[0].id;

    // Insertar las opciones para cada pregunta
    for (const { idPregunta, opciones: opcionesDePregunta } of opcionesPorPregunta) {
      for (const opcion of opcionesDePregunta) {
        await db
          .insert(opciones)
          .values({
            idCuestionario: idCuestionarioGoldberg,  // Usando el idCuestionario de "Goldberg" de antes
            idPregunta: idPregunta,
            contenido: opcion.contenido,
            puntaje: opcion.puntaje,
            posicion: opcion.posicion,
          })
          .onConflictDoNothing(); // Evita insertar duplicados
      }
    }
  } catch (error) {
    console.error("Error al inicializar opciones para el cuestionario Goldberg:", error);
  }
};

// Inicializador de opciones para el cuestionario "SISCO"
export const initOpcionesSISCO = async () => {
  // Verificar si ya hay registros en la tabla de opciones para SISCO
  const opcionesExistentes = await db
    .select()
    .from(opciones)
    .where(eq(opciones.idCuestionario, 1));  // Suponiendo que "SISCO" tiene id 3

  if (opcionesExistentes.length > 0) {
    console.log("Las opciones ya han sido inicializadas para SISCO.");
    return;  // No hacer nada si ya existen registros
  }

       // Verificar si ya hay registros en la tabla de preguntas
       const preguntasExistentes = await db.select().from(opciones).where(eq(opciones.idCuestionario, 1));

       if (preguntasExistentes.length > 0) {
         console.log("No se encontraron preguntas para asociar.");
         return;  // No hacer nada si ya existen registros
       }

  // Reiniciar la secuencia del ID para que comience desde 1
  await db.execute(`ALTER SEQUENCE opciones_id_seq RESTART WITH 1`);

  // Opciones comunes para las preguntas de SISCO
  const opcionesComunes = [
    { contenido: "Nunca", puntaje: 1, posicion: 1 },
    { contenido: "Rara vez", puntaje: 2, posicion: 2 },
    { contenido: "Algunas veces", puntaje: 3, posicion: 3 },
    { contenido: "Casi siempre", puntaje: 4, posicion: 4 },
    { contenido: "Siempre", puntaje: 5, posicion: 5 },
  ];

  try {
    // Obtener ID del cuestionario "SISCO"
    const sisco = await db
      .select({ id: cuestionarios.id })
      .from(cuestionarios)
      .where(eq(cuestionarios.nombre, "SISCO"))
      .limit(1);

    if (!sisco.length) {
      console.error("Faltan datos iniciales (SISCO).");
      return;
    }

    const idCuestionarioSISCO = sisco[0].id;

    // Insertar las opciones para cada pregunta de SISCO (preguntas de 13 a 29)
    for (let idPregunta = 13; idPregunta <= 29; idPregunta++) {
      for (const opcion of opcionesComunes) {
        await db
          .insert(opciones)
          .values({
            idCuestionario: idCuestionarioSISCO,  // Usando el idCuestionario de "SISCO"
            idPregunta: idPregunta,
            contenido: opcion.contenido,
            puntaje: opcion.puntaje,
            posicion: opcion.posicion,
          })
          .onConflictDoNothing(); // Evita insertar duplicados
      }
    }

    console.log("Opciones para el cuestionario SISCO han sido inicializadas.");
  } catch (error) {
    console.error("Error al inicializar opciones para el cuestionario SISCO:", error);
  }
};


