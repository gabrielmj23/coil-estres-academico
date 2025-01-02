import type { Request, Response } from 'express';
import { cuestionarios } from '../tables/cuestionarios';
import db from '../db';

export const getCuestionarios = async (req: Request, res: Response): Promise<void> => {
  try {
    // Realizar la consulta para obtener todos los cuestionarios
    const cuestionariosList = await db.select().from(cuestionarios);

    // Si no se encontraron cuestionarios, responder con un mensaje
    if (cuestionariosList.length === 0) {
      res.status(404).json({ message: 'No se encontraron cuestionarios.' });
      return;
    }

    // Responder con los cuestionarios obtenidos
    res.status(200).json(cuestionariosList);
  } catch (error) {
    // En caso de error, responder con un mensaje de error
    console.error('Error al obtener los cuestionarios:', error);
    res.status(500).json({ message: 'Error al obtener los cuestionarios.' });
  }
};

