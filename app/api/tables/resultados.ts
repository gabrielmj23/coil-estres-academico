import { integer, pgTable, primaryKey, serial, varchar } from "drizzle-orm/pg-core";

export const resultados = pgTable("resultados", {
    idCuestionarioHistorico: integer().notNull(),
    idIndicador: integer().notNull(),
    resultado: integer().notNull()
}, (table) => [{
    pk: primaryKey({ columns: [table.idCuestionarioHistorico, table.idIndicador]})
}])