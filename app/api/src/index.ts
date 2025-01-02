// index.ts
import express from 'express';
import routes from './routes';



const app = express();
const port = 3000;

//Middleware
app.use(express.json());
app.use('/', routes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});