import type { Request, Response } from 'express';
import { eq } from 'drizzle-orm';
import db from '../db';
import { opciones } from '../tables/opciones';

export const getOpcionesPorCuestionario = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params; // Obtener el ID del cuestionario desde los parámetros de la URL

  try {
    const idNumber = parseInt(id, 10); // Convertir el ID a número entero
    // Realizar la consulta para obtener las opciones asociadas al cuestionario con el ID proporcionado
    const opcionesList = await db
      .select()
      .from(opciones)
      .where(eq(opciones.idCuestionario, idNumber)) // Filtrar las opciones por el idCuestionario
      .orderBy(opciones.posicion); // Ordenar las opciones por la posición (si es necesario)

    // Si no se encuentran opciones para ese cuestionario, responder con un mensaje
    if (opcionesList.length === 0) {
     res.status(404).json({ message: `No se encontraron opciones para el cuestionario con ID: ${id}` });
     return;
    }

    // Responder con las opciones encontradas
    res.status(200).json(opcionesList);
  } catch (error) {
    // En caso de error, responder con un mensaje de error
    console.error('Error al obtener las opciones del cuestionario:', error);
    res.status(500).json({ message: 'Error al obtener las opciones del cuestionario.' });
  }
};
