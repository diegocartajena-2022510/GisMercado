import db from './db';
import {Vendedor} from "../models/vendedor";

export class VendedorRepository{
    async listar(): Promise<Vendedor[]>{
        const [rows]: any= await db.query('CALL sp_vendedor_listar()');
        return rows[0] as Vendedor[];
    }

    async buscarPorId(id: number): Promise<Vendedor | null>{
        const [rows]: any= await db.query('sp_vendedor_buscar(?)',[id]);
        const resultado= rows[0];

        if(!resultado || resultado.length===0){
            return null;
        }
        return resultado[0] as Vendedor;
    }

    async agregarVendedor(vendedor: any): Promise<void> {
    const query = 'CALL sp_vendedor_crear(?, ?, ?, ?, ?, ?)';
    const params = [
      Number(vendedor.dpi),        // p_dpi INT
      vendedor.nombre,             // p_nombre VARCHAR
      vendedor.apellido,           // p_apellido VARCHAR
      Number(vendedor.telefono),   // p_telefono INT
      vendedor.correo,             // p_correo VARCHAR
      vendedor.direccion           // p_direccion VARCHAR
    ];

    await db.query(query, params);
  }
    
    

    
}


