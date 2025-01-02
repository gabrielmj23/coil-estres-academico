// routes/index.ts
import { Router } from 'express';
import { getCuestionarios } from './controllers/cuestionarios';
import { getPreguntasPorCuestionario } from './controllers/preguntas';
import { getOpcionesPorCuestionario} from './controllers/opciones';

const router = Router();

router.get('/cuestionarios', getCuestionarios);
router.get('/preguntas/:id', getPreguntasPorCuestionario);
router.get('/opciones/:id', getOpcionesPorCuestionario);

export default router;