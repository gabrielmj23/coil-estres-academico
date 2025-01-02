import {
  pgTable,
  serial,
  text,
  integer,
  primaryKey,
  varchar,
} from "drizzle-orm/pg-core";
import { eq } from "drizzle-orm"; 
import db from "../db";
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

// Inicializador de preguntas para el cuestionario "Goldberg"
export const initPreguntasGoldberg = async () => {

   // Verificar si ya hay registros en la tabla de preguntas
   const preguntasExistentes = await db.select().from(preguntas).where(eq(preguntas.idCuestionario, 2));

   if (preguntasExistentes.length > 0) {
     console.log("Las preguntas ya han sido inicializadas.");
     return;  // No hacer nada si ya existen registros
   }

  // Reiniciar la secuencia del ID para que comience desde 1
  await db.execute(`ALTER SEQUENCE preguntas_id_seq RESTART WITH 1`);

  try {
    // Obtener IDs de los cuestionarios e indicadores relacionados
    const goldberg = await db
      .select({ id: cuestionarios.id })
      .from(cuestionarios)
      .where(eq(cuestionarios.nombre, "Goldberg"))
      .limit(1);
    const ansDep = await db
      .select({ id: indicadores.id })
      .from(indicadores)
      .where(eq(indicadores.nombre, "Ansiedad/Depresión"))
      .limit(1);
    const disSocial = await db
      .select({ id: indicadores.id })
      .from(indicadores)
      .where(eq(indicadores.nombre, "Disfunción Social"))
      .limit(1);

    if (!goldberg.length || !ansDep.length || !disSocial.length) {
      console.error("Faltan datos iniciales (Goldberg, Ansiedad/Depresión o Disfunción Social).");
      return;
    }

    const idCuestionarioGoldberg = goldberg[0].id;
    const idAnsiedadDepresion = ansDep[0].id;
    const idDisfuncionSocial = disSocial[0].id;

    // Preguntas para el cuestionario "Goldberg"
    const preguntasGoldberg = [
      { contenido: "¿Ha podido concentrarse bien en lo que hace?", posicion: 1, idIndicador: idDisfuncionSocial },
      { contenido: "¿Sus preocupaciones le han hecho perder mucho sueño?", posicion: 2, idIndicador: idAnsiedadDepresion },
      { contenido: "¿Ha sentido que está jugando un papel útil en la vida?", posicion: 3, idIndicador: idDisfuncionSocial },
      { contenido: "¿Se ha sentido capaz de tomar decisiones?", posicion: 4, idIndicador: idDisfuncionSocial },
      { contenido: "¿Se ha sentido constantemente agobiado y en tensión?", posicion: 5, idIndicador: idAnsiedadDepresion },
      { contenido: "¿Ha sentido que no puede superar sus dificultades?", posicion: 6, idIndicador: idAnsiedadDepresion },
      { contenido: "¿Ha sido capaz de disfrutar sus actividades normales de cada día?", posicion: 7, idIndicador: idDisfuncionSocial },
      { contenido: "¿Ha sido capaz de hacer frente a sus problemas?", posicion: 8, idIndicador: idDisfuncionSocial },
      { contenido: "¿Se ha sentido un poco feliz y deprimido?", posicion: 9, idIndicador: idAnsiedadDepresion },
      { contenido: "¿Ha perdido confianza en sí mismo?", posicion: 10, idIndicador: idAnsiedadDepresion },
      { contenido: "¿Ha pensado que usted es una persona que no vale para nada?", posicion: 11, idIndicador: idAnsiedadDepresion },
      { contenido: "¿Se siente razonablemente feliz considerando todas las circunstancias?", posicion: 12, idIndicador: idDisfuncionSocial },
    ];

    // Insertar preguntas en la tabla
    for (const pregunta of preguntasGoldberg) {
      
// Verificar si el contenido de la pregunta ya existe
      const existePregunta = await db
        .select({ id: preguntas.id })
        .from(preguntas)
        .where(eq(preguntas.contenido, pregunta.contenido)) // Verifica si el contenido ya está en la tabla
        .limit(1);

      if (existePregunta.length === 0) {
        // Si no existe, insertar la nueva pregunta
        await db
          .insert(preguntas)
          .values({
            idCuestionario: idCuestionarioGoldberg,
            contenido: pregunta.contenido,
            posicion: pregunta.posicion,
            idIndicador: pregunta.idIndicador,
          });
      }
    }
  } catch (error) {
    console.error("Error al inicializar preguntas para el cuestionario Goldberg:", error);
  }
};

