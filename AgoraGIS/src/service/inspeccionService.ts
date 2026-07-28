import { InspeccionRepository } from "../data/inspeccionRepository";
import { inspeccion } from "../models/inspeccion";

export class InspeccionService {
    private repo = new InspeccionRepository();

    async ListarInspeccion() {
        return await this.repo.listar();
    }

    async agregarInspeccion(inspeccion: Partial<inspeccion>) {
        const campostexto = [
            { nombre: 'observaciones', valor: inspeccion.observaciones }
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
            typeof inspeccion.id_puesto !== 'number' || 
            typeof inspeccion.id_usuario !== 'number' || 
            isNaN(inspeccion.id_puesto) || 
            isNaN(inspeccion.id_usuario)
        ) {
            throw new Error("El id_puesto o el id_usuario debe ser un número válido");
        }

        return await this.repo.agregar(inspeccion);
    }

    async buscarInspeccion(id: number) {
        return await this.repo.buscarPorId(id);
    }

    async eliminarInspeccion(id: number) {
        return await this.repo.eliminar(id);
    }

    async editarInspeccion(id: number, inspeccion: Partial<inspeccion>) {
        const campostexto = [
            { nombre: 'observaciones', valor: inspeccion.observaciones }
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
            typeof inspeccion.id_puesto !== 'number' || 
            typeof inspeccion.id_usuario !== 'number' || 
            isNaN(inspeccion.id_puesto) || 
            isNaN(inspeccion.id_usuario)
        ) {
            throw new Error("El id_puesto o el id_usuario debe ser un número válido");
        }

        return await this.repo.editar(id, inspeccion);
    }
}