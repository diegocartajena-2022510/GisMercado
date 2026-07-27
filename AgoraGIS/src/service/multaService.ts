import { multaRepository } from "../data/multarepository";
import { multa } from "../models/multa";


export class multaService{
    private repo= new multaRepository();

    async listarMulta(){
        return await this.repo.listar();
    }

    async agregarMulta(multa:Partial<multa>){
        return await this.repo.agregar(multa);
    }

    async buscarMulta(id:number){
        return await this.repo.buscarPorId(id);
    }

    async eliminarMulta(id:number){
        return await this.repo.eliminar(id);
    }
    async editarMulta(id:number, multa:Partial<multa>){
        return await this.repo.editar(id,multa);
    }
    
}