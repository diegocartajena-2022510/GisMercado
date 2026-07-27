import db from "./db";
import { asignacion_puesto } from "../models/asignacion_puesto";

export class asignacionPRepository{
    async listar(): Promise <asignacion_puesto[]>{
        const [rows]:any= await db.query('CALL sp_puesto_listar()');
        return rows[0] as asignacion_puesto[];
    } 

    async buscarPorId(id:number): Promise<asignacion_puesto |null>{
        const [rows]: any= await db.query('sp_puesto_buscar(?)',[id]);
        const resultado= rows[0];

        if(!resultado || resultado.length===0){
            return null;
        }
        return resultado[0] as asignacion_puesto;
    }

    async agregar(asignacion_puesto:any): Promise<void>{
        const query: any='CALL sp_puesto_crear(?,?,?,?,?,?)';
        const params=[
            asignacion_puesto.fecha_inicio,
            asignacion_puesto.fecha_fin,
            asignacion_puesto.estado_contrato,
            asignacion_puesto.id_vendedor,
            asignacion_puesto.id_puesto,
            asignacion_puesto.id_giro
        ]
        await db.query(query,params);
    }

    async eliminar(id:number): Promise<void>{
        const query= 'CALL sp_puesto_eliminar(?)';
        await db.query(query,[id]);    
    }

    async editar( id:number,asignacion_puesto:Partial<asignacion_puesto>):Promise<void>{
        const query='CALL sp_puesto_actualizar(?,?,?,?,?,?,?)';
        const params=[
            id,
            asignacion_puesto.fecha_inicio,
            asignacion_puesto.fecha_fin,
            asignacion_puesto.estado_contrato,
            asignacion_puesto.id_vendedor,
            asignacion_puesto.id_puesto,
            asignacion_puesto.id_giro
        ]
        await db.query(query,params);
    }
}