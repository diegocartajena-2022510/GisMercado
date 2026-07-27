import{Router,Request,Response} from 'express';
import { multaService } from '../service/multaService';

const router= Router();
const service= new multaService();

router.get('/multa', async (req:Request,res:Response)=>{
    try{
        const multa= await service.listarMulta();
        res.status(200).json(multa);
    }catch(error:any){
        res.status(500).json({mensaje: error.message});
    }
});

router.get('/multa/:id',async (req:Request,res:Response)=>{
    try{
        const id=Number(req.params.id)
        const multa= await service.buscarMulta(id);

        if(!multa){
            res.status(404).json({mensaje:"multa no encontrada"});
            return;
        }
        res.status(200).json(multa);
    }catch(error:any){
        res.status(500).json({mennsaje:error.message});
    }
});

router.post('/multa',async (req:Request,res:Response)=>{
    try{
        const multaCreada=req.body;
        await service.agregarMulta(multaCreada);
        res.status(200).json({mensaje:"multa creada correctamente"});
    }catch(error:any){
        res.status(500).json({mensaje:error.mensaje});
    }
});

router.put('/multa/:id',async(req:Request,res:Response)=>{
    try{
        const multaNuevo= req.body;
        const id= Number(req.params.id);
        const multaExistente= service.buscarMulta(id);
        if(!multaExistente){
            res.status(404).json({mensaje:"multa no encontrada"});
            return;
        }
        await service.editarMulta(id,multaNuevo);
        res.status(202).json({mensaje:"multa editada correctamente"});
    }catch(error:any){
        res.status(500).json({mensaje:error.message})
    }
});

// eliminar 

router.delete('/multa/:id', async (req: Request, res: Response)=>{
    try{
        const id=Number(req.params.id);

        const multaExistente= await service.buscarMulta(id);
        if(!multaExistente){
            res.status(404).json({mensaje: "multa no encontrada"});
            return;
        }
        await service.eliminarMulta(id);
        res.status(202).json({mensaje: "multa eliminada correctamente"});
    }catch(error:any){
        res.status(500).json({mensaje:error.message});
    }
});

export default router;