var mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;


let MarcaSchema = new Schema({
    Descripcion:{
        type: String,
        required: true,
        trim: true
    }
});

module.exports = mongoose.model('Marca',MarcaSchema);