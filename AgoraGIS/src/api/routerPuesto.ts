import{Router,Request,Response} from 'express';
import { PuestoService } from '../service/puestoService';

const router= Router();
const service= new PuestoService();

router.get('/puesto', async (req:Request,res:Response)=>{
    try{
        const puesto= await service.Listarpuesto();
        res.status(200).json(puesto);
    }catch(error:any){
        res.status(500).json({mensaje: error.message});
    }
});

router.get('/puesto/:id',async (req:Request,res:Response)=>{
    try{
        const id=Number(req.params.id)
        const puesto= await service.buscarPuesto(id);

        if(!puesto){
            res.status(404).json({mensaje:"puesto no encontrado"});
            return;
        }
        res.status(200).json(puesto);
    }catch(error:any){
        res.status(500).json({mennsaje:error.message});
    }
});

router.post('/puesto',async (req:Request,res:Response)=>{
    try{
        const puestoCreado=req.body;
        await service.agregarPuesto(puestoCreado);
        res.status(200).json({mensaje:"puesto creada correctamente"});
    }catch(error:any){
        res.status(500).json({mensaje:error.mensaje});
    }
});

router.put('/puesto/:id',async(req:Request,res:Response)=>{
    try{
        const puestoNuevo= req.body;
        const id= Number(req.params.id);
        const puestoExistente= service.buscarPuesto(id);
        if(!puestoExistente){
            res.status(404).json({mensaje:"puesto no encontrado"});
            return;
        }
        await service.editarPuesto(id,puestoNuevo);
        res.status(202).json({mensaje:"puesto editado correctamente"});
    }catch(error:any){
        res.status(500).json({mensaje:error.message})
    }
});

// eliminar 

router.delete('/puesto/:id', async (req: Request, res: Response)=>{
    try{
        const id=Number(req.params.id);

        const puestoExistente= await service.buscarPuesto(id);
        if(!puestoExistente){
            res.status(404).json({mensaje: "puesto no encontrado"});
            return;
        }
        await service.eliminarPuesto(id);
        res.status(202).json({mensaje: "puesto eliminada correctamente"});
    }catch(error:any){
        res.status(500).json({mensaje:error.message});
    }
});

export default router;