var mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
const crypto = require('crypto');


const saltRounds = 10;

let ClienteSchema = new Schema({
    cedula : {
        type: String,
        required: [true, 'La cedula es obligatoria'],
        trim: true,
        unique: true
    },
    nombre: {
        type: String,
        trim: true
    },
    apellidos: String,
    direccion: String,
    telefono: String,
    email: {
        type: String,
        trim: true,
        required: [true, 'El email es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio es obligatorio'],
     
    },
    estado: {
        type: Boolean,
        default: false
    },
    passwordResetToken: String,
    passwordResetTokenExpires: Date
});


ClienteSchema.plugin(mongooseUniqueValidator, {message: 'El {PATH} ya existe con otro Cliente'});


ClienteSchema.pre('save', function(next){
    if (this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, saltRounds);
    }
     next();
});



module.exports = mongoose.model('Cliente',ClienteSchema);