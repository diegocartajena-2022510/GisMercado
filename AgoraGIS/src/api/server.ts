import express from 'express';
import routerVendedor from './routerVendedor';
import routerAsignacion from './routerAsignacionP';
import routerGiroC from './routerGiroC';
import routerMercado from './routerMercado';
import routerSector from './routerSector';
import routerPuesto from './routerPuesto';
import routerPago from './routerPago';
import routerUsuario from './routerUsuario';
import routerMulta from './routerMulta';
import routerInspeccion from './routerInspeccion';
export const EmpezarServer = () => {
  const app = express();

  app.use(express.json());

  app.use('/api', routerVendedor,routerAsignacion,routerGiroC,routerMercado,
    routerSector,routerPuesto,routerPago,routerUsuario,routerMulta,routerInspeccion);

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log("=========================================");
    console.log(`Servidor iniciado en Express`);
    console.log(`http://localhost:${PORT}`);
    console.log("=========================================");
  });
};