// routes/index.ts
import { Router } from 'express';
import { getHome } from './controllers/tests';

const router = Router();

router.get('/', getHome);

export default router;