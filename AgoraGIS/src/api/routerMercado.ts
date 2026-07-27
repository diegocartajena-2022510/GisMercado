import{Router,Request,Response} from 'express';
import { mercadoService } from '../service/mercadoService';

const router= Router();
const service= new mercadoService();

router.get('/mercado', async (req:Request,res:Response)=>{
    try{
        const mercado= await service.ListarMercado();
        res.status(200).json(mercado);
    }catch(error:any){
        res.status(500).json({mensaje: error.message});
    }
});

router.get('/mercado/:id',async (req:Request,res:Response)=>{
    try{
        const id=Number(req.params.id)
        const mercado= await service.buscarMercado(id);

        if(!mercado){
            res.status(404).json({mensaje:"mercado no encontrado"});
            return;
        }
        res.status(200).json(mercado);
    }catch(error:any){
        res.status(500).json({mennsaje:error.message});
    }
});

router.post('/mercado',async (req:Request,res:Response)=>{
    try{
        const mercadoCreado=req.body;
        await service.agregarMercado(mercadoCreado);
        res.status(200).json({mensaje:"mercado creada correctamente"});
    }catch(error:any){
        res.status(500).json({mensaje:error.mensaje});
    }
});

router.put('/mercado/:id',async(req:Request,res:Response)=>{
    try{
        const mercadoCreado= req.body;
        const id= Number(req.params.id);
        const mercadoExistente= service.buscarMercado(id);
        if(!mercadoExistente){
            res.status(404).json({mensaje:"mercado no encontrado"});
            return;
        }
        await service.editarMercado(id,mercadoCreado);
        res.status(202).json({mensaje:"mercadoeditado correctamente"});
    }catch(error:any){
        res.status(500).json({mensaje:error.message})
    }
});

// eliminar 

router.delete('/mercado/:id', async (req: Request, res: Response)=>{
    try{
        const id=Number(req.params.id);

        const mercadoExistente= await service.buscarMercado(id);
        if(!mercadoExistente){
            res.status(404).json({mensaje: "mercado no encontrada"});
            return;
        }
        await service.eliminarMercado(id);
        res.status(202).json({mensaje: "mercado eliminada correctamente"});
    }catch(error:any){
        res.status(500).json({mensaje:error.message});
    }
});

export default router;