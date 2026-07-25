import { VendedorRepository } from "../data/vendedorRepository";
import { Vendedor } from "../models/vendedor";


export class VendedorService{
    private repo= new VendedorRepository();

    async listarVendedores(){
        return await this.repo.listar();
    }

    async BuscarVendedoresPorId(id: number){
       return await this.repo.buscarPorId(id);
    }

    async agregarVendedores(vendedor: Partial<Vendedor>){
        return await this.repo.agregarVendedor(vendedor);
    }

    async editarVendedores(id:number, vendedor:Partial<Vendedor>){
        return await this.repo.EditarVedendor(id,vendedor);
    }

    async eliminarVendedores(id:number){
        return await this.repo.EliminarVendedor(id);
    }
    

}