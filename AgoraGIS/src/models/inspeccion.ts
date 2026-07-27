import { resultado } from "./enums";
export interface inspeccion {
    id_inspeccion: number;
    fecha_inspeccion: Date;
    resultado: resultado;
    observaciones: string;
    id_puesto: number;
    id_usuario:number;

}


