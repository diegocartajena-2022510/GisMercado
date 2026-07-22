import { VendedorRepository } from "../data/vendedorRepository";
import { Vendedor } from "../models/vendedor";


export class VendedorService{
    private repo= new VendedorRepository();

    async listarVendedores():Promise<Vendedor[]>{
        return await this.repo.listarVendedores();
    }

    async agegarVendedor(vendedor:Vendedor):Promise<void>{
        const existe= await this.repo.buscarVendedorPorId(vendedor.id_vendedor);
        if(existe){
            throw new Error("El vendedor ya existe");
        }
        await this.repo.agregarVendedor(vendedor);
    }

    async buscarVendedorPorId(id_vendedor:number):Promise<Vendedor | null>{
        return await this.repo.buscarVendedorPorId(id_vendedor);
    }

    async actualizarVendedor(id_vendedor:number, vendedorActualizado:Vendedor):Promise<void>{
        const existe= await this.repo.buscarVendedorPorId(id_vendedor);
        if(existe){
            throw new Error("El vendedor ya existe");
        }
        await this.repo.actualizarVendedor(id_vendedor, vendedorActualizado);
    }
    
    async eliminarVendedor(id_vendedor:number):Promise<void>{
        const existe= await this.repo.buscarVendedorPorId(id_vendedor);
        if(!existe){
            throw new Error("El vendedor no existe");
        }
        await this.repo.eliminarVendedor(id_vendedor);
    }
}