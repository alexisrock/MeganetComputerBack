var express = require('express');
var router = express.Router();
var MarcaController = require('./MarcaController');

router.get('/', MarcaController.Marca_list);
router.post('/create', MarcaController.Marca_create);
router.put('/:id/update', MarcaController.Marca_update);
router.delete('/:id/delete', MarcaController.Marca_delete);
router.get('/:id/getidmarca', MarcaController.Marca_GetId);

module.exports = router;
