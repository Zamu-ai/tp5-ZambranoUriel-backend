const express=require('express')
const router=express.Router()
const PublicacionControlles=require('./../controllers/publicacion.controllers')

router.get('/vigencia/:titulo/:vigente',PublicacionControlles.getPublisVigentes);
router.put('/:empleado/:titulo',PublicacionControlles.updatePubli);
router.delete('/eliminarPubli/:empleado/:titulo',PublicacionControlles.deletePubli);
router.get('/',PublicacionControlles.getPublis);
router.post('/',PublicacionControlles.createPubli);
module.exports=router