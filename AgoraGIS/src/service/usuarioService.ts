import { usuario } from "../models/usuario";
import { usaurioRepository } from "../data/usuarioRepository";
import { rolUsuario } from "../models/enums";

export class UsuarioService{
    private repo= new usaurioRepository();

    async ListarUsuario(){
        return await this.repo.listar();
    }

    async agregarUsuario(usuario:Partial<usuario>){
        const rolesVallidos= Object.values(rolUsuario);
        const campostexto=[
            {nombre:'nombre', valor: usuario.nombre},
            { nombre: 'apellido', valor: usuario.apellido },
            { nombre: 'username', valor: usuario.username },
            { nombre: 'correo', valor: usuario.correo }
        ];
        for(const campos of campostexto){
            if(!campos.valor){
                throw new Error(`El campo'${campos.nombre}' no debe ir vacio`);
            }
            if(typeof campos.valor!=='string'){
                throw new Error(`en el campo '${campos.nombre}' debe ser un texto`);
            }
        }
        if(!usuario.rol || !rolesVallidos.includes(usuario.rol)){
            throw new Error(`El rol '${usuario.rol}' no es válido, solo se permite 'ADMINISTRADOR','RECAUDADOR' y 'INSPECTOR'`);
        }
        if(!usuario.correo||!usuario.correo.endsWith("@gmial.com")&&!usuario.correo.endsWith("@hotmail.com")&&!usuario.correo.endsWith("@yahoo.com")){
            throw new Error("correo invalido, solo se permite, 'gmail','hotmail'y 'yahoo' ");
        }
        const correoExistente= await this.repo.buscarPorCorreo(usuario.correo);
        if(correoExistente){
            throw new Error("este correo ya fue registrado, intente de nuevo");
        }
        return await this.repo.agregar(usuario);
    }

    async buscarUsuario(id:number){
        return await this.repo.buscarPorId(id);
    }

    async eliminarUsuario(id:number){
        return await this.repo.eliminar(id);
    }
    async editarUsuario(id:number, usuario:Partial<usuario>){
        const rolesVallidos= Object.values(rolUsuario);
        const campostexto=[
            {nombre:'nombre', valor: usuario.nombre},
            { nombre: 'apellido', valor: usuario.apellido },
            { nombre: 'username', valor: usuario.username },
            { nombre: 'correo', valor: usuario.correo }
        ];
        for(const campos of campostexto){
            if(!campos.valor){
                throw new Error(`El campo'${campos.nombre}' no debe ir vacio`);
            }
            if(typeof campos.valor!=='string'){
                throw new Error(`en el campo '${campos.nombre}' debe ser un texto`);
            }
        }
        if(!usuario.rol || !rolesVallidos.includes(usuario.rol)){
            throw new Error(`El rol '${usuario.rol}' no es válido`);
        }
        if(!usuario.correo||!usuario.correo.endsWith("@gmial.com")||!usuario.correo.endsWith("@hotmail.com")||!usuario.correo.endsWith("@yahoo.com")){
            throw new Error("correo invalido, solo se permite, 'gmail','hotmail'y 'yahoo' ");
        }
        const correoExistente= await this.repo.buscarPorCorreo(usuario.correo);
        if(correoExistente && correoExistente.id_usuario !==id){
            throw new Error("este correo ya fue registrado, intente de nuevo");
        }
        return await this.repo.editar(id,usuario);
    }
    
}