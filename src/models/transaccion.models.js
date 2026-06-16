const {DataTypes}=require('sequelize')
const conexionABd=require('./../../config/database')
const Transaccion= conexionABd.define('Transaccion',{
    idiomaOrigen:{type:DataTypes.STRING,allowNull:false},
    textoOrigen:{type:DataTypes.TEXT,allowNull:false},
    idiomaDestino:{type:DataTypes.STRING,allowNull:false},
    textoDestino:{type:DataTypes.TEXT,allowNull:false},
    emailCliente:{type:DataTypes.STRING,allowNull:false},
},{
    tableName: 'transaciones',
    timestamps:true
})
module.exports=Transaccion