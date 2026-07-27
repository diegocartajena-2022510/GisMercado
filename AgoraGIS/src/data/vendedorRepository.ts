import db from './db';
import {Vendedor} from "../models/vendedor";

export class VendedorRepository{
    async listar(): Promise<Vendedor[]>{
        const [rows]: any= await db.query('CALL sp_vendedor_listar()');
        return rows[0] as Vendedor[];
    }

  //buscar
      async buscarPorId(id: number): Promise<Vendedor | null>{
          const [rows]: any= await db.query('CALL sp_vendedor_buscar(?)',[id]);
          const resultado= rows[0];

          if(!resultado || resultado.length===0){
              return null;
          }
          return resultado[0] as Vendedor;
      }

  // agregar
      async agregarVendedor(vendedor: any): Promise<void> {
      const query = 'CALL sp_vendedor_crear(?, ?, ?, ?, ?, ?)';
      const params = [
        Number(vendedor.dpi),
        vendedor.nombre,
        vendedor.apellido,
        Number(vendedor.telefono),
        vendedor.correo,
        vendedor.direccion 
      ];

      await db.query(query, params);
    }
  // eliminar
    async EliminarVendedor(id:number):Promise <void>{
      const query= 'CALL sp_vendedor_eliminar(?)';
      await db.query(query,[id]);

    }
    // editar
    async EditarVedendor(id: number,vendedor:Partial<Vendedor>): Promise<void>{
      const query='CALL sp_vendedor_actualizar(?, ?, ?, ?, ?, ?, ?)'
      const params=[
          id,
        vendedor.dpi,
        vendedor.nombre,
        vendedor.apellido,
        vendedor.telefono,
        vendedor.correo,
        vendedor.direccion
      ];
      await db.query(query,params);
    }    
}


