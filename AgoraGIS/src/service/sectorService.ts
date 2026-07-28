import { SectorRepository } from "../data/sectorRepository";
import { sector } from "../models/sector";

export class sectorService {
    private repo = new SectorRepository();

    async ListarSector() {
        return await this.repo.listar();
    }

    async agregarSector(sector: Partial<sector>) {
        const campostexto = [
            { nombre: 'nombre_sector', valor: sector.nombre_sector }
        ];

        for (const campos of campostexto) {
            if (!campos.valor) {
                throw new Error(`El campo '${campos.nombre}' no debe ir vacío`);
            }
            if (typeof campos.valor !== 'string') {
                throw new Error(`En el campo '${campos.nombre}' debe ser un texto`);
            }
        }

        if (typeof sector.id_mercado !== 'number' || isNaN(sector.id_mercado)) {
            throw new Error("El id_mercado debe ser un número válido");
        }

        return await this.repo.agregar(sector);
    }

    async buscarSector(id: number) {
        return await this.repo.buscarPorId(id);
    }

    async eliminarSector(id: number) {
        return await this.repo.eliminar(id);
    }

    async editarSector(id: number, sector: Partial<sector>) {
        const campostexto = [
            { nombre: 'nombre_sector', valor: sector.nombre_sector }
        ];

        for (const campos of campostexto) {
            if (!campos.valor) {
                throw new Error(`El campo '${campos.nombre}' no debe ir vacío`);
            }
            if (typeof campos.valor !== 'string') {
                throw new Error(`En el campo '${campos.nombre}' debe ser un texto`);
            }
        }

        if (typeof sector.id_mercado !== 'number' || isNaN(sector.id_mercado)) {
            throw new Error("El id_mercado debe ser un número válido");
        }

        return await this.repo.editar(id, sector);
    }
}