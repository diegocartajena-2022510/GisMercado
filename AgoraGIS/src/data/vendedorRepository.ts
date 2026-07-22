import {readFile, writeFile} from "fs/promises";  
import {Vendedor} from "../models/vendedor";

export class VendedorRepository{

    async listarVendedores():Promise<Vendedor[]>{
        try{
            const data = await readFile("src/data/vendedor.json", "utf-8");
            return JSON.parse(data);
        }catch(error){
            console.error("Error al leer el archivo de vendedores:", error);
            return [];



        }
    }

    async agregarVendedor(nuevoVendedor:Vendedor):Promise<void>{
        try{
            const vendedores = await this.listarVendedores();
            vendedores.push(nuevoVendedor);
            await writeFile("src/data/vendedor.json", JSON.stringify(vendedores, null, 2), "utf-8");
        }catch(error){
            console.error("Error al agregar un nuevo vendedor:", error);
        }
    }
    async eliminarVendedor(id_vendedor:number):Promise<void>{
        try{
            const vendedores = await this.listarVendedores();
            const vendedoresActualizados = vendedores.filter(vendedor => vendedor.id_vendedor !== id_vendedor);
            await writeFile("src/data/vendedor.json", JSON.stringify(vendedoresActualizados, null, 2), "utf-8");
        }catch(error){
            console.error("Error al eliminar un vendedor:", error);
        }
    }
    async buscarVendedorPorId(id_vendedor:number):Promise<Vendedor | null>{
        try{
            const vendedores = await this.listarVendedores();
            const vendedorEncontrado = vendedores.find(vendedor => vendedor.id_vendedor === id_vendedor);
            return vendedorEncontrado || null;
        }catch(error){
            console.error("Error al buscar un vendedor por ID:", error);
            return null;
        }
    }

    async actualizarVendedor(id_vendedor:number, vendedorActualizado:Vendedor):Promise<void>{
        try{
            const vendedores = await this.listarVendedores();
            const index = vendedores.findIndex(vendedor => vendedor.id_vendedor === id_vendedor);
            if(index !== -1){
                vendedores[index] = vendedorActualizado;
                await writeFile("src/data/vendedor.json", JSON.stringify(vendedores, null, 2), "utf-8");
            }else{
                console.error("Vendedor no encontrado para actualizar");
            }
        }catch(error){
            console.error("Error al actualizar un vendedor:", error);
        }
    }
}
