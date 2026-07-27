import db from './db';
import { mercado } from '../models/mercado';

export class MercadoRepository{
    async listar(): Promise<mercado[]>{
        const [rows]: any= await db.query('CALL sp_mercado_listar()');
        return rows[0] as mercado[];
    }

  //buscar
      async buscarPorId(id: number): Promise<mercado | null>{
          const [rows]: any= await db.query('CALL sp_mercado_buscar(?)',[id]);
          const resultado= rows[0];

          if(!resultado || resultado.length===0){
              return null;
          }
          return resultado[0] as mercado;
      }

  // agregar
      async agregar(mercado: any): Promise<void> {
      const query = 'CALL sp_mercado_crear(?, ?, ?)';
      const params = [
        mercado.nombre_mercado,
        mercado.direccion,
        mercado.telefono_administracion
      ];

      await db.query(query, params);
    }
  // eliminar
    async eliminar(id:number):Promise <void>{
      const query= 'CALL sp_mercado_eliminar(?)';
      await db.query(query,[id]);

    }
    // editar
    async editar(id: number,mercado:Partial<mercado>): Promise<void>{
      const query='CALL sp_mercado_actualizar(?, ?, ?, ?)'
      const params=[
          id,
        mercado.nombre_mercado,
        mercado.direccion,
        mercado.telefono_administracion
      ];
      await db.query(query,params);
    }    
}
