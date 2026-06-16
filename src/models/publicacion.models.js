const {DataTypes}= require('sequelize')
const ConexionABd= require('../../config/database')
const Empleado=require('../models/empleado.models')
const Publicacion=ConexionABd.define('Publicacion',{
    titulo:{type:DataTypes.STRING,allowNull:false},
    contenido:{type:DataTypes.STRING,allowNull:false},
    imagenAsociada:{type:DataTypes.STRING,allowNull:false},
    fechaPublicacion:{type:DataTypes.STRING,allowNull:false},
     vigente:{type:DataTypes.BOOLEAN,allowNull:false}
},{tableName:'publicaciones'} )

Publicacion.belongsTo(Empleado,{
    foreignKey:{
        name:'empleadoId',
        allowNull:false
    },
    as: 'empleado'
})
module.exports=Publicacion;
