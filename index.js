const sequelize=require('./config/database')
const express= require('express')
const cors=require('cors')
const rutasSocios=require ('./src/routers/socio.routes')
const rutasTransacciones=require('./src/routers/transacciones.routes')
const rutasEmpleados=require('./src/routers/empleado.routes')
const rutasPublicacion=require('./src/routers/publicacion.routes')
var app=express();

app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'}));
app.use('/api/socio',rutasSocios);
app.use('/api/Transacciones',rutasTransacciones)
app.use('/api/publicaciones/',rutasPublicacion)
app.use('/api/empleados',rutasEmpleados)
app.set('port',process.env.PORT || 3000)

sequelize.sync({force:false})
.then(()=>{
    console.log('Tablas de PostgreSQL sincronizadas')
    app.listen(app.get('port'),()=>{
        console.log('Server started on port', app.get('port'))
    });
})
.catch(err => {
    console.error('No se pudo iniciar el servidor debido a un error en la BD ',err)
})