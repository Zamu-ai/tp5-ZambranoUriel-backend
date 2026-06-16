const EmpleadoModal=require('./../models/empleado.models')
const funcionesEmpleado={}

funcionesEmpleado.createEmpleado=async(req,res)=>{
    try{
        body=req.body
                    const empleadoExistente = await EmpleadoModal.findOne({ //solo busca un empleado al primero que tenga..
                       where:{dni:body.dni}})
       if(empleadoExistente){
        res.json({
            status:'0',
            msg:'empleado ya existente cree otro '
        })
       }

     const empleado = await EmpleadoModal.create(body)
        res.json(empleado);
    }
    catch(error){  res.status(500).json({
            status:'0',
            msg:'No se pudo crear al empleado'
        })

    }
}

funcionesEmpleado.getEmpleados=async (req,res)=>{
    try{
        const empleados=await EmpleadoModal.findAll()
        if(empleados.length===0)
        {res.json({
            status:'0',
            msg:'no hay empleados cargados'
        })}
        res.json(empleados)

    }
     catch(error){  res.status(500).json({
            status:'0',
            msg:'No se pudo obtener a los empleado'
        })

    }
}

funcionesEmpleado.getEmpleado=async (req,res)=>{
    try{
        const empleado=await EmpleadoModal.findOne({
            where:{id= req.params.id}
        })
        if(!empleado)
        {res.json({
            status:'0',
            msg:'no existe el empleado solicitado'
        })}

        res.json(empleado)

    }
     catch(error){  res.status(500).json({
            status:'0',
            msg:'No se pudo obtener al empleado'
        })

    }
}

module.exports=funcionesEmpleado;