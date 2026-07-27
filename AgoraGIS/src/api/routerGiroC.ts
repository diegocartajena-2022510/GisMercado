import{Router,Request,Response} from 'express';
import { giroCService } from '../service/giroCService';

const router= Router();
const service= new giroCService();

router.get('/giroComercial', async (req:Request,res:Response)=>{
    try{
        const giroC= await service.ListarGiro();
        res.status(200).json(giroC);
    }catch(error:any){
        res.status(500).json({mensaje: error.message});
    }
});

router.get('/giroComercial/:id',async (req:Request,res:Response)=>{
    try{
        const id=Number(req.params.id)
        const giroC= await service.buscarGiro(id);

        if(!giroC){
            res.status(404).json({mensaje:"giro comerical no encontrado"});
            return;
        }
        res.status(200).json(giroC);
    }catch(error:any){
        res.status(500).json({mennsaje:error.message});
    }
});

router.post('/giroComercial',async (req:Request,res:Response)=>{
    try{
        const giroCreado=req.body;
        await service.agregarGiro(giroCreado);
        res.status(200).json({mensaje:"giro comercial creada correctamente"});
    }catch(error:any){
        res.status(500).json({mensaje:error.mensaje});
    }
});

router.put('/giroComercial/:id',async(req:Request,res:Response)=>{
    try{
        const giroEditaro= req.body;
        const id= Number(req.params.id);
        const giroExistente= service.buscarGiro(id);
        if(!giroExistente){
            res.status(404).json({mensaje:"giro comercial no encontrado"});
            return;
        }
        await service.editarGiro(id,giroEditaro);
        res.status(202).json({mensaje:"giro comercial editado correctamente"});
    }catch(error:any){
        res.status(500).json({mensaje:error.message})
    }
});

// eliminar 

router.delete('/giroComercial/:id', async (req: Request, res: Response)=>{
    try{
        const id=Number(req.params.id);

        const giroExistente= await service.buscarGiro(id);
        if(!giroExistente){
            res.status(404).json({mensaje: "giro comercial no encontrada"});
            return;
        }
        await service.eliminarGiro(id);
        res.status(202).json({mensaje: "giro comercial eliminada correctamente"});
    }catch(error:any){
        res.status(500).json({mensaje:error.message});
    }
});

export default router;