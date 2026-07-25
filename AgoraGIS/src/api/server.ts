import express from 'express';
import router from './router';

export const EmpezarServer = () => {
  const app = express();

  app.use(express.json());

  app.use('/api', router);

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log("=========================================");
    console.log(`Servidor iniciado en Express`);
    console.log(`http://localhost:${PORT}`);
    console.log("=========================================");
  });
};