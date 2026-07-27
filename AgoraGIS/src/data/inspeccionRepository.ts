import db from "./db";
import { inspeccion } from "../models/inspeccion";

export class InspeccionRepository{
    async listar(): Promise <inspeccion[]>{
        const [rows]:any= await db.query('CALL sp_inspeccion_listar()');
        return rows[0] as inspeccion[];
    } 

    async buscarPorId(id:number): Promise<inspeccion |null>{
        const [rows]: any= await db.query('sp_inspeccion_buscar(?)',[id]);
        const resultado= rows[0];

        if(!resultado || resultado.length===0){
            return null;
        }
        return resultado[0] as inspeccion;
    }

    async agregar(inspeccion:any): Promise<void>{
        const query: any='CALL sp_inspeccion_crear(?,?,?,?,?)';
        const params=[
            inspeccion.fecha_inspeccion,
            inspeccion.resultado,
            inspeccion.observaciones,
            inspeccion.id_puesto,
            inspeccion.id_usuario,
        ]
        await db.query(query,params);
    }

    async eliminar(id:number): Promise<void>{
        const query= 'CALL sp_inspeccion_eliminar(?)';
        await db.query(query,[id]);    
    }

    async editar( id:number,inspeccion:Partial<inspeccion>):Promise<void>{
        const query='CALL sp_inspeccion_actualizar(?,?,?,?,?,?,?)';
        const params=[
            id,
            inspeccion.fecha_inspeccion,
            inspeccion.resultado,
            inspeccion.observaciones,
            inspeccion.id_puesto,
            inspeccion.id_usuario,
        ]
        await db.query(query,params);
    }
}