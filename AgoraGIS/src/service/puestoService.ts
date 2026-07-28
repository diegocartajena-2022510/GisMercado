import { PuestoRepository } from "../data/puestoRepository";
import { puesto } from "../models/puesto";

export class PuestoService {
    private repo = new PuestoRepository();

    async Listarpuesto() {
        return await this.repo.listar();
    }

    async agregarPuesto(Puesto: Partial<puesto>) {
        if (
            typeof Puesto.numero_puesto !== 'number' ||
            typeof Puesto.tarifa_mensual !== 'number' ||
            typeof Puesto.id_sector !== 'number' ||
            isNaN(Puesto.numero_puesto) ||
            isNaN(Puesto.tarifa_mensual) ||
            isNaN(Puesto.id_sector)
        ) {
            throw new Error("El numero_puesto, la tarifa_mensual o el id_sector debe ser un número válido");
        }

        return await this.repo.agregar(Puesto);
    }

    async buscarPuesto(id: number) {
        return await this.repo.buscarPorId(id);
    }

    async eliminarPuesto(id: number) {
        return await this.repo.eliminar(id);
    }

    async editarPuesto(id: number, Puesto: Partial<puesto>) {
        if (
            typeof Puesto.numero_puesto !== 'number' ||
            typeof Puesto.tarifa_mensual !== 'number' ||
            typeof Puesto.id_sector !== 'number' ||
            isNaN(Puesto.numero_puesto) ||
            isNaN(Puesto.tarifa_mensual) ||
            isNaN(Puesto.id_sector)
        ) {
            throw new Error("El numero_puesto, la tarifa_mensual o el id_sector debe ser un número válido");
        }

        return await this.repo.editar(id, Puesto);
    }
}