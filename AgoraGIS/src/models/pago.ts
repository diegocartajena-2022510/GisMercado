export interface pago{
    id_pago:number;
    monto_pagado: number;
    fecha_pago: Date;
    mes_correspondiente: string;
    numero_recibo_municipal: number;
    estado_pago: string;
    id_asignacion:number;
   
}