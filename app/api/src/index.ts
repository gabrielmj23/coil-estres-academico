// index.ts
import express from 'express';
import routes from './routes';
import { initIndicadores } from './tables/indicadores';
import { initCuestionarios } from './tables/cuestionarios';
import { initPreguntasGoldberg } from './tables/preguntas';
import { initOpcionesGoldberg } from './tables/opciones';
import { initPreguntasSISCO } from './tables/preguntas';
import { initOpcionesSISCO } from './tables/opciones';



const app = express();
const port = 3000;



//Middleware
app.use(express.json());
app.use('/', routes);

//Inicializador de tablas
initIndicadores();
initCuestionarios();
initPreguntasGoldberg();
initOpcionesGoldberg();
initPreguntasSISCO();
initOpcionesSISCO();




app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});