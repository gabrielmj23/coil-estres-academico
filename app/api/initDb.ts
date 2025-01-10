import { eq } from "drizzle-orm";
import db from "./db";
import { cuestionarios } from "./tables/cuestionarios";
import { indicadores } from "./tables/indicadores";
import { secciones } from "./tables/secciones";
import { preguntas } from "./tables/preguntas";
import { opciones } from "./tables/opciones";
import { ejercicios } from "./tables/ejercicios";

console.log("init-db: Iniciando...");
await db.transaction(async (tx) => {
  // Clear database
  await tx.delete(opciones);
  await tx.delete(preguntas);
  await tx.delete(secciones);
  await tx.delete(indicadores);
  await tx.delete(cuestionarios);
  await tx.delete(ejercicios);

  // Restart sequences
  await tx.execute(`ALTER SEQUENCE cuestionarios_id_seq RESTART WITH 1`);
  await tx.execute(`ALTER SEQUENCE indicadores_id_seq RESTART WITH 1`);
  await tx.execute(`ALTER SEQUENCE secciones_id_seq RESTART WITH 1`);
  await tx.execute(`ALTER SEQUENCE preguntas_id_seq RESTART WITH 1`);
  await tx.execute(`ALTER SEQUENCE opciones_id_seq RESTART WITH 1`);
  await tx.execute(`ALTER SEQUENCE ejercicios_id_seq RESTART WITH 1`);

  // #region Questionnaires
  console.log("init-db: Creando cuestionarios...");
  const predefinedCuestionarios = [
    {
      nombre: "SISCO",
      resumen: "Cuestionario para medir el nivel de estrés académico",
      descripcion:
        "Cuestionario para medir el nivel de estrés académico en estudiantes",
      icono: "/siscoIcono.svg",
    },
    {
      nombre: "Goldberg",
      resumen:
        "Cuestionario para medir el nivel de Ansiedad/Depresión y Disfunción Social",
      descripcion:
        "Cuestionario para medir el nivel de Ansiedad/Depresión y Disfunción Social en estudiantes",
      icono: "/goldbergIcono.svg",
    },
  ];

  for (const cuestionario of predefinedCuestionarios) {
    try {
      await tx.insert(cuestionarios).values(cuestionario).onConflictDoNothing();
    } catch (e) {
      console.log(e);
    }
  }
  console.log("init-db: Cuestionarios creados");
  // #endregion

  // #region Indicators
  console.log("init-db: Creando indicadores...");
  const predefinedIndicadores = [
    { nombre: "Estrés Academico" },
    { nombre: "Ansiedad/Depresión" },
    { nombre: "Disfunción Social" },
  ];

  for (const indicador of predefinedIndicadores) {
    try {
      await tx.insert(indicadores).values(indicador).onConflictDoNothing();
    } catch (e) {
      console.log(e);
    }
  }
  console.log("init-db: Indicadores creados");
  // #endregion

  const siscoIdList = await tx
    .select({ id: cuestionarios.id })
    .from(cuestionarios)
    .where(eq(cuestionarios.nombre, "SISCO"))
    .limit(1);
  const siscoId = siscoIdList[0].id;

  const ghqIdList = await tx
    .select({ id: cuestionarios.id })
    .from(cuestionarios)
    .where(eq(cuestionarios.nombre, "Goldberg"))
    .limit(1);
  const goldbergId = ghqIdList[0].id;

  // #region Sections
  console.log("init-db: Creando secciones...");
  const siscoSecciones = [
    {
      idCuestionario: siscoId,
      instruccion:
        "Señala con qué Frecuencia te Inquietaron las Siguientes Situaciones",
      posicion: 1,
      imagen: "/sisco1.svg",
    },
    {
      idCuestionario: siscoId,
      instruccion:
        "Señala con qué Frecuencia Tuviste las Siguientes Reacciones Cuando Estabas Preocupado o Nervioso",
      posicion: 2,
      imagen: "/sisco1.svg",
    },
    {
      idCuestionario: siscoId,
      instruccion:
        "Señala con qué Frecuencia Utilizaste las Siguientes Estrategias para Enfrentar la Situación que te Preocupó",
      posicion: 3,
      imagen: "/sisco1.svg",
    },
  ];

  const goldbergSecciones = [
    {
      idCuestionario: goldbergId,
      instruccion: "Selecciona la Opción que Más se Ajuste a Ti",
      posicion: 1,
      imagen: "/goldberg1.svg",
    },
  ];

  for (const seccion of siscoSecciones) {
    try {
      await tx.insert(secciones).values(seccion).onConflictDoNothing();
    } catch (e) {
      console.error(e);
    }
  }

  for (const seccion of goldbergSecciones) {
    try {
      await tx.insert(secciones).values(seccion).onConflictDoNothing();
    } catch (e) {
      console.error(e);
    }
  }
  console.log("init-db: Secciones creadas");
  // #endregion

  const estresAcademico = await tx
    .select({ id: indicadores.id })
    .from(indicadores)
    .where(eq(indicadores.nombre, "Estrés Academico"))
    .limit(1);
  const estresId = estresAcademico[0].id;

  // #region Preguntas SISCO
  console.log("init-db: Creando preguntas para SISCO...");
  const seccionesSisco = await tx
    .select({
      id: secciones.id,
      instruccion: secciones.instruccion,
    })
    .from(secciones)
    .where(eq(secciones.idCuestionario, siscoId));

  seccionesSisco.forEach(async (seccion) => {
    if (
      seccion.instruccion ===
      "Señala con qué Frecuencia te Inquietaron las Siguientes Situaciones"
    ) {
      const opcionesSisco = [
        { contenido: "Nunca", puntaje: 0, posicion: 1 },
        { contenido: "Rara vez", puntaje: 1, posicion: 2 },
        { contenido: "Algunas veces", puntaje: 2, posicion: 3 },
        { contenido: "Casi siempre", puntaje: 3, posicion: 4 },
        { contenido: "Siempre", puntaje: 4, posicion: 5 },
      ];

      const preguntasSisco = [
        {
          contenido: "La competencia con los compañeros del grupo",
          posicion: 1,
        },
        { contenido: "Sobrecarga de tareas y trabajos escolares", posicion: 2 },
        {
          contenido: "La personalidad y el carácter del profesor",
          posicion: 3,
        },
        {
          contenido:
            "Las evaluaciones de los profesores (exámenes, ensayos, trabajos de investigación, etc.)",
          posicion: 4,
        },
        {
          contenido:
            "El tipo de trabajo que te piden los profesores (consulta de temas, fichas de trabajo, ensayos, mapas conceptuales, etc.)",
          posicion: 5,
        },
        {
          contenido: "No entender los temas que se abordan en la clase",
          posicion: 6,
        },
        {
          contenido:
            "Participación en clase (responder a preguntas, exposiciones, etc.)",
          posicion: 7,
        },
        { contenido: "Tiempo limitado para hacer el trabajo", posicion: 8 },
      ];

      const inserted = await tx
        .insert(preguntas)
        .values(
          preguntasSisco.map((pregunta) => ({
            idCuestionario: siscoId,
            idSeccion: seccion.id,
            idIndicador: estresId,
            ...pregunta,
          }))
        )
        .returning();

      for (const ins of inserted) {
        await tx.insert(opciones).values(
          opcionesSisco.map((opcion) => ({
            idCuestionario: siscoId,
            idSeccion: seccion.id,
            idPregunta: ins.id,
            ...opcion,
          }))
        );
      }
    } else if (
      seccion.instruccion ===
      "Señala con qué Frecuencia Tuviste las Siguientes Reacciones Cuando Estabas Preocupado o Nervioso"
    ) {
      const opcionesSisco = [
        { contenido: "Nunca", puntaje: 0, posicion: 1 },
        { contenido: "Rara vez", puntaje: 1, posicion: 2 },
        { contenido: "Algunas veces", puntaje: 2, posicion: 3 },
        { contenido: "Casi siempre", puntaje: 3, posicion: 4 },
        { contenido: "Siempre", puntaje: 4, posicion: 5 },
      ];

      const preguntasSisco = [
        {
          contenido: "Trastornos en el sueño (insomnio o pesadillas)",
          posicion: 1,
        },
        { contenido: "Fatiga crónica (cansancio permanente)", posicion: 2 },
        { contenido: "Dolores de cabeza o migrañas", posicion: 3 },
        {
          contenido: "Problemas de digestión, dolor abdominal o diarrea",
          posicion: 4,
        },
        {
          contenido: "Rascarse, morderse las uñas, frotarse, etc.",
          posicion: 5,
        },
        { contenido: "Somnolencia o mayor necesidad de dormir", posicion: 6 },
        {
          contenido: "Inquietud (incapacidad de relajarse y estar tranquilo)",
          posicion: 7,
        },
        {
          contenido: "Sentimientos de depresión y tristeza (decaído)",
          posicion: 8,
        },
        { contenido: "Ansiedad, angustia o desesperación", posicion: 9 },
        { contenido: "Problemas de concentración", posicion: 10 },
        {
          contenido: "Sentimiento de agresividad o aumento de irritabilidad",
          posicion: 11,
        },
        {
          contenido: "Conflictos o tendencia a polemizar o discutir",
          posicion: 12,
        },
        { contenido: "Aislamiento de los demás", posicion: 13 },
        {
          contenido: "Desgano para realizar las labores escolares",
          posicion: 14,
        },
        {
          contenido: "Aumento o reducción del consumo de alimentos",
          posicion: 15,
        },
      ];

      const inserted = await tx
        .insert(preguntas)
        .values(
          preguntasSisco.map((pregunta) => ({
            idCuestionario: siscoId,
            idSeccion: seccion.id,
            idIndicador: estresId,
            ...pregunta,
          }))
        )
        .returning();

      for (const ins of inserted) {
        await tx.insert(opciones).values(
          opcionesSisco.map((opcion) => ({
            idCuestionario: siscoId,
            idSeccion: seccion.id,
            idPregunta: ins.id,
            ...opcion,
          }))
        );
      }
    } else if (
      seccion.instruccion ===
      "Señala con qué Frecuencia Utilizaste las Siguientes Estrategias para Enfrentar la Situación que te Preocupó"
    ) {
      const opcionesSisco = [
        { contenido: "Nunca", puntaje: 0, posicion: 1 },
        { contenido: "Rara vez", puntaje: 1, posicion: 2 },
        { contenido: "Algunas veces", puntaje: 2, posicion: 3 },
        { contenido: "Casi siempre", puntaje: 3, posicion: 4 },
        { contenido: "Siempre", puntaje: 4, posicion: 5 },
      ];

      const preguntasSisco = [
        {
          contenido:
            "Habilidad asertiva (defender nuestras preferencias ideas o sentimientos sin dañar a otros)",
          posicion: 24,
        },
        {
          contenido: "Elaboración de un plan y ejecución de sus tareas",
          posicion: 25,
        },
        { contenido: "Elogios a sí mismo", posicion: 26 },
        {
          contenido: "La religiosidad (oraciones o asistencia a misa)",
          posicion: 27,
        },
        {
          contenido: "Búsqueda de información sobre la situación",
          posicion: 28,
        },
        {
          contenido:
            "Ventilación y confidencias (verbalización de la situación que preocupa)",
          posicion: 29,
        },
      ];

      const inserted = await tx
        .insert(preguntas)
        .values(
          preguntasSisco.map((pregunta) => ({
            idCuestionario: siscoId,
            idSeccion: seccion.id,
            idIndicador: estresId,
            ...pregunta,
          }))
        )
        .returning();

      for (const ins of inserted) {
        await tx.insert(opciones).values(
          opcionesSisco.map((opcion) => ({
            idCuestionario: siscoId,
            idSeccion: seccion.id,
            idPregunta: ins.id,
            ...opcion,
          }))
        );
      }
    }
  });
  console.log("init-db: Preguntas para SISCO creadas");
  // #endregion

  const ansDep = await tx
    .select({ id: indicadores.id })
    .from(indicadores)
    .where(eq(indicadores.nombre, "Ansiedad/Depresión"))
    .limit(1);
  const ansiedadId = ansDep[0].id;

  const disSocial = await tx
    .select({ id: indicadores.id })
    .from(indicadores)
    .where(eq(indicadores.nombre, "Disfunción Social"))
    .limit(1);
  const disfuncionId = disSocial[0].id;

  // #region Preguntas Goldberg
  console.log("init-db: Creando preguntas para Goldberg...");
  const seccionesGoldberg = await tx
    .select({
      id: secciones.id,
      instruccion: secciones.instruccion,
    })
    .from(secciones)
    .where(eq(secciones.idCuestionario, goldbergId))
    .limit(1);
  const seccionGoldbergId = seccionesGoldberg[0].id;

  const preguntasGoldberg = [
    {
      contenido: "¿Ha podido concentrarse bien en lo que hace?",
      posicion: 1,
      idIndicador: disfuncionId,
      opciones: [
        { contenido: "Mejor que lo habitual", puntaje: 1, posicion: 1 },
        { contenido: "Igual que lo habitual", puntaje: 2, posicion: 2 },
        { contenido: "Menos que lo habitual", puntaje: 3, posicion: 3 },
        { contenido: "Mucho menos que lo habitual", puntaje: 4, posicion: 4 },
      ],
    },
    {
      contenido: "¿Sus preocupaciones le han hecho perder mucho sueño?",
      posicion: 2,
      idIndicador: ansiedadId,
      opciones: [
        { contenido: "No, en absoluto", puntaje: 1, posicion: 1 },
        { contenido: "No más que lo habitual", puntaje: 2, posicion: 2 },
        { contenido: "Bastante más que lo habitual", puntaje: 3, posicion: 3 },
        { contenido: "Mucho más", puntaje: 4, posicion: 4 },
      ],
    },
    {
      contenido: "¿Ha sentido que está jugando un papel útil en la vida?",
      posicion: 3,
      idIndicador: disfuncionId,
      opciones: [
        { contenido: "Más que lo habitual", puntaje: 1, posicion: 1 },
        { contenido: "Igual que lo habitual", puntaje: 2, posicion: 2 },
        { contenido: "Menos útil que lo habitual", puntaje: 3, posicion: 3 },
        { contenido: "Mucho menos", puntaje: 4, posicion: 4 },
      ],
    },
    {
      contenido: "¿Se ha sentido capaz de tomar decisiones?",
      posicion: 4,
      idIndicador: disfuncionId,
      opciones: [
        { contenido: "Más capaz que lo habitual", puntaje: 1, posicion: 1 },
        { contenido: "Igual que lo habitual", puntaje: 2, posicion: 2 },
        { contenido: "Menos capaz que lo habitual", puntaje: 3, posicion: 3 },
        { contenido: "Mucho menos", puntaje: 4, posicion: 4 },
      ],
    },
    {
      contenido: "¿Se ha sentido constantemente agobiado y en tensión?",
      posicion: 5,
      idIndicador: ansiedadId,
      opciones: [
        { contenido: "No, en absoluto", puntaje: 1, posicion: 1 },
        { contenido: "No más que lo habitual", puntaje: 2, posicion: 2 },
        { contenido: "Bastante más que lo habitual", puntaje: 3, posicion: 3 },
        { contenido: "Mucho más", puntaje: 4, posicion: 4 },
      ],
    },
    {
      contenido: "¿Ha sentido que no puede superar sus dificultades?",
      posicion: 6,
      idIndicador: ansiedadId,
      opciones: [
        { contenido: "No, en absoluto", puntaje: 1, posicion: 1 },
        { contenido: "No más que lo habitual", puntaje: 2, posicion: 2 },
        { contenido: "Bastante más que lo habitual", puntaje: 3, posicion: 3 },
        { contenido: "Mucho más", puntaje: 4, posicion: 4 },
      ],
    },
    {
      contenido:
        "¿Ha sido capaz de disfrutar sus actividades normales de cada día?",
      posicion: 7,
      idIndicador: disfuncionId,
      opciones: [
        { contenido: "Más que lo habitual", puntaje: 1, posicion: 1 },
        { contenido: "Igual que lo habitual", puntaje: 2, posicion: 2 },
        { contenido: "Menos que lo habitual", puntaje: 3, posicion: 3 },
        { contenido: "Mucho menos", puntaje: 4, posicion: 4 },
      ],
    },
    {
      contenido: "¿Ha sido capaz de hacer frente a sus problemas?",
      posicion: 8,
      idIndicador: disfuncionId,
      opciones: [
        { contenido: "Más capaz que lo habitual", puntaje: 1, posicion: 1 },
        { contenido: "Igual que lo habitual", puntaje: 2, posicion: 2 },
        { contenido: "Menos capaz que lo habitual", puntaje: 3, posicion: 3 },
        { contenido: "Mucho menos", puntaje: 4, posicion: 4 },
      ],
    },
    {
      contenido: "¿Se ha sentido un poco feliz y deprimido?",
      posicion: 9,
      idIndicador: ansiedadId,
      opciones: [
        { contenido: "No, en absoluto", puntaje: 1, posicion: 1 },
        { contenido: "No más que lo habitual", puntaje: 2, posicion: 2 },
        { contenido: "Bastante más que lo habitual", puntaje: 3, posicion: 3 },
        { contenido: "Mucho más", puntaje: 4, posicion: 4 },
      ],
    },
    {
      contenido: "¿Ha perdido confianza en sí mismo?",
      posicion: 10,
      idIndicador: ansiedadId,
      opciones: [
        { contenido: "No, en absoluto", puntaje: 1, posicion: 1 },
        { contenido: "No más que lo habitual", puntaje: 2, posicion: 2 },
        { contenido: "Bastante más que lo habitual", puntaje: 3, posicion: 3 },
        { contenido: "Mucho más", puntaje: 4, posicion: 4 },
      ],
    },
    {
      contenido: "¿Ha pensado que usted es una persona que no vale para nada?",
      posicion: 11,
      idIndicador: ansiedadId,
      opciones: [
        { contenido: "No, en absoluto", puntaje: 1, posicion: 1 },
        { contenido: "No más que lo habitual", puntaje: 2, posicion: 2 },
        { contenido: "Bastante más que lo habitual", puntaje: 3, posicion: 3 },
        { contenido: "Mucho más", puntaje: 4, posicion: 4 },
      ],
    },
    {
      contenido:
        "¿Se siente razonablemente feliz considerando todas las circunstancias?",
      posicion: 12,
      idIndicador: disfuncionId,
      opciones: [
        { contenido: "Más feliz que lo habitual", puntaje: 1, posicion: 1 },
        {
          contenido: "Aproximadamente lo mismo que lo habitual",
          puntaje: 2,
          posicion: 2,
        },
        { contenido: "Menos feliz que lo habitual", puntaje: 3, posicion: 3 },
        { contenido: "Mucho menos que lo habitual", puntaje: 4, posicion: 4 },
      ],
    },
  ];

  for (const pregunta of preguntasGoldberg) {
    const inserted = await tx
      .insert(preguntas)
      .values({
        idCuestionario: goldbergId,
        idSeccion: seccionGoldbergId,
        idIndicador: pregunta.idIndicador,
        contenido: pregunta.contenido,
        posicion: pregunta.posicion,
      })
      .returning();

    for (const ins of inserted) {
      await tx.insert(opciones).values(
        pregunta.opciones.map((opcion) => ({
          idCuestionario: goldbergId,
          idSeccion: seccionGoldbergId,
          idPregunta: ins.id,
          ...opcion,
        }))
      );
    }
  }
  console.log("init-db: Preguntas para Goldberg creadas");
  // #endregion

  // #region Ejercicios
  console.log("init-db: Creando ejercicios");
  const ejerciciosList = [
    {
      nombre: "Respiración Profunda",
      descripcion:
        "Al inhalar y exhalar conscientemente, se induce una respuesta de relajación, por lo que es un método inmediato para mitigar el estrés",
      icono: "/respiracion.png",
    },
    {
      nombre: "Terapia Manual",
      descripcion:
        "A través de manipulaciones suaves y profundas, los fisioterapeutas ayudan a liberar las contracturas que se producen por el estrés",
      icono: "/masaje.png",
    },
    {
      nombre: "Ejercicio Terapéutico",
      descripcion:
        "Actividades como el yoga, el pilates y los estiramientos pueden promover la liberación de endorfinas, las hormonas de la felicidad",
      icono: "/yoga.png",
    },
    {
      nombre: "Terapia de Movimiento",
      descripcion:
        "Movimientos lentos y controlados, como los utilizados en el Tai Chi o el yoga, ayudan a alinear la mente y el cuerpo",
      icono: "/taichi.png",
    },
    {
      nombre: "Estimulación Sensorial",
      descripcion:
        "Estas técnicas se centran en calmar los sentidos y disminuir la sobrecarga emocional",
      icono: "/sensorial.png",
    },
  ];
  await tx.insert(ejercicios).values(ejerciciosList);
  console.log("init-db: Ejercicios creados")
  // #endregion

  console.log("init-db: Ejecutando transacción...");
});
console.log("init-db: Finalizado");
