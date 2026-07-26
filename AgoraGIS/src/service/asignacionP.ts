import { asignacionPRepository } from "../data/asignacionP";
import { asignacion_puesto } from "../models/asignacion_puesto";

export class asignacionPService{
    private repo= new asignacionPRepository();

    async ListarAsignacion(){
        return await this.repo.listar();
    }

    async agregarAsignacion(asignacionP:Partial<asignacion_puesto>){
        return await this.repo.agregar(asignacionP);
    }

    async buscarAsignacion(id:number){
        return await this.repo.buscarPorId(id);
    }

    async eliminarAsignacion(id:number){
        return await this.repo.eliminar(id);
    }
    async editarAsignacion(id:number, asigancionP:Partial<asignacion_puesto>){
        return await this.repo.editar(id,asigancionP);
    }
    
}