import{Router,Request,Response} from 'express';
import { InspeccionService } from '../service/inspeccionService';

const router= Router();
const service= new InspeccionService();

router.get('/inspeccion', async (req:Request,res:Response)=>{
    try{
        const inspeccion= await service.ListarInspeccion();
        res.status(200).json(inspeccion);
    }catch(error:any){
        res.status(500).json({mensaje: error.message});
    }
});

router.get('/insapeccion/:id',async (req:Request,res:Response)=>{
    try{
        const id=Number(req.params.id)
        const inspeccion= await service.buscarInspeccion(id);

        if(!inspeccion){
            res.status(404).json({mensaje:"inspeccion no encontrada"});
            return;
        }
        res.status(200).json(inspeccion);
    }catch(error:any){
        res.status(500).json({mennsaje:error.message});
    }
});

router.post('/inspeccion',async (req:Request,res:Response)=>{
    try{
        const inspeccionCreado=req.body;
        await service.agregarInspeccion(inspeccionCreado);
        res.status(200).json({mensaje:"inspeccion creada correctamente"});
    }catch(error:any){
        res.status(500).json({mensaje:error.mensaje});
    }
});

router.put('/inspeccion/:id',async(req:Request,res:Response)=>{
    try{
        const inspeccionNuevo= req.body;
        const id= Number(req.params.id);
        const inspeccionExistente= service.buscarInspeccion(id);
        if(!inspeccionExistente){
            res.status(404).json({mensaje:"inspeccion no encontrada"});
            return;
        }
        await service.editarInspeccion(id,inspeccionNuevo);
        res.status(202).json({mensaje:"inspeccion editada correctamente"});
    }catch(error:any){
        res.status(500).json({mensaje:error.message})
    }
});

// eliminar 

router.delete('/inspeccion/:id', async (req: Request, res: Response)=>{
    try{
        const id=Number(req.params.id);

        const InspeccionExistente= await service.buscarInspeccion(id);
        if(!InspeccionExistente){
            res.status(404).json({mensaje: "inspeccion no encontrada"});
            return;
        }
        await service.eliminarInspeccion(id);
        res.status(202).json({mensaje: "inspeccion eliminada correctamente"});
    }catch(error:any){
        res.status(500).json({mensaje:error.message});
    }
});

export default router;