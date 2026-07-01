import { estado_pago } from "./enums";

export interface pago{
    id_pago:number;
    monto_pagado: number;
    fecha_pago: Date;
    mes_correspondiente: string;
    numero_recibo_municipal: number;
    estado_pago: estado_pago;
    id_asignacion:number;
}