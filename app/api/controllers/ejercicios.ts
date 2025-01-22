import db from "../db";
import { ejercicios } from "../tables/ejercicios";
import { data } from "react-router";

export const getejercios = async () => {
  try {
    // Realizar la consulta para obtener las opciones asociadas al cuestionario con el ID proporcionado
    const ejerciciosList = await db
      .select()
      .from(ejercicios)
      .orderBy(ejercicios.id);

    // Responder con las opciones encontradas
    return ejerciciosList;
  } catch (error) {
    // En caso de error, responder con un mensaje de error
    console.error("Error al obtener los ejercicios:", error);
    throw data({ message: "Error al obtener los ejercicios" }, { status: 500 });
  }
};
