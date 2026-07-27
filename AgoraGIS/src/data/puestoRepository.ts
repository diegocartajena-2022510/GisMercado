import db from './db';
import { puesto } from '../models/puesto';

export class PuestoRepository{
    async listar(): Promise<puesto[]>{
        const [rows]: any= await db.query('CALL sp_puesto_listar()');
        return rows[0] as puesto[];
    }

  //buscar
      async buscarPorId(id: number): Promise<puesto | null>{
          const [rows]: any= await db.query('CALL sp_puesto_buscar(?)',[id]);
          const resultado= rows[0];

          if(!resultado || resultado.length===0){
              return null;
          }
          return resultado[0] as puesto;
      }

  // agregar
      async agregar(puesto: any): Promise<void> {
      const query = 'CALL sp_puesto_crear(?, ?, ?, ?)';
      const params = [
        puesto.numero_puesto,
        puesto.estado,
        puesto.tarifa_mensual,
        puesto.id_sector
      ];

      await db.query(query, params);
    }
  // eliminar
    async eliminar(id:number):Promise <void>{
      const query= 'CALL sp_puesto_eliminar(?)';
      await db.query(query,[id]);

    }
    // editar
    async editar(id: number,puesto:Partial<puesto>): Promise<void>{
      const query='CALL sp_vendedor_actualizar(?, ?, ?, ?, ?, ?, ?)'
      const params=[
          id,
        puesto.numero_puesto,
        puesto.estado,
        puesto.tarifa_mensual,
        puesto.id_sector
      ];
      await db.query(query,params);
    }    
}


