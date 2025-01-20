import { date, integer, pgTable, serial} from "drizzle-orm/pg-core";

//Table 
export const cuestionario_historico = pgTable("cuestionario_historico", {
    IdCuestionarioHistorico: serial("id").primaryKey(),
    fecha: date("fecha").notNull(),
    idCuestionario: integer("idCuestionario"),
    idUsuario: integer("idUsuario")
})