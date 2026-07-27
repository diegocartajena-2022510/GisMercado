import{Router,Request,Response} from 'express';
import { sectorService } from '../service/sectorService';

const router= Router();
const service= new sectorService();

router.get('/sector', async (req:Request,res:Response)=>{
    try{
        const sector= await service.ListarSector();
        res.status(200).json(sector);
    }catch(error:any){
        res.status(500).json({mensaje: error.message});
    }
});

router.get('/sector/:id',async (req:Request,res:Response)=>{
    try{
        const id=Number(req.params.id)
        const sector= await service.buscarSector(id);

        if(!sector){
            res.status(404).json({mensaje:"asignacion no encontrada"});
            return;
        }
        res.status(200).json(sector);
    }catch(error:any){
        res.status(500).json({mennsaje:error.message});
    }
});

router.post('/sector',async (req:Request,res:Response)=>{
    try{
        const sector=req.body;
        await service.agregarSector(sector);
        res.status(200).json({mensaje:"sector creado correctamente"});
    }catch(error:any){
        res.status(500).json({mensaje:error.mensaje});
    }
});

router.put('/sector/:id',async(req:Request,res:Response)=>{
    try{
        const id= Number(req.params.id);
        const editarS=req.body;
        const sectorExistente= service.buscarSector(id);
        if(!sectorExistente){
            res.status(404).json({mensaje:"sector no encontreado"});
            return;
        }
        await service.editarSector(id,editarS);
        res.status(202).json({mensaje:"sector editado correctamente"});
    }catch(error:any){
        res.status(500).json({mensaje:error.message})
    }
});

// eliminar 

router.delete('/sector/:id', async (req: Request, res: Response)=>{
    try{
        const id=Number(req.params.id);

        const sectorExistente= await service.buscarSector(id);
        if(!sectorExistente){
            res.status(404).json({mensaje: "sector no encpntrado"});
            return;
        }
        await service.eliminarSector(id);
        res.status(202).json({mensaje: "sector eliminado correctamente"});
    }catch(error:any){
        res.status(500).json({mensaje:error.message});
    }
});

export default router;

