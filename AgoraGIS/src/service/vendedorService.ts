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
        const campostexto=[
                    {nombre:'nombre', valor: vendedor.nombre},
                    { nombre: 'apellido', valor: vendedor.apellido },
                    { nombre: 'correo', valor: vendedor.correo },
                    { nombre: 'direccion', valor: vendedor.direccion }
                ];

        for(const campos of campostexto){
            if(!campos.valor){
                throw new Error(`El campo'${campos.nombre}' no debe ir vacio`);
            }
            if(typeof campos.valor!=='string'){
                throw new Error(`en el campo '${campos.nombre}' debe ser un texto`);
            }
        }
        if (typeof vendedor.telefono !== 'number' ||typeof vendedor.dpi !== 'number' || isNaN(vendedor.telefono)|| isNaN(vendedor.dpi)) {
            throw new Error("El teléfono o el dpi debe ser un número válido");
        }
        if(!vendedor.correo||!vendedor.correo.endsWith("@gmial.com")&&!vendedor.correo.endsWith("@hotmail.com")&&!vendedor.correo.endsWith("@yahoo.com")){
            throw new Error("correo invalido, solo se permite, 'gmail','hotmail'y 'yahoo' ");
        }
        const correoExistente= await this.repo.buscarPorCorreo(vendedor.correo);
        if(correoExistente){
            throw new Error("este correo ya fue registrado, intente de nuevo");
        }
        return await this.repo.agregarVendedor(vendedor);
    }

    async editarVendedores(id:number, vendedor:Partial<Vendedor>){
        const campostexto=[
                    {nombre:'nombre', valor: vendedor.nombre},
                    { nombre: 'apellido', valor: vendedor.apellido },
                    { nombre: 'correo', valor: vendedor.correo },
                    { nombre: 'direccion', valor: vendedor.direccion }
                ];

        for(const campos of campostexto){
            if(!campos.valor){
                throw new Error(`El campo'${campos.nombre}' no debe ir vacio`);
            }
            if(typeof campos.valor!=='string'){
                throw new Error(`en el campo '${campos.nombre}' debe ser un texto`);
            }
        }
        if (typeof vendedor.telefono !== 'number' ||typeof vendedor.dpi !== 'number' || isNaN(vendedor.telefono)|| isNaN(vendedor.dpi)) {
            throw new Error("El teléfono o el dpi debe ser un número válido");
        }
        if(!vendedor.correo||!vendedor.correo.endsWith("@gmial.com")&&!vendedor.correo.endsWith("@hotmail.com")&&!vendedor.correo.endsWith("@yahoo.com")){
            throw new Error("correo invalido, solo se permite, 'gmail','hotmail'y 'yahoo' ");
        }
        
        const correoExistente= await this.repo.buscarPorCorreo(vendedor.correo);

        if(correoExistente && correoExistente.id_vendedor !==id){
            throw new Error("este correo ya fue registrado, intente de nuevo");
        }
        
        return await this.repo.EditarVedendor(id,vendedor);
    }

    async eliminarVendedores(id:number){
        return await this.repo.EliminarVendedor(id);
    }
    

}