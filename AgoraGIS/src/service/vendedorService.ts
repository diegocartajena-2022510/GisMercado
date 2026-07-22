import { VendedorRepository } from "../data/vendedorRepository";
import { Vendedor } from "../models/vendedor";


export class VendedorService{
    private repo= new VendedorRepository();

    async listarVendedores():Promise<Vendedor[]>{
        return await this.repo.listarVendedores();
    }

    async agegarVendedor(vendedor:Vendedor):Promise<void>{
       const existe = await this.repo.obtenerVendedoresPorId(vendedor.id_vendedor)
       if (existe) {
            throw new Error("El ID ya existe.");
        }

        await this.repo.agregarVendedor(vendedor);
    }

    async buscarVendedorPorId(id_vendedor:number):Promise<Vendedor | undefined>{
        return await this.repo.obtenerVendedoresPorId(id_vendedor);
    }

    async actualizarVendedor(vendedor:Vendedor):Promise<void>{
        const actualizado= await this.repo.actualizarVendedores(vendedor);

        if(!actualizado){
            throw new Error("el usuario no existe")
        }
    }
    
    
    async eliminarVendedor(id_vendedor:number):Promise<void>{

        const eliminado= await this.repo.eliminarVendedor(id_vendedor);
        if(!eliminado){
            throw new Error("El vendedor no existe");
        }
        
    }
}