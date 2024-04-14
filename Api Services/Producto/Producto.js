var mongoose = require('mongoose');
var moment = require('moment');
var Schema = mongoose.Schema;

let ProductoSchema = new Schema({
    codigo:{
        type: String,
        required: true,
        trim: true
    },
    Nombre: {
        type: String,
        required: true,
        trim: true
    },
    Precio : {
        type: Number,
        required: true
    },
    Marca: {type: mongoose.Schema.Types.ObjectId, ref: 'Marca'},
    Descripcion: {
        type: String,
        required: true,
        trim: true
    },
    FechaCreacion: {
        type: Date,
        default: Date.now 
    },
    PrecioVenta:  Number,
    Estado: {
        type: Boolean,
        default: true
    },
    EsPaginaInicial : {
        type: Boolean,
        default: false
    },
    Categoria:{type: mongoose.Schema.Types.ObjectId, ref: 'Categoria' },
    UrlImagen: {
        type:String
    
    }

});


module.exports = mongoose.model('Producto', ProductoSchema);