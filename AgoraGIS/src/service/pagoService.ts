import { pagoRepository } from "../data/pagoRepository";
import { pago } from "../models/pago";
export class PagoService{
    private repo= new pagoRepository();

    async ListarPago(){
        return await this.repo.listar();
    }

    async agregarPago(pago:Partial<pago>){
        return await this.repo.agregar(pago);
    }

    async buscarPago(id:number){
        return await this.repo.buscarPorId(id);
    }

    async eliminarPago(id:number){
        return await this.repo.eliminar(id);
    }
    async editarPago(id:number, pago:Partial<pago>){
        return await this.repo.editar(id,pago);
    }
    
}