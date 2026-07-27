import db from './db';
import { multa } from '../models/multa';

export class multaRepository{
    async listar(): Promise<multa[]>{
        const [rows]: any= await db.query('CALL sp_multa_listar()');
        return rows[0] as multa[];
    }

  //buscar
      async buscarPorId(id: number): Promise<multa | null>{
          const [rows]: any= await db.query('CALL sp_multa_buscar(?)',[id]);
          const resultado= rows[0];

          if(!resultado || resultado.length===0){
              return null;
          }
          return resultado[0] as multa;
      }

  // agregar
      async agregar(multa: any): Promise<void> {
      const query = 'CALL sp_multa_crear(?, ?, ?, ?, ?, ?)';
      const params = [
        multa.motivo,
        multa.monto,
        multa.fecha_emision,
        multa.estado,
        multa.id_asignacion,
        multa.id_usuario
      ];

      await db.query(query, params);
    }
  // eliminar
    async eliminar(id:number):Promise <void>{
      const query= 'CALL sp_multa_eliminar(?)';
      await db.query(query,[id]);

    }
    // editar
    async editar(id: number,multa:Partial<multa>): Promise<void>{
      const query='CALL sp_multa_actualizar(?, ?, ?, ?, ?, ?)'
      const params=[
          id,
        multa.motivo,
        multa.monto,
        multa.fecha_emision,
        multa.estado,
        multa.id_asignacion,
        multa.id_usuario
      ];
      await db.query(query,params);
    }    
}