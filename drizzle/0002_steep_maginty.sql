CREATE TABLE "usuarios" (
	"id" serial PRIMARY KEY NOT NULL,
	"nombre" varchar(255) NOT NULL,
	"correo" varchar(255) NOT NULL,
	"contraseña" varchar(255) NOT NULL,
	"fecha_nacimiento" date NOT NULL,
	"sexo" text NOT NULL,
	CONSTRAINT "usuarios_correo_unique" UNIQUE("correo")
);
