import db from './db';
import { pago } from '../models/pago';

export class pagoRepository{
    async listar(): Promise<pago[]>{
        const [rows]: any= await db.query('CALL sp_pago_listar()');
        return rows[0] as pago[];
    }

  //buscar
      async buscarPorId(id: number): Promise<pago | null>{
          const [rows]: any= await db.query('CALL sp_pago_buscar(?)',[id]);
          const resultado= rows[0];

          if(!resultado || resultado.length===0){
              return null;
          }
          return resultado[0] as pago;
      }

  // agregar
      async agregar(pago: any): Promise<void> {
      const query = 'CALL sp_pago_crear(?, ?, ?,?, ?, ?)';
      const params = [
        pago.monto_pagado,
        pago.fecha_pago,
        pago.mes_correspondiente,
        pago.numero_recibo_municipal,
        pago.estado_pago,
        pago.id_asignacion
      ];

      await db.query(query, params);
    }
  // eliminar
    async eliminar(id:number):Promise <void>{
      const query= 'CALL sp_pago_eliminar(?)';
      await db.query(query,[id]);

    }
    // editar
    async editar(id: number,pago:Partial<pago>): Promise<void>{
      const query='CALL sp_mercado_actualizar(?, ?, ?, ?,?, ?, ?, ?,?)'
      const params=[
          id,
        pago.monto_pagado,
        pago.fecha_pago,
        pago.mes_correspondiente,
        pago.numero_recibo_municipal,
        pago.estado_pago,
        pago.id_asignacion
      ];
      await db.query(query,params);
    }    
}
