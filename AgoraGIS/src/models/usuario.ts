import { rolUsuario } from "./enums";

export interface usuario {
    id_usuario: number;
    username: string;
    pasword: string;
    nombre: string;
    apellido: string;
    correo: string;
    rol: rolUsuario;
}