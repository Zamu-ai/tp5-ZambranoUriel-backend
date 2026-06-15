const {Sequelize}=require ('sequelize')
const sequelize= new Sequelize ('tp-5-backend', 'postgres','root',{
    host:'localhost',
    dialect:'postgres',
    logging:false,
});

sequelize.authenticate()
.then(()=>console.log('DB is connected to PostgreSql'))
.catch(err=>console.error('Error al conectar a PostgreSql'))

module.exports= sequelize