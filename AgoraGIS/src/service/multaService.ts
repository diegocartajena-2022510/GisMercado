import { multaRepository } from "../data/multarepository";
import { multa } from "../models/multa";

export class multaService {
    private repo = new multaRepository();

    async listarMulta() {
        return await this.repo.listar();
    }

    async agregarMulta(multa: Partial<multa>) {
        const campostexto = [
            { nombre: 'motivo', valor: multa.motivo }
        ];

        for (const campos of campostexto) {
            if (!campos.valor) {
                throw new Error(`El campo '${campos.nombre}' no debe ir vacío`);
            }
            if (typeof campos.valor !== 'string') {
                throw new Error(`En el campo '${campos.nombre}' debe ser un texto`);
            }
        }

        if (
            typeof multa.monto !== 'number' || 
            typeof multa.id_asignacion !== 'number' || 
            typeof multa.id_usuario !== 'number' || 
            isNaN(multa.monto) || 
            isNaN(multa.id_asignacion) || 
            isNaN(multa.id_usuario)
        ) {
            throw new Error("El monto, id_asignacion o id_usuario debe ser un número válido");
        }

        return await this.repo.agregar(multa);
    }

    async buscarMulta(id: number) {
        return await this.repo.buscarPorId(id);
    }

    async eliminarMulta(id: number) {
        return await this.repo.eliminar(id);
    }

    async editarMulta(id: number, multa: Partial<multa>) {
        const campostexto = [
            { nombre: 'motivo', valor: multa.motivo }
        ];

        for (const campos of campostexto) {
            if (!campos.valor) {
                throw new Error(`El campo '${campos.nombre}' no debe ir vacío`);
            }
            if (typeof campos.valor !== 'string') {
                throw new Error(`En el campo '${campos.nombre}' debe ser un texto`);
            }
        }

        if (
            typeof multa.monto !== 'number' || 
            typeof multa.id_asignacion !== 'number' || 
            typeof multa.id_usuario !== 'number' || 
            isNaN(multa.monto) || 
            isNaN(multa.id_asignacion) || 
            isNaN(multa.id_usuario)
        ) {
            throw new Error("El monto, id_asignacion o id_usuario debe ser un número válido");
        }

        return await this.repo.editar(id, multa);
    }
}