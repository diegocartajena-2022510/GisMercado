import { usuario } from "../models/usuario";
import { usaurioRepository } from "../data/usuarioRepository";

export class UsuarioService{
    private repo= new usaurioRepository();

    async ListarUsuario(){
        return await this.repo.listar();
    }

    async agregarUsuario(usuario:Partial<usuario>){
        return await this.repo.agregar(usuario);
    }

    async buscarUsuario(id:number){
        return await this.repo.buscarPorId(id);
    }

    async eliminarUsuario(id:number){
        return await this.repo.eliminar(id);
    }
    async editarUsuario(id:number, usuario:Partial<usuario>){
        return await this.repo.editar(id,usuario);
    }
    
}