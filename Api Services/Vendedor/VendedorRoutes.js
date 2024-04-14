var express = require('express');
var router = express.Router();
var VendedorController = require('./VendedorController');


router.post('/create', VendedorController.Vendedor_create);
router.put('/update', VendedorController.Vendedor_update);
router.delete('/delete', VendedorController.Vendedor_Delete);


module.exports = router;