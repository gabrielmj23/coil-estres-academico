import { pgTable, serial, varchar, text } from "drizzle-orm/pg-core";
import db from "../db";

// Table: Cuestionarios
export const cuestionarios = pgTable("cuestionarios", {
  id: serial("id").primaryKey(),
  nombre: varchar("nombre", { length: 60 }).notNull().unique(),
  resumen: varchar("resumen", { length: 150 }).notNull(),
  descripcion: varchar("descripcion", { length: 250 }).notNull(),
  icono: text("icono").notNull(),
});


//inicializador de cuestionarios
export const initCuestionarios = async () => {

  // Reiniciar la secuencia del ID para que comience desde 1
  await db.execute(`ALTER SEQUENCE cuestionarios_id_seq RESTART WITH 1`);

  const predefinedCuestionarios = [
    { nombre: "SISCO", resumen: "Cuestionario para medir el nivel de estrés académico", descripcion: "Cuestionario para medir el nivel de estrés académico en estudiantes", icono: "../assets/siscoIcono" },
    { nombre: "Goldberg", resumen: "Cuestionario para medir el nivel de Ansiedad/Depresión y Disfunción Social", descripcion: "Cuestionario para medir el nivel de Ansiedad/Depresión y Disfunción Social en estudiantes", icono: "../assets/goldbergIcono" }
  ];

  for (const cuestionario of predefinedCuestionarios) {
    try{
    await db.insert(cuestionarios).values(cuestionario).onConflictDoNothing();
    }catch(e){
      console.log(e);
    }
  } 
}
