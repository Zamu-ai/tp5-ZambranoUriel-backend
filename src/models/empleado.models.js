const {DataTypes}=require('sequelize')
const ConexionABd= require('../../config/database')
const Empleado= ConexionABd.define('Empleado',{
    apellido:{type:DataTypes.STRING,allowNull:false},
    nombre:{type:DataTypes.STRING,allowNull:false},
    dni:{type:DataTypes.STRING,allowNull:false},
    email:{type:DataTypes.STRING,allowNull:false}
},{
    tableName:'empleados'
})
module.exports=Empleado;