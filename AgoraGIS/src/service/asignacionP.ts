import { asignacionPRepository } from "../data/asignacionPRepository";
import { asignacion_puesto } from "../models/asignacion_puesto";

export class asignacionPService {
    private repo = new asignacionPRepository();

    async ListarAsignacion() {
        return await this.repo.listar();
    }

    async agregarAsignacion(asignacionP: Partial<asignacion_puesto>) {
        if (
            typeof asignacionP.id_vendedor !== 'number' || 
            typeof asignacionP.id_puesto !== 'number' || 
            typeof asignacionP.id_giro !== 'number' || 
            isNaN(asignacionP.id_vendedor) || 
            isNaN(asignacionP.id_puesto) || 
            isNaN(asignacionP.id_giro)
        ) {
            throw new Error("El id_vendedor, id_puesto o id_giro debe ser un número válido");
        }

        return await this.repo.agregar(asignacionP);
    }

    async buscarAsignacion(id: number) {
        return await this.repo.buscarPorId(id);
    }

    async eliminarAsignacion(id: number) {
        return await this.repo.eliminar(id);
    }

    async editarAsignacion(id: number, asigancionP: Partial<asignacion_puesto>) {
        if (
            typeof asigancionP.id_vendedor !== 'number' || 
            typeof asigancionP.id_puesto !== 'number' || 
            typeof asigancionP.id_giro !== 'number' || 
            isNaN(asigancionP.id_vendedor) || 
            isNaN(asigancionP.id_puesto) || 
            isNaN(asigancionP.id_giro)
        ) {
            throw new Error("El id_vendedor, id_puesto o id_giro debe ser un número válido");
        }

        return await this.repo.editar(id, asigancionP);
    }
}