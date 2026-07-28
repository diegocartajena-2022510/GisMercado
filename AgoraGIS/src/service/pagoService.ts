import { pagoRepository } from "../data/pagoRepository";
import { pago } from "../models/pago";

export class PagoService {
    private repo = new pagoRepository();

    async ListarPago() {
        return await this.repo.listar();
    }

    async agregarPago(pago: Partial<pago>) {
        if (
            typeof pago.monto_pagado !== 'number' || 
            typeof pago.id_asignacion !== 'number' || 
            isNaN(pago.monto_pagado) || 
            isNaN(pago.id_asignacion)
        ) {
            throw new Error("El monto_pagado o el id_asignacion debe ser un número válido");
        }

        return await this.repo.agregar(pago);
    }

    async buscarPago(id: number) {
        return await this.repo.buscarPorId(id);
    }

    async eliminarPago(id: number) {
        return await this.repo.eliminar(id);
    }

    async editarPago(id: number, pago: Partial<pago>) {
        if (
            typeof pago.monto_pagado !== 'number' || 
            typeof pago.id_asignacion !== 'number' || 
            isNaN(pago.monto_pagado) || 
            isNaN(pago.id_asignacion)
        ) {
            throw new Error("El monto_pagado o el id_asignacion debe ser un número válido");
        }

        return await this.repo.editar(id, pago);
    }
}