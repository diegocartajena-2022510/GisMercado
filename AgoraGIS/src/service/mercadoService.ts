import { mercado } from "../models/mercado";
import { MercadoRepository } from "../data/mercadoRepository";

export class mercadoService {
    private repo = new MercadoRepository();

    async ListarMercado() {
        return await this.repo.listar();
    }

    async agregarMercado(mercado: Partial<mercado>) {
        const campostexto = [
            { nombre: 'nombre_mercado', valor: mercado.nombre_mercado },
            { nombre: 'direccion', valor: mercado.direccion }
        ];

        for (const campos of campostexto) {
            if (!campos.valor) {
                throw new Error(`El campo '${campos.nombre}' no debe ir vacío`);
            }
            if (typeof campos.valor !== 'string') {
                throw new Error(`En el campo '${campos.nombre}' debe ser un texto`);
            }
        }

        return await this.repo.agregar(mercado);
    }

    async buscarMercado(id: number) {
        return await this.repo.buscarPorId(id);
    }

    async eliminarMercado(id: number) {
        return await this.repo.eliminar(id);
    }

    async editarMercado(id: number, mercado: Partial<mercado>) {
        const campostexto = [
            { nombre: 'nombre_mercado', valor: mercado.nombre_mercado },
            { nombre: 'direccion', valor: mercado.direccion }
        ];

        for (const campos of campostexto) {
            if (!campos.valor) {
                throw new Error(`El campo '${campos.nombre}' no debe ir vacío`);
            }
            if (typeof campos.valor !== 'string') {
                throw new Error(`En el campo '${campos.nombre}' debe ser un texto`);
            }
        }

        return await this.repo.editar(id, mercado);
    }
}