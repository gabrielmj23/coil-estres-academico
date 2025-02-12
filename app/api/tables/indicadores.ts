import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

// Table: indicadores
export const indicadores = pgTable("indicadores", {
  id: serial("id").primaryKey(),
  nombre: varchar("nombre", { length: 60 }).notNull().unique(),
});
