const Empleado=require('./../models/empleado.models')
const PublicacionModal=require('./../models/publicacion.models')
const publicacionFunciones={}
const {Op} = require('sequelize')

publicacionFunciones.createPubli=async(req,res)=>{
    try{const body=req.body
        const publi= await PublicacionModal.create(body);
        if(body.empleado=='')
        {res.json({
            status:'0',
            msg:'no se envió ningun empleado'
        })}
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
                Modal:Empleado,
                as:empleado
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

publicacionFunciones.delete=async (req,res)=>{
    try{const {empleado, titulo}=req.body
        const publiExistente= await PublicacionModal.findOne({
            [Op.and]:[{empleado:empleado},
                      {titulo:titulo}
            ]
        })
        if(!publiExistente){
            res.json({
                status:'0',
                msg:'no se encontró publicacion del empleado'
            })
        }
        await publiExistente.destroy();

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
    try{const {empleado, titulo}=req.body
        const publiExistente= await PublicacionModal.findOne({
            [Op.and]:[{empleado:empleado},
                      {titulo:titulo}
            ]
        })
        if(!publiExistente){
            res.json({
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
        const{titulo,vigente}=req.body
        const publis= await PublicacionModal.findAll({
            [Op.and]:[ 
                {titulo: {[Op.like]: `%${titulo}%`}},
                        {vigente:vigente}
            ]
        })
        if(!publis)
        {res.json({
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