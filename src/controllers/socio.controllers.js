const { Op } = require('sequelize'); //es un objeto con metodos dentro que contienen simbolos
const SocioModel= require('../models/socio.models')
const metodosDelSocio={};

metodosDelSocio.recuperarAll= async (req,res) =>{
    try{
        const socios= await SocioModel.findAll()
        res.json(socios)
    }
    catch(error){
        res.status(500).json({
            status:'0',
            msg:'No se pudo obtener socios'
        })
    }
}

metodosDelSocio.eliminar= async (req,res) => {
    try{
        const socio= await SocioModel.findByPk(req.params.id)
        if(socio)
            {await sector.destroy() //elimina solo el objeto encontrado anteriormente, si lo encuentra
            }
        else
            {res.status(404).json({
                msg:'0',
                msg:'no se encontró al socio'
            })}
    }
    catch(error){
        res.status(500).json({
            status:'0',
            msg:'No se pudo eliminar socio'
        })}
}

metodosDelSocio.editarSocio= async (req,res)=>{
    try{
        const socio = await SocioModel.findByPk(req.params.id)
        if(socio)
        {await socio.update(req.body)
        }
        else
        {res.status(500).json({
            status:'0',
            msg:'No se encontró al socio'
        })}

    }
    catch(error){
        res.status(404).json({
            status:'0',
            msg:'No se pudo editar socio'
        })}
}

metodosDelSocio.recuperActivos=async (req,res) =>{
    try{ 
        const activos= await SocioModel.findAll({
            where:{activo: true}
        })
        res.json(activos)
    }
    catch(error){
         res.status(500).json({
            status:'0',
            msg:'No se pudo recuperar socios activos'
        })
    }
}

metodosDelSocio.createSocio=async (req,res)=>{
        try{ body=req.body
            const socioExistente = await SocioModel.findOne({ //solo busca un socio al primero que tenga..
               where:{
                [Op.or]:[ //tiene dni y numero de socio igual a otro socio
                    {dni:body.dni},
                    {numeroSocio:body.numeroSocio}
                ]
               } 
            })
            if(socioExistente){
                let conflicto='';
                if(socioExistente.dni === body.dni)
                    {conflicto= 'DNI'}
                else if(socioExistente.numeroSocio===body.numeroSocio)
                    {conflicto='Numero de socio'
                    }
                    res.status(400).json({
                        status:'0',
                        msg:'ya existe un socio con ese $(conflicto)'
                    })
            }
            await SocioModel.create(body)
            res.json({
                status:'1',
                msg:'se creó al socio de forma exitosa'
            })

        }
        catch(error){
            res.status(500).json({
                    status:'0',
                    msg:'No se pudo obtener socios'
                })
        }
}
module.exports=metodosDelSocio