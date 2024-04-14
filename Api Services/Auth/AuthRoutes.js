var express = require('express');
var router = express.Router();

const AuthController = require('./AuthController');
router.post('/authenticate',AuthController.authenticate );
router.post('/authenticateVendedor',AuthController.authenticateVendedor );

module.exports = router;