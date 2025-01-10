CREATE TABLE "ejercicios" (
	"id" serial PRIMARY KEY NOT NULL,
	"nombre" varchar(120) NOT NULL,
	"descripcion" text NOT NULL,
	"icono" text NOT NULL,
	CONSTRAINT "ejercicios_nombre_unique" UNIQUE("nombre")
);
