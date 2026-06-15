const {DataTypes}=require ('sequelize')
const ConexionABd= require('../../config/database')
const Socio= ConexionABd.define('Socio',{
    nombre:{type:DataTypes.STRING,allowNull:false},
    apellido:{type:DataTypes.STRING, allowNull:false},
    foto:{type:DataTypes.STRING,allowNull:false},
    dni:{type:DataTypes.STRING,allowNull:false},
    numeroSocio:{type:DataTypes.NUMBER,allowNull:false},
    activo:{type:DataTypes.BOOLEAN,allowNull:false}
},
{ tableName:'socios'
})
module.exports=Socio