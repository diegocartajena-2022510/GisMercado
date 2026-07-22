import { createServer } from "http";
import { router } from "./router";

export const EmpezarServer = () => {
    const servidor = createServer(async(req, res) => {
        await router(req, res);
    });

    servidor.listen(3000, () => {
        console.log("===================================");

        console.log("Servidor iniciado");

        console.log("http://localhost:3000");

        console.log("===================================");
    });

}