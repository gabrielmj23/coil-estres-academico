CREATE TABLE IF NOT EXISTS "cuestionarios" (
	"id" serial PRIMARY KEY NOT NULL,
	"nombre" varchar(60) NOT NULL,
	"resumen" varchar(150) NOT NULL,
	"descripcion" varchar(250) NOT NULL,
	"icono" text NOT NULL,
	CONSTRAINT "cuestionarios_nombre_unique" UNIQUE("nombre")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "indicadores" (
	"id" serial PRIMARY KEY NOT NULL,
	"nombre" varchar(60) NOT NULL,
	CONSTRAINT "indicadores_nombre_unique" UNIQUE("nombre")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "opciones" (
	"id_cuestionario" integer NOT NULL,
	"id_seccion" integer NOT NULL,
	"id_pregunta" integer NOT NULL,
	"id" serial NOT NULL,
	"contenido" varchar(50) NOT NULL,
	"puntaje" integer NOT NULL,
	"posicion" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "preguntas" (
	"id_cuestionario" integer NOT NULL,
	"id_seccion" integer NOT NULL,
	"id" serial NOT NULL,
	"contenido" varchar(160) NOT NULL,
	"posicion" integer NOT NULL,
	"id_indicador" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "secciones" (
	"id_cuestionario" integer NOT NULL,
	"id" serial NOT NULL,
	"instruccion" varchar(250) NOT NULL,
	"posicion" integer NOT NULL,
	"imagen" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "opciones" ADD CONSTRAINT "opciones_id_cuestionario_cuestionarios_id_fk" FOREIGN KEY ("id_cuestionario") REFERENCES "public"."cuestionarios"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "preguntas" ADD CONSTRAINT "preguntas_id_cuestionario_cuestionarios_id_fk" FOREIGN KEY ("id_cuestionario") REFERENCES "public"."cuestionarios"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "preguntas" ADD CONSTRAINT "preguntas_id_indicador_indicadores_id_fk" FOREIGN KEY ("id_indicador") REFERENCES "public"."indicadores"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "secciones" ADD CONSTRAINT "secciones_id_cuestionario_cuestionarios_id_fk" FOREIGN KEY ("id_cuestionario") REFERENCES "public"."cuestionarios"("id") ON DELETE no action ON UPDATE no action;