var mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;


let FacturaSchema = new Schema({
  
    cliente : { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente'},
    total: { 
        type: Number,
        default: 0
    },
    direccion: String,
    telefono: Number,
    fechaCreacion : {
        type: Date,
        default : Date.now
    },
    fechamodificacion : {
        type: Date,
        default : Date.now
    }
    
});



module.exports = mongoose.model('Factura',FacturaSchema);