import { mercado } from "../models/mercado";
import { MercadoRepository } from "../data/mercadoRepository";


export class mercadoService{
    private repo= new MercadoRepository();

    async ListarMercado(){
        return await this.repo.listar();
    }

    async agregarMercado(mercado:Partial<mercado>){
        return await this.repo.agregar(mercado);
    }

    async buscarMercado(id:number){
        return await this.repo.buscarPorId(id);
    }

    async eliminarMercado(id:number){
        return await this.repo.eliminar(id);
    }
    async editarMercado(id:number, mercado:Partial<mercado>){
        return await this.repo.editar(id,mercado);
    }
    
}