// Inicializar preguntas para el cuestionario "SISCO"
export const initPreguntasSISCO = async () => {

     // Verificar si ya hay registros en la tabla de preguntas
     const preguntasExistentes = await db.select().from(preguntas).where(eq(preguntas.idCuestionario, 1));

     if (preguntasExistentes.length > 0) {
       console.log("Las preguntas ya han sido inicializadas.");
       return;  // No hacer nada si ya existen registros
     }

  // Reiniciar la secuencia del ID para que comience desde 1
  await db.execute(`ALTER SEQUENCE preguntas_id_seq RESTART WITH 1`);

      // Preguntas para el cuestionario "SISCO"
      const preguntasSISCO = [
        { contenido: "La competencia con los compañeros del grupo", posicion: 1 },
        { contenido: "Sobrecarga de tareas y trabajos escolares", posicion: 2 },
        { contenido: "La personalidad y el carácter del profesor", posicion: 3 },
        { contenido: "Las evaluaciones de los profesores (exámenes, ensayos, trabajos de investigación, etc.)", posicion: 4 },
        { contenido: "El tipo de trabajo que te piden los profesores (consulta de temas, fichas de trabajo, ensayos, mapas conceptuales, etc.)", posicion: 5 },
        { contenido: "No entender los temas que se abordan en la clase", posicion: 6 },
        { contenido: "Participación en clase (responder a preguntas, exposiciones, etc.)", posicion: 7 },
        { contenido: "Tiempo limitado para hacer el trabajo", posicion: 8 },
        { contenido: "Trastornos en el sueño (insomnio o pesadillas)", posicion: 9 },
        { contenido: "Fatiga crónica (cansancio permanente)", posicion: 10 },
        { contenido: "Dolores de cabeza o migrañas", posicion: 11 },
        { contenido: "Problemas de digestión, dolor abdominal o diarrea", posicion: 12 },
        { contenido: "Rascarse, morderse las uñas, frotarse, etc.", posicion: 13 },
        { contenido: "Somnolencia o mayor necesidad de dormir", posicion: 14 },
        { contenido: "Inquietud (incapacidad de relajarse y estar tranquilo)", posicion: 15 },
        { contenido: "Sentimientos de depresión y tristeza (decaído)", posicion: 16 },
        { contenido: "Ansiedad, angustia o desesperación", posicion: 17 },
        { contenido: "Problemas de concentración", posicion: 18 },
        { contenido: "Sentimiento de agresividad o aumento de irritabilidad", posicion: 19 },
        { contenido: "Conflictos o tendencia a polemizar o discutir", posicion: 20 },
        { contenido: "Aislamiento de los demás", posicion: 21 },
        { contenido: "Desgano para realizar las labores escolares", posicion: 22 },
        { contenido: "Aumento o reducción del consumo de alimentos", posicion: 23 },
        { contenido: "Habilidad asertiva (defender nuestras preferencias ideas o sentimientos sin dañar a otros)", posicion: 24 },
        { contenido: "Elaboración de un plan y ejecución de sus tareas", posicion: 25 },
        { contenido: "Elogios a sí mismo", posicion: 26 },
        { contenido: "La religiosidad (oraciones o asistencia a misa)", posicion: 27 },
        { contenido: "Búsqueda de información sobre la situación", posicion: 28 },
        { contenido: "Ventilación y confidencias (verbalización de la situación que preocupa)", posicion: 29 },
      ]; 

  try {
    // Obtener IDs de los cuestionarios e indicadores relacionados
    const sisco = await db
      .select({ id: cuestionarios.id })
      .from(cuestionarios)
      .where(eq(cuestionarios.nombre, "SISCO"))
      .limit(1);
    const estresAcademico = await db
      .select({ id: indicadores.id })
      .from(indicadores)
      .where(eq(indicadores.nombre, "Estrés Academico"))
      .limit(1);

    if (!sisco.length || !estresAcademico.length) {
      console.error("Faltan datos iniciales (SISCO o Estrés Academico).");
      return;
    }

    const idCuestionarioSISCO = sisco[0].id;
    const idEstresAcademico = estresAcademico[0].id;

// Insertar preguntas en la tabla
    for (const pregunta of preguntasSISCO) {
      const result = await db
        .insert(preguntas)
        .values({
          idCuestionario: idCuestionarioSISCO,
          contenido: pregunta.contenido,
          posicion: pregunta.posicion,
          idIndicador: idEstresAcademico,
        })
        .onConflictDoNothing(); // Evita insertar duplicados
    }
  } catch (error) {
    console.error("Error al inicializar preguntas para el cuestionario Goldberg:", error);
  }
};

