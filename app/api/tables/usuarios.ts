import { pgTable, serial, text, varchar, date } from "drizzle-orm/pg-core";

export const usuarios = pgTable("usuarios", {
  id: serial("id").primaryKey(),
  nombre: varchar("nombre", { length: 255 }).notNull(),
  correo: varchar("correo", { length: 255 }).notNull().unique(),
  contraseña: varchar("contraseña", { length: 255 }).notNull(),
  fechaNacimiento: date("fecha_nacimiento").notNull(),
  sexo: text("sexo").notNull(),
});
