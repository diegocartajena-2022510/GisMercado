import { IncomingMessage, ServerResponse } from "http";
import { VendedorService } from "../service/vendedorService";
import { rolUsuario } from "../models/enums";

const service= new VendedorService();

export async function router(req: IncomingMessage, res: ServerResponse) {
    res.setHeader("Content-Type", "application/json");
    const url = req.url ?? "";
    const metodo = req.method ?? "";

    try{
        // mostrar vendedores
        if(metodo==="GET" && url==="/vendedores"){
            const vendedores = await service.listarVendedores();
            res.writeHead(200);
            res.end(JSON.stringify(vendedores));
            return;
        }

        // mosrtar por id
        if(metodo==="GET" && url.startsWith("/vendedores/")){
            const id= Number(url.split("/")[2]);
            const vendedor= await service.buscarVendedorPorId(id);

            if(!vendedor){
                res.writeHead(404);
                res.end(JSON.stringify({
                    mensaje:"usuario no encontrado"
                }));
                return;
            }
            res.writeHead(200);
            res.end(JSON.stringify(vendedor));
        }

        // agregar vendedor
        if(metodo ==="POST"&& url==="/vendedores"){
            let body="";
            req.on("data", (chunk)=>{
                body += chunk;
            });
            req.on("end",async ()=>{
                try{
                    const vendedor=JSON.parse(body);
                    await service.agegarVendedor(vendedor);
                    res.writeHead(201);
                    res.end(JSON.stringify({
                        mensaje: "usuario agregado"
                    }));
                }catch(error){
                    res.writeHead(400);
                    res.end(JSON.stringify({
                        mensaje: (error as Error).message
                    }));
                }
            });
            return;
        }
        // actualizar vendedor
        if (metodo === "PUT" && url.startsWith("/vendedores/")) {

            let body = "";

            req.on("data", chunk => {

                body += chunk;

            });

            req.on("end", async () => {

                try {

                    const vendedor = JSON.parse(body);

                    vendedor.id = Number(url.split("/")[2]);

                    await service.actualizarVendedor(vendedor);

                    res.writeHead(200);

                    res.end(JSON.stringify({
                        mensaje: "vendedor actualizado"
                    }));

                } catch (error) {

                    res.writeHead(400);

                    res.end(JSON.stringify({
                        mensaje: (error as Error).message
                    }));

                }

            });

            return;

        }
        // eliminar vendedor
        if (metodo === "DELETE" && url.startsWith("/vendedores/")) {

            const id = Number(url.split("/")[2]);

            await service.eliminarVendedor(id);

            res.writeHead(200);

            res.end(JSON.stringify({
                mensaje: "vendedor eliminado"
            }));

            return;

        }

        // Ruta no encontrada
        res.writeHead(404);

        res.end(JSON.stringify({
            mensaje: "Ruta no encontrada"
        }));

    } catch (error) {

        res.writeHead(500);

        res.end(JSON.stringify({
            mensaje: (error as Error).message
        }));

    }
    
}

