import { pgTable, serial, varchar } from "drizzle-orm/pg-core";
import db from "../db";

export const indicadores = pgTable("indicadores", {
  id: serial("id").primaryKey(),
  nombre: varchar("nombre", { length: 60 }).notNull().unique(),
});

//inicializador de indicadores
export const initIndicadores = async () => {

  // Reiniciar la secuencia del ID para que comience desde 1
  await db.execute(`ALTER SEQUENCE indicadores_id_seq RESTART WITH 1`);

  const predefinedIndicadores = [
    { nombre: "Estrés Academico"},
    { nombre: "Ansiedad/Depresión" },
    { nombre: "Disfunción Social"},
  ];

  for (const indicador of predefinedIndicadores) {
    try{
    await db.insert(indicadores).values(indicador).onConflictDoNothing();
    console.log(`Indicador ${indicador.nombre} creado`);
    }catch(e){
      console.log(e);
    }
  } 
}