import { estado_multa } from "./enums";

export interface multa {
    id_multa: number;
    motivo: string;
    monto: number;
    fecha_emision: Date;
    estado: estado_multa;
    id_asignacion: number;
    id_usuario: number;
}