CREATE TABLE "cuestionario_historico" (
	"id" serial PRIMARY KEY NOT NULL,
	"fecha" date NOT NULL,
	"idCuestionario" integer NOT NULL,
	"idUsuario" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "resultados" (
	"idCuestionarioHistorico" integer NOT NULL,
	"idIndicador" integer NOT NULL,
	"resultado" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "cuestionario_historico" ADD CONSTRAINT "cuestionario_historico_idCuestionario_cuestionarios_id_fk" FOREIGN KEY ("idCuestionario") REFERENCES "public"."cuestionarios"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cuestionario_historico" ADD CONSTRAINT "cuestionario_historico_idUsuario_usuarios_id_fk" FOREIGN KEY ("idUsuario") REFERENCES "public"."usuarios"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "resultados" ADD CONSTRAINT "resultados_pk" PRIMARY KEY ("idCuestionarioHistorico", "idIndicador");--> statement-breakpoint
ALTER TABLE "resultados" ADD CONSTRAINT "resultados_idCuestionarioHistorico_cuestionario_historico_id_fk" FOREIGN KEY ("idCuestionarioHistorico") REFERENCES "public"."cuestionario_historico"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "resultados" ADD CONSTRAINT "resultados_idIndicador_indicadores_id_fk" FOREIGN KEY ("idIndicador") REFERENCES "public"."indicadores"("id") ON DELETE no action ON UPDATE no action;