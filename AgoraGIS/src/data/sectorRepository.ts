import db from './db';
import { sector } from '../models/sector';

export class SectorRepository{
    async listar(): Promise<sector[]>{
        const [rows]: any= await db.query('CALL sp_sector_listar()');
        return rows[0] as sector[];
    }

  //buscar
      async buscarPorId(id: number): Promise<sector | null>{
          const [rows]: any= await db.query('CALL sp_sector_buscar(?)',[id]);
          const resultado= rows[0];

          if(!resultado || resultado.length===0){
              return null;
          }
          return resultado[0] as sector;
      }

  // agregar
      async agregar(sector: any): Promise<void> {
      const query = 'CALL sp_sector_crear(?, ?, ?)';
      const params = [
        sector.nombre_sector,
        sector.descripcion,
        sector.id_mercado
      ];

      await db.query(query, params);
    }
  // eliminar
    async eliminar(id:number):Promise <void>{
      const query= 'CALL sp_sector_eliminar(?)';
      await db.query(query,[id]);

    }
    // editar
    async editar(id: number,sector:Partial<sector>): Promise<void>{
      const query='CALL sp_sector_actualizar(?, ?, ?, ?)'
      const params=[
          id,
        sector.nombre_sector,
        sector.descripcion,
        sector.id_mercado
      ];
      await db.query(query,params);
    }    
}


