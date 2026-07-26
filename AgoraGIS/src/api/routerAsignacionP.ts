import{Router,Request,Response} from 'express';
import { asignacionPService } from '../service/asignacionP';

const router= Router();
const service= new asignacionPService();

router.get('/asignacionPuesto', async (req:Request,res:Response)=>{
    try{
        const asignacionP= await service.ListarAsignacion();
        res.status(200).json(asignacionP);
    }catch(error:any){
        res.status(500).json({mensaje: error.message});
    }
});

router.get('/asignacionPuesto/:id',async (req:Request,res:Response)=>{
    try{
        const id=Number(req.params.id)
        const asignacionP= await service.buscarAsignacion(id);

        if(!asignacionP){
            res.status(404).json({mensaje:"asignacion no encontrada"});
            return;
        }
        res.status(200).json(asignacionP);
    }catch(error:any){
        res.status(500).json({mennsaje:error.message});
    }
});

router.post('/asignacionPuesto',async (req:Request,res:Response)=>{
    try{
        const asignacionCreada=req.body;
        await service.agregarAsignacion(asignacionCreada);
        res.status(200).json({mensaje:"asignacion creada correctamente"});
    }catch(error:any){
        res.status(500).json({mensaje:error.mensaje});
    }
});

router.put('/asignacionPuesto/:id',async(req:Request,res:Response)=>{
    try{
        const id= Number(req.params.id);
        const asignacionExistente= service.buscarAsignacion(id);
        if(!asignacionExistente){
            res.status(404).json({mensaje:"asignacion no encontreada"});
            return;
        }
        res.status(202).json({mensaje:"usuario editado correctamente"});
    }catch(error:any){
        res.status(500).json({mensaje:error.message})
    }
});

export default router;

