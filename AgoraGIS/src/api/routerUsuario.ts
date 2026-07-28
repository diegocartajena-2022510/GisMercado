import{Router,Request,Response} from 'express';
import { UsuarioService } from '../service/usuarioService';

const router= Router();
const service= new UsuarioService();

router.get('/usuario', async (req:Request,res:Response)=>{
    try{
        const usuario= await service.ListarUsuario();
        res.status(200).json(usuario);
    }catch(error:any){
        res.status(500).json({mensaje: error.message});
    }
});

router.get('/usuario/:id',async (req:Request,res:Response)=>{
    try{
        const id=Number(req.params.id)
        const usuario= await service.buscarUsuario(id);

        if(!usuario){
            res.status(404).json({mensaje:"usuario no encontrado"});
            return;
        }
        res.status(200).json(usuario);
    }catch(error:any){
        res.status(500).json({mennsaje:error.message});
    }
});

router.post('/usuario',async (req:Request,res:Response)=>{
    try{
        const usuarioCreado=req.body;
        await service.agregarUsuario(usuarioCreado);
        res.status(200).json({mensaje:"usuario creado correctamente"});
    }catch(error:any){
        res.status(500).json({mensaje:error.message});
    }
});

router.put('/usuario/:id',async(req:Request,res:Response)=>{
    try{
        const usuarioNuevo= req.body;
        const id= Number(req.params.id);
        const usuarioExistente= service.buscarUsuario(id);
        if(!usuarioExistente){
            res.status(404).json({mensaje:"usuario no encontrado"});
            return;
        }
        await service.editarUsuario(id,usuarioNuevo);
        res.status(202).json({mensaje:"usuario editado correctamente"});
    }catch(error:any){
        res.status(500).json({mensaje:error.message})
    }
});

// eliminar 

router.delete('/usuario/:id', async (req: Request, res: Response)=>{
    try{
        const id=Number(req.params.id);

        const usuarioExistente= await service.buscarUsuario(id);
        if(!usuarioExistente){
            res.status(404).json({mensaje: "pago no encontrado"});
            return;
        }
        await service.eliminarUsuario(id);
        res.status(202).json({mensaje: "usuario eliminado correctamente"});
    }catch(error:any){
        res.status(500).json({mensaje:error.message});
    }
});

export default router;