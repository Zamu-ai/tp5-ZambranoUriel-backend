const transaccionModel=require('../models/transaccion.models')
const funcionesTransacciones={}
 
const {Op}=require('sequelize')

funcionesTransacciones.createTransaccion= async(req,res) =>{
    try{
         await transaccionModel.create(req.body)
       
        res.json({
            status:'1',
            msg:'transaccion creada'
        })
    }
    catch(error){
        res.status(500).json({
            status:'0',
            msg:'no se pudo crear'
        })
    }
}

funcionesTransacciones.getTransacciones= async(req,res)=>{
    try{ 
        const transaccionAll = await transaccionModel.findAll();
        res.json(transaccionAll);
    }
    catch(Error){
        res.status(500).json({
            status:'0',
            msg:'no se pudo crear'
        })
    }
}

funcionesTransacciones.transaccionDeCliente= async (req,res) =>{
    try{
        const {email}=req.params
        
        if(!email)
            {res.json({
                status:'0',
                msg:'no se encontró el cliente'
            })}

            const transaccionCliente= await transaccionModel.findAll({
                where:{ emailCliente: email},
                order:[['createdAt','DESC']] 
            });
        
            if(transaccionCliente.length > 0)
                {res.json(transaccionCliente)}
            else{
                res.status(404).json({
                msg:'cliente sin transacciones'
                })
            }
        
    }
    catch(error){
        res.status(500).json({
            status:'0',
            msg:'no se pudo crear'
        })
    }
}


funcionesTransacciones.transaccionIdioma= async (req,res)=>{
    try{
        const {idiomaOrigen,idiomaDestino}=req.params
        
        if(!idiomaOrigen || !idiomaDestino)
        {res.json({
            status:'0',
            msg:'no escribió ningun idioma como parametros'
        })}
        
        const transaccionesIdioma = await transaccionModel.findAll({
            where:{
                [Op.and]:[{idiomaOrigen:idiomaOrigen},
                          {idiomaDestino:idiomaDestino}
                         ]
            },
            order:[['createdAt','DESC']]
        })
    
            if (transaccionesIdioma.length > 0){
                res.json(transaccionesIdioma)
            }
            else {
                res.json({
                    status:'0',
                    msg:'no se pudo encontrar transacciones con esos parametros'
                })
            }
        
    }
    catch(error){

    }
}
module.exports=funcionesTransacciones