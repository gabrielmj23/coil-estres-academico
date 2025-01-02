import { pgTable, serial, varchar, text } from "drizzle-orm/pg-core";

// Table: Cuestionarios
export const cuestionarios = pgTable("cuestionarios", {
  id: serial("id").primaryKey(),
  nombre: varchar("nombre", { length: 60 }).notNull().unique(),
  resumen: varchar("resumen", { length: 150 }).notNull(),
  descripcion: varchar("descripcion", { length: 250 }).notNull(),
  icono: text("icono").notNull(),
});
