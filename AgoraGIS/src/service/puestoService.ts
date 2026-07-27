import { PuestoRepository } from "../data/puestoRepository";
import { puesto } from "../models/puesto";

export class PuestoService{
    private repo= new PuestoRepository();

    async Listarpuesto(){
        return await this.repo.listar();
    }

    async agregarPuesto(Puesto:Partial<puesto>){
        return await this.repo.agregar(Puesto);
    }

    async buscarPuesto(id:number){
        return await this.repo.buscarPorId(id);
    }

    async eliminarPuesto(id:number){
        return await this.repo.eliminar(id);
    }
    async editarPuesto(id:number, Puesto:Partial<puesto>){
        return await this.repo.editar(id,Puesto);
    }
    
}