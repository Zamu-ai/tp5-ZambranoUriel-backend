const controladorSocio=require('../controllers/socio.controllers')
const express =require ('express')
const router=express.Router()

router.get('/',controladorSocio.recuperarAll);
router.post('/',controladorSocio.createSocio);
router.delete('/:id',controladorSocio.eliminar);
router.put('/:id',controladorSocio.editarSocio);
router.get('/active',controladorSocio.recuperActivos);

module.exports=router;
