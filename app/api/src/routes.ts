// routes/index.ts
import { Router } from 'express';
import { getCuestionarios } from './controllers/cuestionarios';

const router = Router();

router.get('/cuestionarios', getCuestionarios);

export default router;