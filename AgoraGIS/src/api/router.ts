import{Router,Request,Response} from 'express';
import { VendedorService } from '../service/vendedorService';

const router= Router();
const service= new VendedorService();

// listar vendedores
router.get('/vendedor',async (req:Request, res:Response)=>{
    try{
        const vendedores=await service.listarVendedores();
        res.status(200).json(vendedores);
    }catch(error: any){
        res.status(500).json({mensaje: error.message});
    }
});
// buscar por id
router.get('/vendedor/:id',async (req: Request, res:Response)=>{
   try{
        const id=Number(req.params.id);
        const vendedores=await service.BuscarVendedoresPorId(id);
        if(!vendedores){
            res.status(404).json({mensaje: "vendedor no encontrado"});
            return;
        }
        res.status(200).json(vendedores);
   }catch(error: any){
        res.status(500).json({mensaje: error.message});
   }

   
});
// agregar
router.post('/vendedor',async (req:Request, res: Response)=>{
    try{
        const NuevoVendedor=req.body;
        await service.agregarVendedores(NuevoVendedor);
        res.status(201).json({mensaje: "vendedor registrado"});
    }catch(error:any){
        console.error("❌ ERROR REAL DE MYSQL:", error);
        res.status(500).json({mensaje: error.message});
    }
});

export default router;