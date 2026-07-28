import { giro_comercial } from "../models/giro_comercial";
import { giro_comercialRepository } from "../data/giroCRepository";

export class giroCService {
    private repo = new giro_comercialRepository();

    async ListarGiro() {
        return await this.repo.listar();
    }

    async agregarGiro(giroC: Partial<giro_comercial>) {
        const campostexto = [
            { nombre: 'nombre_giro', valor: giroC.nombre_giro }
        ];

        for (const campos of campostexto) {
            if (!campos.valor) {
                throw new Error(`El campo '${campos.nombre}' no debe ir vacío`);
            }
            if (typeof campos.valor !== 'string') {
                throw new Error(`En el campo '${campos.nombre}' debe ser un texto`);
            }
        }

        return await this.repo.agregar(giroC);
    }

    async buscarGiro(id: number) {
        return await this.repo.buscarPorId(id);
    }

    async eliminarGiro(id: number) {
        return await this.repo.eliminar(id);
    }

    async editarGiro(id: number, giroC: Partial<giro_comercial>) {
        const campostexto = [
            { nombre: 'nombre_giro', valor: giroC.nombre_giro }
        ];

        for (const campos of campostexto) {
            if (!campos.valor) {
                throw new Error(`El campo '${campos.nombre}' no debe ir vacío`);
            }
            if (typeof campos.valor !== 'string') {
                throw new Error(`En el campo '${campos.nombre}' debe ser un texto`);
            }
        }

        return await this.repo.editar(id, giroC);
    }
}