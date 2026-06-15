const transaccionModal=require('./../controllers/transacciones.controllers')
const express=require('express')
const router=express.Router();

router.get('/',transaccionModal.getTransacciones);
router.get('/cliente/:emailCliente',transaccionModal.transaccionDeCliente)
router.get('/idiomas/:idiomaOrigen/:idiomaDestino',transaccionModal.transaccionIdioma)
router.post('/',transaccionModal.createTransaccion)

module.exports=router;