import{Router,Request,Response} from 'express';
import { PagoService } from '../service/pagoService';

const router= Router();
const service= new PagoService();

router.get('/pago', async (req:Request,res:Response)=>{
    try{
        const pago= await service.ListarPago();
        res.status(200).json(pago);
    }catch(error:any){
        res.status(500).json({mensaje: error.message});
    }
});

router.get('/pago/:id',async (req:Request,res:Response)=>{
    try{
        const id=Number(req.params.id)
        const pago= await service.buscarPago(id);

        if(!pago){
            res.status(404).json({mensaje:"pago no encontrado"});
            return;
        }
        res.status(200).json(pago);
    }catch(error:any){
        res.status(500).json({mennsaje:error.message});
    }
});

router.post('/pago',async (req:Request,res:Response)=>{
    try{
        const pagoCreado=req.body;
        await service.agregarPago(pagoCreado);
        res.status(200).json({mensaje:"pago creado correctamente"});
    }catch(error:any){
        res.status(500).json({mensaje:error.mensaje});
    }
});

router.put('/pago/:id',async(req:Request,res:Response)=>{
    try{
        const pagoNuevo= req.body;
        const id= Number(req.params.id);
        const pagoExistente= service.buscarPago(id);
        if(!pagoExistente){
            res.status(404).json({mensaje:"pago no encontrado"});
            return;
        }
        await service.editarPago(id,pagoNuevo);
        res.status(202).json({mensaje:"pago editado correctamente"});
    }catch(error:any){
        res.status(500).json({mensaje:error.message})
    }
});

// eliminar 

router.delete('/pago/:id', async (req: Request, res: Response)=>{
    try{
        const id=Number(req.params.id);

        const pagoExistente= await service.buscarPago(id);
        if(!pagoExistente){
            res.status(404).json({mensaje: "pago no encontrado"});
            return;
        }
        await service.eliminarPago(id);
        res.status(202).json({mensaje: "puesto eliminada correctamente"});
    }catch(error:any){
        res.status(500).json({mensaje:error.message});
    }
});

export default router;