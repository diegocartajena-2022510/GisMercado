
import express from 'express';
import { probarConexion } from "./data/db";
import { EmpezarServer } from './api/server';
async function main(){
    await probarConexion();
    EmpezarServer();
}

main();