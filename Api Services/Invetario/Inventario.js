var mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;


let InventarioSchema = new Schema({
    Producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto'},
    CantidadInicial :{
        type: Number,
        default: 0
    },
    CantidadSalida: {
        type: Number,
        default: 0
    },
    FechaCreacion: {
        type: Date,
        default: Date.now 
    },
    CantidadTotal: {
        type: Number,
        default: 0
    },
});

module.exports = mongoose.model('Inventario', InventarioSchema);

