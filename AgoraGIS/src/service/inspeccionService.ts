import { InspeccionRepository } from "../data/inspeccionRepository";
import { inspeccion } from "../models/inspeccion";


export class InspeccionService{
    private repo= new InspeccionRepository();

    async ListarInspeccion(){
        return await this.repo.listar();
    }

    async agregarInspeccion(inspeccion:Partial<inspeccion>){
        return await this.repo.agregar(inspeccion);
    }

    async buscarInspeccion(id:number){
        return await this.repo.buscarPorId(id);
    }

    async eliminarInspeccion(id:number){
        return await this.repo.eliminar(id);
    }
    async editarInspeccion(id:number, inspeccion:Partial<inspeccion>){
        return await this.repo.editar(id,inspeccion);
    }
    
}