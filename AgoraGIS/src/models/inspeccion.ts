import { resultado } from "./enumsEntidades";

export interface inspeccion {
    id_inspeccion: number;
    fecha_inspeccion: Date;
    resultado: resultado;
    observaciones: string;

}


