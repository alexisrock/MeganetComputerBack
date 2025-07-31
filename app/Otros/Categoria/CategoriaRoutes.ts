var express = require('express');
var router = express.Router();
var CategoriaController = require('./CategoriaController');


router.get('/', CategoriaController.Caterogia_list);
router.post('/create', CategoriaController.Categoria_create);
router.put('/:id/update', CategoriaController.Categortia_update);
router.delete('/:id/delete', CategoriaController.Categoria_delete);
router.get('/:id', CategoriaController.GetCategoriaID);


module.exports = router;