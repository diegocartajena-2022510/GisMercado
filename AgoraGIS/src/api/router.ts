import { IncomingMessage, ServerResponse } from "http";
import { VendedorService } from "../service/vendedorService";

const service= new VendedorService();

export async function router(req: IncomingMessage, res: ServerResponse) {
    res.setHeader("Content-Type", "application/json");
    const url = req.url ?? "";
    const metodo = req.method ?? "";

    try{
        if(metodo==="GET" && url==="/vendedores"){
            const vendedores = await service.listarVendedores();
            res.writeHead(200);
            res.end(JSON.stringify(vendedores));
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        res.writeHead(500);
        res.end(JSON.stringify({ error: "Error interno del servidor" }));
    }
}
