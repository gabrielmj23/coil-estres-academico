import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";

const db = drizzle(process.env.DATABASE_URL!);

//Colocar aqui codigo para insertar en las tablas de la base de datos o usa el PGAdmin para hacerlo
console.log("hola mundo");
