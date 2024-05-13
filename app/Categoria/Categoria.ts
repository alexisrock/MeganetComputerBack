var mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;



let CaterogiaSchema = new Schema({
    nombreCategoria : {
        type: String,
        required: true
        }
});



module.exports = mongoose.model('Categoria', CaterogiaSchema);