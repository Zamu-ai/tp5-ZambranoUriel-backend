const Empleado=require('./../models/empleado.models')
const PublicacionModal=require('./../models/publicacion.models')
const publicacionFunciones={}
const {Op} = require('sequelize')

publicacionFunciones.createPubli=async(req,res)=>{
    try{const body=req.body
        if(!body.empleadoId)
            {return res.status(404).json({
                status:'0',
                msg:'no se envió ningun empleado'
            })}
            const publi= await PublicacionModal.create(body);
        res.json(publi);
    }
    catch(error){
        res.status(505).json({
            status:'0',
            msg:'fallo de la operacion de creacion'
        }
        )
    }
}

publicacionFunciones.getPublis=async(req,res)=>{
    try{
        const publicaciones= await PublicacionModal.findAll({
            include:[{
                model:Empleado,
                as:'empleado'
                    }]
        });
        res.json(publicaciones)
    }
     catch(error){
        res.status(505).json({
            status:'0',
            msg:'fallo de la operacion de obtencion de publicaciones'
        }
        )
    }
}

publicacionFunciones.deletePubli=async (req,res)=>{
    try{const {empleadoId, titulo}=req.params
        const publiExistente= await PublicacionModal.findOne({
            where:{empleadoId: empleadoId,
                      titulo: titulo
        }
        })
        if(!publiExistente){
           return res.status(404).json({
                status:'0',
                msg:'no se encontró publicacion del empleado'
            })
        }
        await publiExistente.destroy();

        res.json({
            status:'1',
            msg:'Publicacion eliminada'
        })
    }
    catch(error){
        res.status(505).json({
            status:'0',
            msg:'fallo de la operacion de eliminacion de la publicacion'
        }
        )
    }
}

publicacionFunciones.updatePubli=async (req,res)=>{
    try{const {empleado, titulo}=req.params
        const publiExistente= await PublicacionModal.findOne({
            where:{empleado:empleado,
                      titulo:titulo
                   }
        })
        if(!publiExistente){
            return res.status(404).json({
                status:'0',
                msg:'no se encontró publicacion del empleado'
            })
        }
        await publiExistente.update(req.body);

    }
    catch(error){
        res.status(505).json({
            status:'0',
            msg:'fallo de la operacion de modificacion de la publicacion'
        }
        )
    }
}



publicacionFunciones.getPublisVigentes=async(req,res)=>{
    try{
        const{titulo,vigente}=req.params
        const publis= await PublicacionModal.findAll({
            where:{
                [Op.and]:[ 
                    {titulo: {[Op.like]: `%${titulo}%`}},
                            {vigente:vigente === 'true' || vigente ===true}
                         ]
            }
        })
        if(!publis)
        {return res.status(404).json({
            status:'0',
            msg:'no existen publicaciones que cumplan con esas caracteristicas'
        })}

        res.json(publis)

        }
    catch(error){
        res.status(505).json({
            status:'0',
            msg:'fallo de la operacion de obtener todas las publicaciones'
        }
        )
    }
}


module.exports=publicacionFunciones;