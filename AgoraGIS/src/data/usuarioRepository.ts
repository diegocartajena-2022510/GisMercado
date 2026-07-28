import db from "./db";
import { usuario } from "../models/usuario";

export class usaurioRepository{
    async listar(): Promise <usuario[]>{
        const [rows]:any= await db.query('CALL sp_usuario_listar()');
        return rows[0] as usuario[];
    } 

    async buscarPorId(id:number): Promise<usuario |null>{
        const [rows]: any= await db.query('sp_usuario_buscar(?)',[id]);
        const resultado= rows[0];

        if(!resultado || resultado.length===0){
            return null;
        }
        return resultado[0] as usuario;
    }

    async agregar(usuario:any): Promise<void>{
        const query: any='CALL sp_usuario_crear(?,?,?,?,?,?)';
        const params=[
            usuario.pasword,
            usuario.username,
            usuario.nombre,
            usuario.apellido,
            usuario.correo,
            usuario.rol
        ]
        await db.query(query,params);
    }

    async eliminar(id:number): Promise<void>{
        const query= 'CALL sp_usuario_eliminar(?)';
        await db.query(query,[id]);    
    }

    async editar( id:number,usuario:Partial<usuario>):Promise<void>{
        const query='CALL sp_usuario_actualizar(?,?,?,?,?,?,?)';
        const params=[
            id,
            usuario.pasword,
            usuario.username,
            usuario.nombre,
            usuario.apellido,
            usuario.correo,
            usuario.rol
        ]
        await db.query(query,params);
    }
    async buscarPorCorreo(correo:string): Promise<usuario |null>{
        const [rows]: any= await db.query('SELECT * FROM usuario WHERE correo =?',
            [correo]);

        if(!rows || rows.length===0){
            return null;
        }
        return rows[0] as usuario;
    }
}