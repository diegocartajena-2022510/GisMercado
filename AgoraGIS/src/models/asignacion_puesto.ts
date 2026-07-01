import { estado_contrato } from "./enums";

export interface asignacion_puesto{
    id_asignacion:number;
    fecha_inicio: Date;
    fecha_fin: Date;
    estado_contrato: estado_contrato;
    id_vendedor:number;
    id_puesto:number;
    id_giro:number;
}