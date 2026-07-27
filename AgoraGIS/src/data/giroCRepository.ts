import { giro_comercial } from "../models/giro_comercial";
import db from "./db";

export class giro_comercialRepository{
    async listar(): Promise<giro_comercial[]>{
        const [rows]: any= await db.query('CALL sp_giro_comercial_listar()');
        return rows[0] as giro_comercial[];
    }

  //buscar
      async buscarPorId(id: number): Promise<giro_comercial | null>{
          const [rows]: any= await db.query('CALL sp_giro_comercial_buscar(?)',[id]);
          const resultado= rows[0];

          if(!resultado || resultado.length===0){
              return null;
          }
          return resultado[0] as giro_comercial;
      }

  // agregar
      async agregar(giro_comercial: any): Promise<void> {
      const query = 'CALL sp_giro_comercial_crear(?, ?, ?)';
      const params = [
        giro_comercial.nombre_giro,
        giro_comercial.descripcion,
        giro_comercial.permiso
      ];

      await db.query(query, params);
    }
  // eliminar
    async eliminar(id:number):Promise <void>{
      const query= 'CALL sp_giro_comercial_eliminar(?)';
      await db.query(query,[id]);

    }
    // editar
    async editar(id: number,giro_comercial:Partial<giro_comercial>): Promise<void>{
      const query='CALL sp_giro_comercial_actualizar(?, ?, ?, ?)'
      const params=[
          id,
        giro_comercial.nombre_giro,
        giro_comercial.descripcion,
        giro_comercial.permiso
      ];
      await db.query(query,params);
    }    

    
}