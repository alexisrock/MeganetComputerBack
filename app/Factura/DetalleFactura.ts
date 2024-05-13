var mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;



let DetalleFacturaSchema = new Schema({

    factura:{ type : mongoose.Schema.Types.ObjectId, ref: 'Factura'},
    producto: {type: mongoose.Schema.Types.ObjectId, ref: 'Producto'},
    cantidad: {
        type:  Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('DetalleFactura',DetalleFacturaSchema);