var express = require('express');
var router = express.Router();
var ClienteController = require('./ClienteController');


router.get('/', ClienteController.Cliente_list);
router.post('/create', ClienteController.Cliente_create);
router.put('/:cedula/update', ClienteController.Cliente_update);


module.exports = router;

