import { VendedorRepository } from "../data/vendedorRepository";
import { Vendedor } from "../models/vendedor";

export class VendedorService {
    private repo = new VendedorRepository();

    async listarVendedores() {
        return await this.repo.listar();
    }

    async BuscarVendedoresPorId(id: number) {
        return await this.repo.buscarPorId(id);
    }

    async agregarVendedores(vendedor: Partial<Vendedor>) {
        const campostexto = [
            { nombre: 'nombre', valor: vendedor.nombre },
            { nombre: 'apellido', valor: vendedor.apellido },
            { nombre: 'correo', valor: vendedor.correo },
            { nombre: 'direccion', valor: vendedor.direccion },
            { nombre: 'telefono', valor: vendedor.telefono }
        ];

        for (const campos of campostexto) {
            if (!campos.valor) {
                throw new Error(`El campo '${campos.nombre}' no debe ir vacío`);
            }
            if (typeof campos.valor !== 'string') {
                throw new Error(`En el campo '${campos.nombre}' debe ser un texto`);
            }
        }

        if (typeof vendedor.dpi !== 'number' || isNaN(vendedor.dpi)) {
            throw new Error("El DPI debe ser un número válido");
        }

        const esGmail = vendedor.correo?.endsWith("@gmail.com");
        const esHotmail = vendedor.correo?.endsWith("@hotmail.com");
        const esYahoo = vendedor.correo?.endsWith("@yahoo.com");

        if (!vendedor.correo || (!esGmail && !esHotmail && !esYahoo)) {
            throw new Error("Correo inválido, solo se permite 'gmail', 'hotmail' y 'yahoo'");
        }

        const correoExistente = await this.repo.buscarPorCorreo(vendedor.correo);
        if (correoExistente) {
            throw new Error("Este correo ya fue registrado, intente de nuevo");
        }

        return await this.repo.agregarVendedor(vendedor);
    }

    async editarVendedores(id: number, vendedor: Partial<Vendedor>) {
        const campostexto = [
            { nombre: 'nombre', valor: vendedor.nombre },
            { nombre: 'apellido', valor: vendedor.apellido },
            { nombre: 'correo', valor: vendedor.correo },
            { nombre: 'direccion', valor: vendedor.direccion },
            { nombre: 'telefono', valor: vendedor.telefono }
        ];

        for (const campos of campostexto) {
            if (!campos.valor) {
                throw new Error(`El campo '${campos.nombre}' no debe ir vacío`);
            }
            if (typeof campos.valor !== 'string') {
                throw new Error(`En el campo '${campos.nombre}' debe ser un texto`);
            }
        }

        if (typeof vendedor.dpi !== 'number' || isNaN(vendedor.dpi)) {
            throw new Error("El DPI debe ser un número válido");
        }

        const esGmail = vendedor.correo?.endsWith("@gmail.com");
        const esHotmail = vendedor.correo?.endsWith("@hotmail.com");
        const esYahoo = vendedor.correo?.endsWith("@yahoo.com");

        if (!vendedor.correo || (!esGmail && !esHotmail && !esYahoo)) {
            throw new Error("Correo inválido, solo se permite 'gmail', 'hotmail' y 'yahoo'");
        }

        const correoExistente = await this.repo.buscarPorCorreo(vendedor.correo);
        if (correoExistente && correoExistente.id_vendedor !== id) {
            throw new Error("Este correo ya pertenece a otro vendedor registrado");
        }

        return await this.repo.EditarVedendor(id, vendedor);
    }

    async eliminarVendedores(id: number) {
        return await this.repo.EliminarVendedor(id);
    }
}