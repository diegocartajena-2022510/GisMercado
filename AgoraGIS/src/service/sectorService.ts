import { SectorRepository } from "../data/sectorRepository";
import { sector } from "../models/sector";

export class sectorService{
    private repo= new SectorRepository();

    async ListarSector(){
        return await this.repo.listar();
    }

    async agregarSector(sector:Partial<sector>){
        return await this.repo.agregar(sector);
    }

    async buscarSector(id:number){
        return await this.repo.buscarPorId(id);
    }

    async eliminarSector(id:number){
        return await this.repo.eliminar(id);
    }
    async editarSector(id:number, sector:Partial<sector>){
        return await this.repo.editar(id,sector);
    }
    
}