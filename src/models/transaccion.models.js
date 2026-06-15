const {DataTypes}=require('sequelize')
const conexionABd=require('./../../config/database')
const Transaccion= conexionABd.define('Transaccion',{
    idiomaOrigen:{type:DataType.STRING,allowNull:false},
    textoOrigen:{type:DataType.TEXT,allowNull:false},
    idiomaDestino:{type:DataType.STRING,allowNull:false},
    textoDestino:{type:DataType.TEXT,allowNull:false},
    emailCliente:{type:DataType.STRING,allowNull:false},
},{
    tableName: 'socios',
    timestamps:true
})
module.exports=Transaccion