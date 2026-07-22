import {readFile, writeFile} from "fs/promises";  
import {Vendedor} from "../models/vendedor";

export class VendedorRepository{
    private ruta = "./src/data/vendedor.json";

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
    
    async actualizarVendedores(vendedorActualizado: Vendedor): Promise<boolean> {

        try {

            const vendedores = await this.listarVendedores();

            const indice = vendedores.findIndex(
                Vendedor => Vendedor.id_vendedor === vendedorActualizado.id_vendedor
            );

            if (indice === -1) {

                return false;

            }

            vendedores[indice] = vendedorActualizado;

            await writeFile(
                this.ruta,
                JSON.stringify(vendedores, null, 2)
            );

            return true;

        } catch (error) {

            console.log("Error al actualizar.");

            return false;

        }

    }
    async obtenerVendedoresPorId(id: number): Promise<Vendedor | undefined> {

        const usuarios = await this.listarVendedores();

        return usuarios.find(usuario => usuario.id_vendedor === id);

    }


    async eliminarVendedor(id: number): Promise<boolean> {

        try {

            const usuarios = await this.listarVendedores();

            const nuevosUsuarios = usuarios.filter(
                usuario => usuario.id_vendedor !== id
            );

            if (usuarios.length === nuevosUsuarios.length) {

                return false;

            }

            await writeFile(
                this.ruta,
                JSON.stringify(nuevosUsuarios, null, 2)
            );

            return true;

        } catch (error) {

            console.log("Error al eliminar.");

            return false;

        }

    }

    
}
