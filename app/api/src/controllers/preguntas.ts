import type { Request, Response } from 'express';
import db from '../db';
import { preguntas } from '../tables/preguntas';
import {eq} from 'drizzle-orm';
export const getPreguntasPorCuestionario = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params; // Obtener el ID del cuestionario desde los parámetros de la URL

  try {

    const idNumber = parseInt(id, 10); // Convertir el ID a número entero
    // Realizar la consulta para obtener las preguntas asociadas al cuestionario con el ID proporcionado
    const preguntasList = await db
      .select()
      .from(preguntas)
      .where(eq(preguntas.idCuestionario, idNumber));  // Asumiendo que el campo en la tabla de preguntas es 'id_cuestionario'

    // Si no se encuentran preguntas para ese cuestionario, responder con un mensaje
    if (preguntasList.length === 0) {
       res.status(404).json({ message: `No se encontraron preguntas para el cuestionario con ID: ${id}` });
       return;
    }

    // Responder con las preguntas encontradas
    res.status(200).json(preguntasList);
  } catch (error) {
    // En caso de error, responder con un mensaje de error
    console.error('Error al obtener las preguntas del cuestionario:', error);
    res.status(500).json({ message: 'Error al obtener las preguntas del cuestionario.' });
  }
};
