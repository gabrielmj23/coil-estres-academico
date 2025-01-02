// index.ts
import express from 'express';
import routes from './routes';
import { initIndicadores } from './tables/indicadores';



const app = express();
const port = 3000;



//Middleware
app.use(express.json());
app.use('/', routes);

//Inicializador de tablas de la bd
initIndicadores();


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});