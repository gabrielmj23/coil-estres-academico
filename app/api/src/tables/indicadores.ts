import { pgTable, serial, varchar } from "drizzle-orm/pg-core";
import db from "../db";

export const indicadores = pgTable("indicadores", {
  id: serial("id").primaryKey(),
  nombre: varchar("nombre", { length: 60 }).notNull().unique(),
});

