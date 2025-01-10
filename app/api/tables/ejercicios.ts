import { pgTable, serial, varchar, text } from "drizzle-orm/pg-core";

// Table: Ejercicios
export const ejercicios = pgTable("ejercicios", {
  id: serial("id").primaryKey(),
  nombre: varchar("nombre", { length: 120 }).notNull().unique(),
  descripcion: text("descripcion").notNull(),
  icono: text("icono").notNull(),
});
