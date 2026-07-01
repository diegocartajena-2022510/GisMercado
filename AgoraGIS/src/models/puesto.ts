import { estado } from "./enums";

export interface puesto{
    id_puesto:number;
    numero_puesto:number;
    estado: estado;
    tarifa_mensual: number;
    id_sector:number;
}