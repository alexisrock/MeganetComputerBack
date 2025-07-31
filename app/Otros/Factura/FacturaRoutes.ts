var express = require('express');
var router = express.Router();
var FacturaController = require('./FacturaController');

router.get('/', FacturaController.Factura_list);
router.post('/create', FacturaController.Factura_create);
router.put('/update', FacturaController.Factura_update);
router.delete('/delete', FacturaController.Factura_delete);
router.get('/:id/getcategoria', FacturaController.Factura_GetIdFactura);


module.exports = router;

